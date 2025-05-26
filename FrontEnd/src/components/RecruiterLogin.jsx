import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";
import "../style/LoginPortal.css";
import { useAuth } from "../context/AuthContext"; // Adjust path if needed

const RecruiterLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login method from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter a valid email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      const response = await axios.post(
        "/RecruiterLogin",
        { email, password },
        { withCredentials: true }
      );

      console.log("Full response object:", response);
      console.log("Response data:", response.data);
      const { token, role, recruiterId } = response.data;
      console.log("Login response data:", response.data);
      console.log("Role from response:", role);

      if (!token || !role) {
        setError("Login failed: token or role missing from server response.");
        return;
      }

      if (role !== "Recruiter") {
        setError("You're not authorized to log in as a recruiter.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("recruiterId", recruiterId); // 👈 This line was missing
      console.log("Parsed recruiterId:", recruiterId);
      login(token, role);

      alert("Login Successful");
      navigate("/recruiter/job-posting");
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data?.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        setError(
          "No response received from server. Please check your network."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login to your account</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <span
                className="toggle-password"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className="login-button">
              Login
            </button>
            <button
              type="button"
              className="forgot-password"
              onClick={() => navigate("/Recruiter-PasswordReset")}
            >
              Forget Password
            </button>
          </div>
          <p className="register-link">
            Don’t have an account yet?{" "}
            <span onClick={() => navigate("/Recruiter-register")}>
              Create a new Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RecruiterLogin;
