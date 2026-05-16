"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Lock } from "lucide-react";

const inputStyle = {
  width: "100%",
  border: "1px solid #dbe4ee",
  borderRadius: "0.65rem",
  color: "#1C1917",
  padding: "0.78rem 0.85rem",
  outline: "none",
};

const labelStyle = {
  display: "block",
  color: "#334155",
  fontSize: "0.75rem",
  fontWeight: 800,
  letterSpacing: "0.04em",
  marginBottom: "0.35rem",
  textTransform: "uppercase",
};

export default function AdminLoginClient() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(data.error || "Unable to log in.");

      router.replace("/admin/orders");
      router.refresh();
    } catch (loginError) {
      setError(loginError.message || "Unable to log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      style={{
        alignItems: "center",
        background: "#f8fafc",
        display: "flex",
        minHeight: "100vh",
        padding: "6rem 1rem 3rem",
      }}
    >
      <div className="white-card" style={{ margin: "0 auto", maxWidth: "460px", padding: "1.25rem" }}>
        <div
          style={{
            alignItems: "center",
            background: "#fff7ed",
            borderRadius: "0.9rem",
            color: "#f59e0b",
            display: "inline-flex",
            height: "3rem",
            justifyContent: "center",
            marginBottom: "1rem",
            width: "3rem",
          }}
        >
          <Lock size={22} />
        </div>
        <span className="section-label">Private Admin</span>
        <h1 style={{ color: "#1C1917", marginBottom: "0.55rem" }}>Admin login</h1>
        <p style={{ color: "#64748b", marginBottom: "1.25rem" }}>
          Sign in to create orders, update status, and sync Zoho Books.
        </p>

        {error && (
          <div
            role="alert"
            style={{
              alignItems: "center",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "0.75rem",
              color: "#991b1b",
              display: "flex",
              gap: "0.6rem",
              marginBottom: "1rem",
              padding: "0.85rem 1rem",
            }}
          >
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={login} style={{ display: "grid", gap: "0.95rem" }}>
          <label>
            <span style={labelStyle}>Username</span>
            <input
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              style={inputStyle}
            />
          </label>

          <label>
            <span style={labelStyle}>Password</span>
            <input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={inputStyle}
            />
          </label>

          <button
            className="btn-amber"
            disabled={loading || !username || !password}
            style={{ justifyContent: "center" }}
            type="submit"
          >
            {loading ? <Loader2 size={15} /> : <Lock size={15} />}
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
