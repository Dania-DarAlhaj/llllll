
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";


export default function RegistrationPage() {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    await supabase.auth.signOut();
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/VerifyPage",
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    sessionStorage.setItem("pendingEmail", email);
    sessionStorage.setItem("pendingPassword", password);
    sessionStorage.setItem("pendingRole", role);
    sessionStorage.setItem("linkSentTime", Date.now());

  
   
    navigate("/VerifyPage");

    setMessage("Check your email for the verification link.");
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "#FAF8F5",
      fontFamily: "Lato, sans-serif"
    }}>
      <form
        onSubmit={handleContinue}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Register</h2>

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
            fontSize: "1rem"
          }}
        />

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
            fontSize: "1rem"
          }}
        />

        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={(e) => setRole(e.target.value)}
            />{" "}
            User
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="role"
              value="owner"
              checked={role === "owner"}
              onChange={(e) => setRole(e.target.value)}
            />{" "}
            Owner for Business
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.8rem",
            borderRadius: "5px",
            border: "none",
            background: "#C9A27C",
            color: "white",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.2s"
          }}
        >
          {loading ? "Processing..." : "Continue"}
        </button>

        {message && (
          <p style={{ color: "green", textAlign: "center" }}>{message}</p>
        )}
      </form>
    </div>
  );
}
