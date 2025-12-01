# backend/app/routes/premium_routes.py
from fastapi import APIRouter, Depends
from app.auth import get_current_user
from fastapi import HTTPException, status

router = APIRouter()

def locked_response():
    return {"error": "Premium Feature - Upgrade to Premium"}

@router.post("/transcribe-and-feedback")
def transcribe_and_feedback(current_user = Depends(get_current_user)):
    # Premium placeholder
    if not current_user.is_premium:
        return locked_response()
    # In a real premium path this would accept audio, perform STT + LLM call
    return {"message": "Premium: placeholder for transcribe-and-feedback"}

@router.post("/upload-question-pack")
def upload_question_pack(current_user = Depends(get_current_user)):
    if not current_user.is_premium:
        return locked_response()
    return {"message": "Premium: placeholder for upload-question-pack"}

@router.post("/generate-report")
def generate_report(current_user = Depends(get_current_user)):
    if not current_user.is_premium:
        return locked_response()
    return {"message": "Premium: placeholder for generate-report"}
