# backend/app/schemas.py
from pydantic import BaseModel
from typing import Optional, List

class SignupRequest(BaseModel):
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class StartSessionRequest(BaseModel):
    role: str

class CreateAnswerRequest(BaseModel):
    question_id: int
    answer_text: str

class QuestionOut(BaseModel):
    id: int
    role: str
    text: str
    keywords: Optional[str]
    model_answer: Optional[str]
