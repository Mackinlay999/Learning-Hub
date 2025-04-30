import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path to where your AuthContext's useAuth is exported
import axios from "./axios"; // Assuming you still have your custom axios setup

const LoginPortal = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Map roles to their landing routes (using useMemo to memoize)
  const roleToRoute = useMemo(
    () => ({
      "Super Admin": "/home",
      Admin: "/home",
      Recruiter: "/recruiters/dashboard",
      Mentor: "/mentors",
      // Add more roles here if needed
    }),
    []
  );

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await axios.get("/admin/me", { withCredentials: true });
        const { role } = res.data;
        const token = localStorage.getItem("token"); // grab token from localStorage

        if (role && token) {
          login(token, role); // 🛠 UPDATE auth context here!!
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

    // Ensure checkLoggedIn is called only when the dependencies change.
    checkLoggedIn();
  }, [navigate, login, roleToRoute]); // ensure these dependencies are correctly specified

  // Added roleToRoute to the dependency array

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
      const response = await axios.post(
        "/admin/login",
        { email: credentials.email, password: credentials.password },
        { withCredentials: true }
      );
      const { token, role } = response.data;

      console.log("Login response:", { token, role }); // Debug log

      if (!token || !role) {
        setError("Login failed: token or role missing from server response.");
        return;
      }

      // Save token and role properly
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      login(token, role); // update AuthContext

      alert("Login Successful");

      // Redirect after successful login
      const redirectPath = roleToRoute[role] || "/";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error(error); // Debugging purpose
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
    <div style={styles.container}>
      <div style={styles.box}>
        <h1>Login to your account</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div style={styles.passwordContainer}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <span
                style={styles.togglePassword}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.loginButton}>
              Login
            </button>
            <button
              type="button"
              style={styles.forgotButton}
              onClick={() => navigate("/PasswordReset")}
            >
              Forgot Password
            </button>
          </div>

          <p style={styles.registerLink}>
            Don’t have an account yet?{" "}
            <span
              onClick={() => navigate("/register")}
              style={styles.registerSpan}
            >
              Create a new Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

// Inline styles (you can replace with external CSS if preferred)
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  box: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  passwordContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  togglePassword: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    fontSize: "20px",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },
  loginButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  forgotButton: {
    padding: "10px",
    backgroundColor: "transparent",
    border: "none",
    color: "#007bff",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "underline",
  },
  registerLink: {
    marginTop: "20px",
    fontSize: "14px",
    textAlign: "center",
  },
  registerSpan: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default LoginPortal;
