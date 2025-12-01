# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import init_db, engine, get_session
from app.routes import auth_routes, question_routes, session_routes, premium_routes
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("interviewforge")

app = FastAPI(title="InterviewForge API")

# CORS (allow local frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers
app.include_router(auth_routes.router, prefix="/api/auth", tags=["auth"])
app.include_router(question_routes.router, prefix="/api", tags=["questions"])
app.include_router(session_routes.router, prefix="/api", tags=["sessions"])
app.include_router(premium_routes.router, prefix="/api/premium", tags=["premium"])

@app.on_event("startup")
def on_startup():
    init_db()
    logger.info("DB initialized and app started")
