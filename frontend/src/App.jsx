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
    function onHash() {
      setRoute(window.location.hash.replace("#", "") || "login");
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (r) => {
    window.location.hash = r;
    setRoute(r);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>InterviewForge</h1>
        {token && (
          <span
            className="nav-link"
            onClick={() => {
              localStorage.removeItem("token");
              setToken(null);
              go("login");
            }}
          >
            Logout
          </span>
        )}
      </div>

      {!token && route === "login" && (
        <Login
          onLogin={(t) => {
            setToken(t);
            localStorage.setItem("token", t);
            go("dashboard");
          }}
          onSwitch={() => go("signup")}
        />
      )}

      {!token && route === "signup" && (
        <Signup onSign={() => go("login")} onSwitch={() => go("login")} />
      )}

      {token && route === "dashboard" && (
        <Dashboard onStart={(id) => go(`interview?session=${id}`)} onPremium={() => go("premium")} token={token} />
      )}

      {token && route.startsWith("interview") && <Interview token={token} />}
      {route === "premium" && <Premium />}
    </div>
  );
}

export default App;
