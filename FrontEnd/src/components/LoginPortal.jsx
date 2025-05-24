import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/LoginPortal.css";
import { useAuth } from "../context/AuthContext"; // import auth context

const LoginPortal = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // get login function from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    // Check for active session (optional)
    axios.get("https://learning-hub-p2yq.onrender.com/api/me", { withCredentials: true })
      .then((res) => {
        // Optional auto-redirect if already logged in
        if (res.data?.role === "Student") {
          navigate("/student/dashboard");
        }
      })
      .catch((error) => {
        console.log("Token check:", error.response?.status === 401 ? "No valid session" : error);
      });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please Enter Valid Email");
    if (!password) return alert("Please Fill Password");

    try {
      const response = await axios.post(
        "https://learning-hub-p2yq.onrender.com/api/login",
        { email, password },
        { withCredentials: true }
      );

      const { token, role } = response.data;

      if (!token || !role) {
        alert("Invalid response from server");
        return;
      }

      if (role !== "user") {
        alert("You're not authorized as a Student.");
        return;
      }

      // Set token and role in AuthContext
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      login(token, role);
      alert("Login Successful");
      navigate("/student/jobs");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login failed. Please try again.");
      } else {
        alert("An error occurred. Please check your connection.");
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
              onClick={() => navigate("/PasswordReset")}
            >
              Forget Password
            </button>
          </div>
          <p className="register-link">
            Don’t have an account yet?{" "}
            <span onClick={() => navigate("/register")}>
              Create a new Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPortal;
