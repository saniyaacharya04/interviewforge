# InterviewForge

InterviewForge is a freemium interview preparation tool for engineers and job-seekers. It provides repeatable, recruiter-style mock interviews with automated scoring and actionable feedback. The free tier supports unlimited text-based mock interviews; premium adds voice-based STT + LLM review, company packs and advanced reports (placeholders in this repo).

## Features

### Free (Implemented)
- Signup / Login (JWT)
- Start text mock interview sessions by role
- Automated deterministic scoring and structured feedback
- Session history and score breakdown stored locally (SQLite)

### Premium (Placeholders)
- Voice mock interviews with STT + LLM feedback (placeholder)
- Company-specific question packs (placeholder)
- Advanced analytics and downloadable reports (placeholder)

## Tech Stack
- Frontend: React (Vite)
- Backend: FastAPI, Uvicorn
- Database: SQLite (via SQLModel)
- Auth: JWT, bcrypt

## Setup (local)
1. Backend
   - `cd backend`
   - `python -m venv .venv`
   - `source .venv/bin/activate`
   - `pip install -r requirements.txt`
   - `uvicorn app.main:app --reload --port 8000`

2. Frontend
   - `cd frontend`
   - `npm install`
   - `npm run dev` (open http://localhost:5173)

## API Overview
- `POST /api/auth/signup` — create account
- `POST /api/auth/login` — login (returns JWT)
- `GET /api/questions?role=backend` — list questions
- `POST /api/sessions` — start session
- `GET /api/sessions/{id}/next-question` — next question
- `POST /api/sessions/{id}/answers` — submit answer -> returns scoring
- Premium endpoints under `/api/premium/*` return locked responses.

## Future Work
- Integrate STT (Whisper / cloud STT), LLM (OpenAI) for rich feedback
- Billing & subscription integration
- Rich analytics dashboard and scheduled progress emails
- CI/CD and Docker deployment

## License
MIT (see LICENSE)
