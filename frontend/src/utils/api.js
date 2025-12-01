// frontend/src/utils/api.js
const API_BASE = "http://127.0.0.1:8000/api";

export async function apiFetch(path, token, opts = {}) {
  const headers = opts.headers || {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  headers["Content-Type"] = "application/json";
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail || json.error || "API error");
  return json;
}
