import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin") {
    navigate("/AdminPage");
    return; 
  }
    navigate("/user", {
      state: {
        email: email,
        password: password,
      },
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "#FAF8F5",
        fontFamily: "Lato, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "0.8rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "0.8rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />

        {/* Login Button */}
        <button
          type="submit"
          style={{
            padding: "0.8rem",
            borderRadius: "5px",
            border: "none",
            background: "#C9A27C",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          Login
        </button>

        {/* forgot password */}
        <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "none",
            background: "transparent",
            color: "#C9A27C",
            fontSize: "0.9rem",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Forgot Password?
        </button>

        {/* RegistrationPage */}
        <button
          type="button"
          onClick={() => navigate("/RegistrationPage")}
          style={{
            padding: "0.8rem",
            borderRadius: "5px",
            border: "1px solid #C9A27C",
            background: "white",
            color: "#C9A27C",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          RegistrationPage
        </button>
      </form>
    </div>
  );
}
