import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Premium from "./pages/Premium";

function App() {
  const [route, setRoute] = useState(window.location.hash.replace("#", "") || "login");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    function onHash() { setRoute(window.location.hash.replace("#", "") || "login"); }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (!token && route !== "signup" && route !== "login") {
    window.location.hash = "login";
    return null;
  }

  const go = (r) => { window.location.hash = r; setRoute(r); };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h1>InterviewForge</h1>
      {route === "login" && <Login onLogin={(t)=>{ setToken(t); localStorage.setItem("token", t); go("dashboard"); }} onSwitch={()=>go("signup")} />}
      {route === "signup" && <Signup onSign={()=>go("login")} onSwitch={()=>go("login")} />}
      {route === "dashboard" && <Dashboard token={token} onStart={(sessionId)=>go(`interview?session=${sessionId}`)} onPremium={()=>go("premium")} />}
      {route.startsWith("interview") && <Interview token={token} />}
      {route === "premium" && <Premium />}
    </div>
  );
}

export default App;
