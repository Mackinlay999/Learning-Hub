import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/PasswordReset.css"; // Import the CSS file

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [isTokenVisible, setIsTokenVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleGenerateResetLink = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        "https://learning-hub-p2yq.onrender.com/api/forgetpassword",
        { email }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error sending reset link.");
    }
  };

  const handleResetPassword = async () => {
    if (!token || !newPassword) {
      alert("Please enter the token and the new password.");
      return;
    }

    try {
      const response = await axios.post(
        "https://learning-hub-p2yq.onrender.com/api/setNewPassword",
        { token, newPassword }
      );
      alert(response.data.message);
      navigate("/Login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h1 className="reset-title">Password Reset</h1>

        {/* Email Input and Generate Link */}
        <div className="reset-input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="reset-input"
            placeholder="Enter your email"
          />
          <button
            onClick={handleGenerateResetLink}
            className="reset-btn reset-btn-blue"
          >
            Generate Reset Link
          </button>
        </div>

        {/* Token Input */}
        <div className="reset-input-group">
          <label>Token</label>
          <div className="reset-input-wrapper">
            <input
              type={isTokenVisible ? "text" : "password"}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="reset-input"
              placeholder="Enter the token"
            />
            <svg
              onClick={() => setIsTokenVisible(!isTokenVisible)}
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="reset-icon"
              viewBox="0 0 128 128"
            >
              <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
            </svg>
          </div>
        </div>

        {/* New Password Input */}
        <div className="reset-input-group">
          <label>New Password</label>
          <div className="reset-input-wrapper">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="reset-input"
              placeholder="Enter new password"
            />
            <svg
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="reset-icon"
              viewBox="0 0 128 128"
            >
              <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
            </svg>
          </div>
          <button
            onClick={handleResetPassword}
            className="reset-btn reset-btn-green"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
