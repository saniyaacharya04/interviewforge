import React, { useState } from "react";

function Signup({ onSign, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || "Signup failed");
      alert("Account created successfully.");
      onSign();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Create Account</h2>

      <form onSubmit={submit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Sign Up</button>
      </form>

      <p style={{ marginTop: 20 }}>
        Already have an account?{" "}
        <span className="nav-link" onClick={onSwitch}>
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
