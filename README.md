# InterviewForge

InterviewForge is a freemium, full-stack interview preparation platform designed for engineers and job-seekers. It delivers repeatable, structured mock interviews with automated scoring, consistent evaluation criteria, and actionable feedback. The free tier includes fully functional text-based interviews. Premium features such as voice interviews, company question packs, and advanced analytics are implemented as placeholders to demonstrate SaaS extensibility.

---

## Features

### Free Tier (Fully Implemented)

* User authentication using JWT (signup and login).
* Role-based text interview sessions with question sequencing.
* Automated deterministic scoring engine with structured feedback.
* Session history, answers, and score breakdown stored in SQLite.
* Modern, responsive UI built with React and Vite.
* Clean FastAPI backend with SQLModel ORM.

### Premium Tier (Placeholders Only)

Premium endpoints, UI components, and database fields exist but intentionally return upgrade-required responses.

* Voice interview simulation with STT + LLM review (placeholder).
* Company-specific question packs (placeholder).
* Advanced analytics dashboard and downloadable PDF reports (placeholder).
* Comparative performance tracking and heatmap visualizations (placeholder).

---

## Tech Stack

**Frontend:**
React, Vite, Modern CSS

**Backend:**
FastAPI, Uvicorn, SQLModel, Pydantic

**Database:**
SQLite (local development)

**Authentication:**
JWT, bcrypt password hashing

**Architecture Pattern:**
Modular FastAPI services + component-driven React UI

---

## System Architecture

```
┌───────────────────────────────┐
│            Frontend            │
│        React + Vite UI         │
│ Pages, Forms, Interview Flow   │
│ REST API → Backend             │
└───────────────────┬────────────┘
                    │
                    ▼
┌───────────────────────────────┐
│            Backend             │
│            FastAPI             │
│ Auth Service (JWT)             │
│ Interview Session Engine       │
│ Question & Scoring Logic       │
│ Premium Feature Gateways       │
└───────────────────┬────────────┘
                    │
                    ▼
┌───────────────────────────────┐
│             SQLite             │
│ Users (is_premium flag)        │
│ Questions                      │
│ Sessions                       │
│ Answers + Score Breakdown      │
└───────────────────────────────┘
```

---

## Screenshots (Optional)

Place images under:
`frontend/public/screenshots/`

Example usage:

```
![Dashboard](./frontend/public/screenshots/dashboard.png)
![Interview](./frontend/public/screenshots/interview.png)
```

---

## Local Setup

### Backend

```
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend runs at:
[http://127.0.0.1:8000](http://127.0.0.1:8000)
API Docs:
[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:
[http://localhost:5173](http://localhost:5173)

---

## API Overview

### Authentication

* `POST /api/auth/signup`
  Create a new account.

* `POST /api/auth/login`
  Authenticate and receive JWT access token.

* `GET /api/auth/me`
  Retrieve authenticated user details.

### Interview Sessions (Free Tier)

* `POST /api/sessions`
  Start a new interview session.

* `GET /api/sessions/{id}/next-question`
  Retrieve the next question for a session.

* `POST /api/sessions/{id}/answers`
  Submit an answer and receive scoring + feedback.

### Questions

* `GET /api/questions?role=backend`
  Retrieve role-based question bank.

### Premium Endpoints (Placeholders)

* Endpoints under `/api/premium/*`
  Return upgrade-required responses.

---

## Future Work

* Integration of Whisper or cloud-based STT for voice interviews.
* LLM-powered feedback and personalized improvement recommendations.
* Subscription and billing integration.
* Advanced analytics dashboard with charts and heatmaps.
* Automated progress reports and weekly email summaries.
* CI/CD pipelines (GitHub Actions), containerization, and cloud deployment.
* Admin panel and multi-tenant organization support.


