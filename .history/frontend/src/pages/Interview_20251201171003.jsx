import React, { useEffect, useState } from "react";

function Interview({ token }) {
  // parse session from hash
  const params = new URLSearchParams(window.location.hash.split("?")[1]);
  const sessionId = params.get("session") || (window.location.hash.includes("session=") ? window.location.hash.split("session=")[1] : null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  useEffect(()=> {
    async function loadQ() {
      const res = await fetch(`http://127.0.0.1:8000/api/sessions/${sessionId}/next-question`, {
        headers: {"Authorization": `Bearer ${token}`}
      });
      const json = await res.json();
      if (json.done) {
        setQuestion(null);
        alert("No more questions.");
      } else setQuestion(json);
    }
    loadQ();
  }, []);

  const submitAnswer = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/sessions/${sessionId}/answers`, {
      method: "POST",
      headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
      body: JSON.stringify({ question_id: question.id, answer_text: answer })
    });
    const json = await res.json();
    setResult(json);
    // fetch next
    const res2 = await fetch(`http://127.0.0.1:8000/api/sessions/${sessionId}/next-question`, {
      headers: {"Authorization": `Bearer ${token}`}
    });
    const q2 = await res2.json();
    if (q2.done) setQuestion(null);
    else setQuestion(q2);
    setAnswer("");
  };

  return (
    <div>
      <h2>Mock Interview</h2>
      {question ? (
        <div>
          <div style={{ border: "1px solid #ddd", padding: 12 }}>
            <b>Question:</b>
            <p>{question.text}</p>
          </div>
          <div style={{ marginTop: 8 }}>
            <textarea rows={8} cols={80} value={answer} onChange={e=>setAnswer(e.target.value)} />
          </div>
          <button onClick={submitAnswer}>Submit Answer</button>
        </div>
      ) : (
        <p>No active question. Go back to <a href="#dashboard">dashboard</a>.</p>
      )}

      {result && (
        <div style={{ marginTop: 12, border: "1px solid #eee", padding: 10 }}>
          <h3>Result — Overall {result.score_overall}</h3>
          <pre>{JSON.stringify(result.score_breakdown, null, 2)}</pre>
          <b>Feedback:</b>
          <ul>{result.feedback.map((f,i)=> <li key={i}>{f}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

export default Interview;
