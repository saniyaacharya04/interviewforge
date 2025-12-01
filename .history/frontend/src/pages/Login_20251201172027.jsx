import React, { useState } from "react";

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || "Login failed");
      onLogin(json.access_token);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: 16 }}>Welcome Back</h2>
      <p style={{ marginBottom: 20, color: "#555" }}>
        Log in to continue preparing smart.
      </p>

      <form onSubmit={submit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: 20 }}>
        New user?{" "}
        <span className="nav-link" onClick={onSwitch}>
          Create an account
        </span>
      </p>
    </div>
