# backend/app/seed_questions.py
from app.models import Question

def seed_questions(session):
    questions = [
        Question(role="backend", text="Explain database normalization and why it's important.", keywords="normalization,1NF,2NF,3NF,redundancy", model_answer="Database normalization reduces redundancy by..."),
        Question(role="backend", text="How do you design a REST API for a todo app?", keywords="REST,CRUD,endpoints,resources,status codes", model_answer="A REST API for todos would expose /todos..."),
        Question(role="behavioral", text="Tell me about a time you faced a major bug. What did you do?", keywords="situation,action,result,impact", model_answer="I found a bug in ... I diagnosed by ... and fixed by ... results: reduced errors 50%"),
        Question(role="behavioral", text="Describe a situation where you had to lead a team.", keywords="leadership,conflict,communication,results", model_answer="When leading the project I ...")
    ]
    for q in questions:
        session.add(q)
    session.commit()
