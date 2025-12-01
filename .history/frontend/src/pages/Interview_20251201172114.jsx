import React, { useEffect, useState } from "react";

function Interview({ token }) {
  const params = new URLSearchParams(window.location.hash.split("?")[1]);
  const sessionId = params.get("session");
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  async function loadQuestion() {
    const res = await fetch(`http://127.0.0.1:8000/api/sessions/${sessionId}/next-question`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const json = await res.json();
    if (json.done) setQuestion(null);
    else setQuestion(json);
  }

  useEffect(() => {
    loadQuestion();
  }, []);

  const submit = async () => {
    if (!answer.trim()) {
      alert("Please write an answer.");
      return;
    }

    const res = await fetch(`http://127.0.0.1:8000/api/sessions/${sessionId}/answers`, {
      method: "POST",
      headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
      body: JSON.stringify({ question_id: question.id, answer_text: answer })
    });
    const json = await res.json();
    setResult(json);
    setAnswer("");
    loadQuestion();
  };

  return (
    <div>
      <div className="card">
        <h2>Mock Interview</h2>

        {question ? (
          <>
            <div className="question-card" style={{ marginTop: 20 }}>
              <h3>{question.text}</h3>
