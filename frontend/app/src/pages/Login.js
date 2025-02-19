import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // ✅ Shared CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      console.log("🔍 Sending Login Request...");

      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      console.log("✅ Login Successful:", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (error) {
      console.error("❌ Login Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>
        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleLogin}>Login</button>

        <p className="switch-text">
          Don't have an account?{" "}
          <span className="switch-link" onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
