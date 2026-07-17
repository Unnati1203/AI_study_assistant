Luma — AI Study Assistant

Luma is an AI-powered study assistant built with React, Vite, Express, and Google Gemini. Instead of behaving like a chatbot, Luma converts study topics into structured learning material, including interactive flashcards and multiple-choice quizzes.

The application focuses on a clean user experience, validated AI responses, and reliable error handling while keeping the Gemini API key securely on the server.

---

Live Demo

Frontend:
(Add your Vercel URL)

Backend:
(Add your Render URL)

---

Screenshots

![Home](assets/home.png)

![Flashcards](assets/flashcards.png)

![Quiz](assets/quiz.png)

![Study Progress](assets/progress.png)

![Light Theme](assets/whiteTheme.png)

![Loading State](assets/loading.png)

---

Features

- AI-generated flashcards and quizzes using Google Gemini
- Structured JSON generation with server-side validation
- Interactive flashcards with flip animations
- Quiz mode with explanations and score tracking
- Progress tracking during study sessions
- Responsive interface for desktop and mobile
- Light and dark themes
- Framer Motion animations
- Robust error handling for API, network, timeout, and invalid responses
- Request cancellation and stale-response prevention

---

Technology Stack

Frontend

- React
- Vite
- Axios
- Framer Motion
- CSS

Backend

- Node.js
- Express.js

AI

- Google Gemini API
- @google/genai SDK

---

Project Structure

```
.
├── assets
├── client
│   ├── src
│   ├── package.json
│   └── vite.config.js
├── server
│   ├── src
│   ├── package.json
│   └── .env.example
└── README.md
```

---

Setup

Clone the repository.

```bash
git clone https://github.com/Unnati1203/AI_study_assistant.git
```

Install dependencies.

```bash
cd client
npm install

cd ../server
npm install
```

Create the environment file.

```
server/.env
```

Example

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
GEMINI_API_KEY=YOUR_API_KEY
GEMINI_MODEL=gemini-2.0-flash
```

Run the backend.

```bash
cd server
npm run dev
```

Run the frontend.

```bash
cd client
npm run dev
```

---

Architecture

```
User
   │
   ▼
React Frontend
   │
Axios
   │
   ▼
Express Backend
   │
Google Gemini API
   │
Validated JSON Response
   │
   ▼
Flashcards + Quiz UI
```

The frontend communicates exclusively with the Express API. The backend securely manages the Gemini API key, requests structured JSON output, validates the response, and returns a normalized study set to the client.

---

Environment Variables

Server

| Variable | Description |
|----------|-------------|
| PORT | Backend server port |
| CLIENT_ORIGIN | Frontend URL |
| GEMINI_API_KEY | Google Gemini API Key |
| GEMINI_MODEL | Gemini model name |

Client

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API URL |

The Gemini API key should never be exposed to the frontend.

---

Deployment

Frontend

Deploy the client to Vercel.

```bash
npm run build
```

Backend

Deploy the Express server to Render and configure the required environment variables.

---

Known Limitations

- The application does not store study history.
- AI-generated content may occasionally contain inaccuracies.
- Availability depends on the configured Gemini API project and quota.

---

Future Improvements

- User authentication
- Study history
- Export flashcards as PDF
- Spaced repetition
- Dashboard with analytics
- PDF note upload
- Voice-based learning
- Topic recommendations

---

Time Spent

Approximately 6–8 hours were spent designing the interface, implementing the frontend and backend, integrating the Gemini API, validating AI responses, and testing the application.