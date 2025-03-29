import React from 'react'
import "../style/LoginPortal.css"

const LoginPortal = () => {
  return (
    <div className="Login-container">
    <h2>Login</h2>
    <input  type="email" placeholder="Enter your mail" className="input" />
    <input  type="password" placeholder="Enter your password" className="input" />
    <div className="l-options">
      <label><input type="checkbox" /> Remember Me</label>
      <a href="#">Forgot Password?</a>
    </div>
    <button className="l-btn">Sign In</button>
    <p>New User? <span onClick={onSwitch} className="link">Sign Up</span></p>
  </div>
  )
}

export default LoginPortal
