import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
const geminiModel = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
const gemini = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

app.use(cors({ origin: allowedOrigin.split(',').map((origin) => origin.trim()) }));
app.use(express.json({ limit: '1mb' }));

const cleanJson = (text) => text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

const validateStudySet = (payload) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('The AI returned an invalid response shape.');
  const { flashcards, quiz, summary, difficulty } = payload;
  if (!Array.isArray(flashcards) || !Array.isArray(quiz) || typeof summary !== 'string' || typeof difficulty !== 'string') {
    throw new Error('The AI response is missing required study data.');
  }
  const cards = flashcards
    .filter((card) => card && typeof card.question === 'string' && typeof card.answer === 'string')
    .slice(0, 12);
  const questions = quiz
    .filter((question) => question && typeof question.question === 'string' && Array.isArray(question.options) && question.options.length >= 2 && Number.isInteger(question.correctAnswer) && question.correctAnswer >= 0 && question.correctAnswer < question.options.length)
    .map((question) => ({ ...question, options: question.options.map(String).slice(0, 4) }))
    .slice(0, 10);
  if (!cards.length && !questions.length) throw new Error('The AI did not generate usable flashcards or quiz questions.');
  return { flashcards: cards, quiz: questions, summary: summary.trim(), difficulty: difficulty.trim() };
};

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/study-set', async (req, res) => {
  const notes = typeof req.body?.notes === 'string' ? req.body.notes.trim() : '';
  if (notes.length < 20) return res.status(400).json({ error: 'Please add at least 20 characters of study material.' });
  if (notes.length > 18000) return res.status(400).json({ error: 'Please keep notes under 18,000 characters.' });
  if (!gemini) return res.status(503).json({ error: 'The study service is not configured yet.' });

  const timeout = setTimeout(() => res.headersSent || res.status(504).json({ error: 'The AI request took too long. Please try again.' }), 45000);
  try {
    const prompt = `You are an expert study coach. Convert the supplied notes into a concise, accurate study set. Return ONLY valid JSON in exactly this schema: {"flashcards":[{"question":"...","answer":"..."}],"quiz":[{"question":"...","options":["...","...","...","..."],"correctAnswer":0,"explanation":"..."}],"summary":"...","difficulty":"Beginner|Intermediate|Advanced"}. Create 6-12 flashcards and 5-10 multiple-choice questions. Do not invent facts. Notes:\n\n${notes}`;
    const result = await gemini.models.generateContent({
      model: geminiModel,
      contents: prompt,
      config: { responseMimeType: 'application/json', temperature: 0.35 },
    });
    const parsed = validateStudySet(JSON.parse(cleanJson(result.text || '')));
    clearTimeout(timeout);
    if (!res.headersSent) res.json(parsed);
  } catch (error) {
    clearTimeout(timeout);
    console.error('Study generation failed:', error.message);
    const credentialRejected = error?.status === 400 && /API_KEY_INVALID|API key not valid/i.test(error.message);
    const quotaExceeded = error?.status === 429 || /RESOURCE_EXHAUSTED|quota exceeded/i.test(error.message);
    if (!res.headersSent) {
      res.status(credentialRejected ? 503 : quotaExceeded ? 429 : 502).json({
        error: credentialRejected
          ? 'The Gemini credential was rejected. Set GEMINI_API_KEY to a valid Google AI Studio API key and restart the server.'
          : quotaExceeded
            ? 'Gemini accepted the API key, but this project has no available model quota. Enable billing or wait for quota to reset, then try again.'
          : 'We could not create a study set from those notes. Please retry.',
      });
    }
  }
});

app.use((_req, res) => res.status(404).json({ error: 'Route not found.' }));
app.listen(port, () => console.log(`Luma API listening on ${port}`));
