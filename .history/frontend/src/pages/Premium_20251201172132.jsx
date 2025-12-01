import React from "react";

function Premium() {
  return (
    <div className="card">
      <div className="premium-banner">
        <span className="lock-icon">🔒</span> Premium Features (Placeholder)
      </div>

      <h2>Upgrade to Premium</h2>
      <p style={{ margin: "12px 0", color: "#555" }}>
        Unlock advanced AI-powered tools to level up your interview preparation.
      </p>

      <ul style={{ marginTop: 12, paddingLeft: 20 }}>
        <li>Voice mock interviews with AI scoring</li>
        <li>Company-specific question packs</li>
        <li>Downloadable PDF performance reports</li>
        <li>Deep analytics & skill heatmaps</li>
      </ul>

      <button style={{ marginTop: 20 }}>Upgrade Now (Coming Soon)</button>
    </div>
  );
}

export default Premium;
