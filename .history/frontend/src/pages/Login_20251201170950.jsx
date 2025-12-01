import React, { useState } from "react";

function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || "Login failed");
      onLogin(json.access_token);
      window.location.hash = "dashboard";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Email</label><br/>
        <input value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <label>Password</label><br/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
        <button type="submit">Login</button>
      </form>
      <p>New? <a href="#signup" onClick={onSwitch}>Sign up</a></p>
    </div>
  );
}
export default Login;
