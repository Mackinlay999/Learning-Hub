import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "./axios";
import "../style/AdminLoginPortal.css";

const AdminLoginPortal = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const roleToRoute = useMemo(
    () => ({
      "Super Admin": "/admin/home",
      Admin: "/admin/home",
      Recruiter: "/admin/recruiters/dashboard",
      Mentor: "/admin/mentors",
    }),
    []
  );

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("/admin/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { role } = res.data;

        if (role) {
          login(token, role);
          const redirectPath = roleToRoute[role] || "/";
          navigate(redirectPath, { replace: true });
        }
      } catch (error) {
        if (error.response?.status === 401) {
          console.log("No valid token found. Stay on Login.");
        } else {
          console.error("Error checking token:", error);
        }
      }
    };

    checkLoggedIn();
  }, [navigate, login, roleToRoute]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!credentials.email) {
      setError("Please enter a valid email.");
      return;
    }
    if (!credentials.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      const response = await axios.post("/admin-login", credentials);
      const { token, role } = response.data;

      if (!token || !role) {
        setError("Login failed: token or role missing from server response.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      login(token, role);
      alert("Login Successful");

      const redirectPath = roleToRoute[role] || "/";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || "Login failed. Please try again.");
      } else if (error.request) {
        setError("No response received from server. Please check your network.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="Admin-Login-container">
      <div className="Admin-Login-box">
        <h1>Login to your Account</h1>
        <button
          type="button"
          className="Admin-Login-backButton"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <form onSubmit={handleSubmit} className="Admin-Login-form">
          <div className="Admin-Login-formGroup">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="Admin-Login-input"
            />
          </div>

          <div className="Admin-Login-formGroup">
            <label htmlFor="password">Password</label>
            <div className="Admin-Login-passwordContainer">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="Admin-Login-input"
              />
              <span
                className="Admin-Login-togglePassword"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {error && <p className="Admin-Login-error">{error}</p>}

          <div className="Admin-Login-buttonGroup">
            <button type="submit" className="Admin-Login-loginButton">
              Login
            </button>
            <button
              type="button"
              className="Admin-Login-forgotButton"
              onClick={() => navigate("/admin-PasswordReset")}
            >
              Forgot Password
            </button>
          </div>

          <p className="Admin-Login-registerLink">
            Don’t have an account yet?{" "}
            <span
              onClick={() => navigate("/admin-register")}
              className="Admin-Login-registerSpan"
            >
              Create a new Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPortal;
