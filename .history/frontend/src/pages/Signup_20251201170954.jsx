import React, { useState } from "react";

function Signup({ onSign, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || "Signup failed");
      alert("Signup success. Please login.");
      onSign();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Sign up</h2>
      <form onSubmit={submit}>
        <label>Email</label><br/>
        <input value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <label>Password</label><br/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
        <button type="submit">Create account</button>
      </form>
      <p>Have account? <a href="#login" onClick={onSwitch}>Login</a></p>
    </div>
  );
}
export default Signup;
