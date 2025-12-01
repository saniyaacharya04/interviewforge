import React, { useEffect, useState } from "react";

function Dashboard({ token, onStart, onPremium }) {
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState("backend");

  useEffect(()=> {
    async function load() {
      const res = await fetch("http://127.0.0.1:8000/api/auth/me", {
        headers: {"Authorization": `Bearer ${token}`}
      });
      const json = await res.json();
      setProfile(json);
    }
    load();
  }, []);

  const start = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ role })
    });
    const json = await res.json();
    onStart(json.id);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {profile && (
        <div>
          <p><b>{profile.email}</b> — {profile.is_premium ? "Premium" : "Free"}</p>
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        <label>Select role</label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="backend">Backend Engineer</option>
          <option value="behavioral">Behavioral</option>
          <option value="general">General</option>
        </select>
        <button onClick={start} style={{ marginLeft: 8 }}>Start Text Mock Interview</button>
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={onPremium}>Premium features</button>
      </div>
    </div>
  );
}

export default Dashboard;
