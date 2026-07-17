# Luma — AI Study Assistant

Luma is a premium React and Express study companion that turns notes into validated, interactive flashcards and multiple-choice quizzes. It intentionally presents structured learning UI rather than a chatbot transcript.

## Features

- Gemini-powered JSON study-set generation, validated server-side
- Animated flashcard deck with flip interactions, progress and keyboard controls
- One-question quiz flow, explanations, score summary, and retry actions
- Luxury pink glassmorphism UI, dark mode, responsive layout, and Framer Motion transitions
- Request cancellation, stale-response prevention, network/timeout/API error states, retry, and empty-input safeguards

## Structure

```
client/   Vite + React interface
server/   Express API and Gemini integration
```

## Setup

1. Copy `server/.env.example` to `server/.env` and add `GEMINI_API_KEY`.
2. Optionally copy `client/.env.example` to `client/.env` to set the deployed API URL.
3. Run `npm install` in both `client` and `server`.
4. Run `npm run dev` in each folder. The client runs on Vite’s default port and the API on port 5000.

## Architecture

The browser only calls Express via Axios. Express owns the Gemini key, requests JSON-only model output, strips accidental markdown fences, validates the response shape, and sends a safe normalized study set to the UI. React hooks own all client state; no external state manager is used.

## Environment variables

Server: `GEMINI_API_KEY` (required), `GEMINI_MODEL` (defaults to `gemini-3.1-flash-lite`), `PORT`, and `CLIENT_ORIGIN`.

Client: `VITE_API_URL` (defaults to `http://localhost:5000/api`). Never expose the Gemini key as a Vite variable.

## AI usage disclosure

Study sets are generated with Google Gemini from the notes submitted to the server. Model output can be inaccurate or incomplete; learners should verify important claims against their course material.

## Deployment

Deploy `client` to Vercel with `npm run build` and set `VITE_API_URL` to the backend’s `/api` URL. Deploy `server` to Render with `npm start`, configure its environment variables, and set `CLIENT_ORIGIN` to the Vercel URL.

## Known limitations

The API is stateless and does not persist study history. Gemini access and model availability depend on the project API configuration.

## Time spent

Approximately 6–8 hours for product design, responsive frontend, API integration, reliability handling, and verification in a typical implementation cycle.
