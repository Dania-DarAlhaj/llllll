import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../style/LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 🟢 Admin ثابت
    if (email === "admin@weddingplanning.com" && password === "admin") {
      alert("Welcome Admin 👑");
      navigate("/AdminPage");
      setIsLoading(false);
      return;
    }

    try {
      // 🔍 تحقق من المستخدم
      const { data: user, error } = await supabase
        .from("users")
        .select("id, email, role")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error || !user) {
        alert("Invalid email or password ❌");
        setIsLoading(false);
        return;
      }

      // 🧭 توجيه حسب الدور
      if (user.role === "user") {
     
        
    sessionStorage.setItem("currentEmail", email);
   alert("Login successfully 🎉");
  
        navigate("/");
      } 
      else if (user.role === "owner") {
        alert("Welcome Owner 👑");
        navigate("/OwnerPage", {
          state: { email: user.email },
        });
      } 
      else {
        alert("Unknown role ❗");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Log In"}
          </button>

          {/* REGISTER */}
          <button
            type="button"
            className="btn-register"
            onClick={() => navigate("/RegistrationPage")}
          >
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
}
