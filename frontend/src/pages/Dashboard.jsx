import React, { useEffect, useState } from "react";

function Dashboard({ token, onStart, onPremium }) {
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState("backend");

  useEffect(() => {
    async function load() {
      const res = await fetch("http://127.0.0.1:8000/api/auth/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const json = await res.json();
      setProfile(json);
    }
    load();
  }, []);

  return (
    <div className="card">
      <h2 style={{ marginBottom: 16 }}>Dashboard</h2>

      {profile && (
        <p style={{ marginBottom: 20, color: "#666" }}>
          Logged in as <b>{profile.email}</b> — {profile.is_premium ? "Premium" : "Free User"}
        </p>
      )}

      <label>Select Role / Interview Type</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="backend">Backend Engineer</option>
        <option value="behavioral">Behavioral</option>
        <option value="general">General</option>
      </select>

      <button onClick={() => onStart(role)}>Start Text Mock Interview</button>

      <button style={{ marginTop: 20 }} className="secondary" onClick={onPremium}>
        Explore Premium Features
      </button>
    </div>
  );
}

export default Dashboard;
