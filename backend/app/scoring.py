# backend/app/scoring.py
from difflib import SequenceMatcher
import re
import json

FILLER_WORDS = {"um", "uh", "like", "you know", "so", "actually", "basically"}

def _clean_text(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower())

def length_score(text: str) -> float:
    words = text.split()
    n = len(words)
    # ideal length 50-150 words
    if n <= 20:
        return max(0, (n / 20) * 20)
    if 20 < n <= 50:
        return 40 + (n - 20) * (20/30)
    if 50 < n <= 150:
        return 60 + (n - 50) * (30/100)
    return min(30 + (n / 150) * 10, 30)

def keyword_score(answer: str, keywords: str) -> float:
    if not keywords:
        return 20.0  # neutral
    klist = [k.strip().lower() for k in keywords.split(",") if k.strip()]
    if not klist:
        return 20.0
    answer_l = answer.lower()
    matched = 0
    for k in klist:
        if k in answer_l:
            matched += 1
    return round((matched / len(klist)) * 30, 2)

def filler_penalty(answer: str) -> float:
    s = answer.lower()
    penalty = 0.0
    for f in FILLER_WORDS:
        count = s.count(f)
        penalty += count * 2.0
    return -penalty

def similarity_score(answer: str, model_answer: str) -> float:
    if not model_answer:
        return 10.0
    a = _clean_text(answer)
    m = _clean_text(model_answer)
    ratio = SequenceMatcher(None, a, m).ratio()
    return round(ratio * 20, 2)  # up to 20 points

def structure_score(answer: str) -> float:
    # heuristic: presence of bullets, sentences with action/result, use of "I" or "we"
    sentences = re.split(r"[.!?]", answer)
    sentences = [s.strip() for s in sentences if s.strip()]
    if not sentences:
        return 0.0
    score = 10.0
    if len(sentences) >= 2:
        score += min(10, len(sentences))
    if any(re.search(r"\b(action|result|impact|led|designed|implemented)\b", s.lower()) for s in sentences):
        score += 10
    return min(score, 30)

def score_answer(answer_text: str, keywords: str = "", model_answer: str = "") -> dict:
    ls = length_score(answer_text)
    ks = keyword_score(answer_text, keywords)
    ss = structure_score(answer_text)
    fp = filler_penalty(answer_text)
    sim = similarity_score(answer_text, model_answer)
    # overall scale: sum up (max ~ 110) -> normalize to 0-100
    raw = ls + ks + ss + sim + fp
    overall = max(0.0, min(100.0, raw))
    breakdown = {
        "length_score": ls,
        "keyword_score": ks,
        "structure_score": ss,
        "similarity_score": sim,
        "filler_penalty": fp
    }
    feedback = []
    if ks < 15:
        feedback.append("Add key domain terms expected for this question.")
    if ls < 25:
        feedback.append("Answer is short — add more context and examples.")
    if fp < -3:
        feedback.append("Reduce filler words like 'um', 'uh', 'like'.")
    if ss < 15:
        feedback.append("Improve structure: use situation->action->result format.")
    if sim < 8:
        feedback.append("Compare your answer to example answers; include expected terms.")
    return {
        "score_overall": round(overall, 2),
        "score_breakdown": breakdown,
        "feedback": feedback
    }
