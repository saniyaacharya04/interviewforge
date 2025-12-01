# backend/app/routes/session_routes.py
from fastapi import APIRouter, Depends, HTTPException
from app.schemas import StartSessionRequest, CreateAnswerRequest
from app.auth import get_current_user
from app.db import get_session
from sqlmodel import select
from app.models import InterviewSession, Question, Answer
from app.scoring import score_answer
import json

router = APIRouter()

@router.post("/sessions")
def start_session(payload: StartSessionRequest, current_user = Depends(get_current_user)):
    session = get_session()
    s = InterviewSession(user_id=current_user.id, role=payload.role)
    session.add(s); session.commit(); session.refresh(s)
    return {"id": s.id, "user_id": s.user_id, "role": s.role, "started_at": s.started_at}

@router.get("/sessions/{session_id}/next-question")
def next_question(session_id: int, current_user = Depends(get_current_user)):
    db = get_session()
    s = db.get(InterviewSession, session_id)
    if not s or s.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Session not found")
    # find first question not yet answered
    answered_q_ids = [a.question_id for a in db.exec(select(Answer).where(Answer.session_id == session_id)).all()]
    q = db.exec(select(Question).where(Question.role == s.role)).all()
    for ques in q:
        if ques.id not in answered_q_ids:
            return {"id": ques.id, "text": ques.text, "keywords": ques.keywords, "model_answer": ques.model_answer}
    return {"detail": "No more questions", "done": True}

@router.post("/sessions/{session_id}/answers")
def submit_answer(session_id: int, payload: CreateAnswerRequest, current_user = Depends(get_current_user)):
    db = get_session()
    s = db.get(InterviewSession, session_id)
    if not s or s.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Session not found")
    q = db.get(Question, payload.question_id)
    if not q:
        raise HTTPException(status_code=404, detail="Question not found")
    # scoring
    res = score_answer(payload.answer_text, q.keywords or "", q.model_answer or "")
    ans = Answer(session_id=session_id, question_id=q.id, answer_text=payload.answer_text,
                 score_overall=res["score_overall"], score_breakdown=json.dumps(res["score_breakdown"]))
    db.add(ans); db.commit(); db.refresh(ans)
    return {
        "answer_id": ans.id,
        "score_overall": res["score_overall"],
        "score_breakdown": res["score_breakdown"],
        "feedback": res["feedback"]
    }

@router.get("/sessions/{session_id}/history")
def session_history(session_id: int, current_user = Depends(get_current_user)):
    db = get_session()
    s = db.get(InterviewSession, session_id)
    if not s or s.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Session not found")
    answers = db.exec(select(Answer).where(Answer.session_id == session_id)).all()
    out = []
    for a in answers:
        out.append({
            "id": a.id,
            "question_id": a.question_id,
            "answer_text": a.answer_text,
            "score_overall": a.score_overall,
            "score_breakdown": a.score_breakdown,
            "created_at": a.created_at
        })
    return {"session": {"id": s.id, "role": s.role, "started_at": s.started_at}, "answers": out}
