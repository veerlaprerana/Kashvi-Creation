import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // ✅ Shared CSS file

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    try {
      console.log("🔍 Sending Register Request...");

      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");

      console.log("✅ Registration Successful:", data);
      navigate("/login"); // ✅ Redirect to login after successful registration
    } catch (error) {
      console.error("❌ Registration Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Register</h2>
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          className="auth-input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="auth-button" onClick={handleRegister}>Register</button>

        <p className="switch-text">
          Already have an account?{" "}
          <span className="switch-link" onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
