# backend/app/routes/question_routes.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.schemas import QuestionOut
from app.auth import get_current_user
from app.db import get_session
from sqlmodel import select
from app.models import Question

router = APIRouter()

@router.get("/questions", response_model=List[QuestionOut])
def list_questions(role: str = "general", current_user = Depends(get_current_user)):
    session = get_session()
    results = session.exec(select(Question).where(Question.role == role)).all()
    if not results:
        # fallback to general
        results = session.exec(select(Question).where(Question.role == "general")).all()
    return results
