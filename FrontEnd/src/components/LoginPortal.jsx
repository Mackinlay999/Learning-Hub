import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/LoginPortal.css";

const LoginPortal = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    axios
      .get("https://learning-hub-p2yq.onrender.com/api/me", {
        withCredentials: true,
      }) // Removed unnecessary empty object
      .then(() => {
        navigate("/userdetails");
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.log("No valid token found. Stay on Login.");
        } else {
          console.log("Error checking token:", error);
        }
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

      if (response.status === 200) {
        alert("Login Successful");
        navigate("/userdetails");
      }
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        alert(error.response.data.message || "Login failed. Please try again.");
      } else {
        console.error("Login error:", error);
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
