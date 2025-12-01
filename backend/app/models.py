# backend/app/models.py
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    is_premium: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class InterviewSession(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    role: str
    started_at: datetime = Field(default_factory=datetime.utcnow)
    ended_at: Optional[datetime] = None

class Question(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    role: str
    text: str
    keywords: Optional[str] = None
    model_answer: Optional[str] = None

class Answer(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: int = Field(foreign_key="interviewsession.id")
    question_id: int = Field(foreign_key="question.id")
    answer_text: str
    score_overall: float
    score_breakdown: str  # store as JSON string
    created_at: datetime = Field(default_factory=datetime.utcnow)
