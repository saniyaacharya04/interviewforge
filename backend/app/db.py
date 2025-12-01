# backend/app/db.py
from sqlmodel import SQLModel, create_engine, Session, select
import os
from datetime import datetime

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./interviewforge.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def init_db():
    from app.models import User, Question
    SQLModel.metadata.create_all(engine)
    # seed questions if not present
    with Session(engine) as session:
        q_count = session.exec(select(Question)).first()
        if q_count is None:
            from app.seed_questions import seed_questions
            seed_questions(session)

def get_session():
    return Session(engine)
