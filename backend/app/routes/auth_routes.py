# backend/app/routes/auth_routes.py
from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas import SignupRequest, LoginRequest, TokenResponse
from app.db import get_session
from sqlmodel import select
from app.models import User
from app.auth import hash_password, verify_password, create_access_token
from datetime import timedelta

router = APIRouter()

@router.post("/signup")
def signup(payload: SignupRequest):
    session = get_session()
    existing = session.exec(select(User).where(User.email == payload.email)).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    user = User(email=payload.email, hashed_password=hash_password(payload.password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return {"id": user.id, "email": user.email, "is_premium": user.is_premium}

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    session = get_session()
    user = session.exec(select(User).where(User.email == payload.email)).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token({"user_id": user.id})
    return {"access_token": token}
