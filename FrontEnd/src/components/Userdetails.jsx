import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";
import "../style/UserDetails.css";

const Userdetails = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeURL, setResumeURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {





    axios
      .get("/me", {
       
        withCredentials: true,
      })
      .then((response) => {
        console.log( " response" 
          , response.data);
        
        setName(response.data.username);
        setEmail(response.data.email);
        setNumber(response.data.number);
        setResumeURL(response.data.resumeUrl); // Resume URL from backend
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("Unauthorized: Please log in first.");
          navigate("/login");
        } else {
          console.error("Error fetching user info:", error);
        }
      });
  }, [navigate]);

  const handleSignOut = () => {
    axios
      .post(
        "/logout",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        alert(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleUpload = () => {
    if (!resume) {
      alert("Please select a resume to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    axios
      .post(
        "/profileResume",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        alert("Resume uploaded successfully!");
        setResumeURL(response.data.resumeUrl); // Update resume link
      })
      .catch((error) => {
        console.error("Error uploading resume:", error);
      });
  };

  return (
    <div className="user-container">
      <div className="user-card">
        <h1 className="user-h1">User Profile</h1>
        <div className="info">
          {/* <p>
            <strong>Name:</strong> {username}
          </p> */}
          {/* <p>
            <strong>Email:</strong> {email}
          </p> */}
          {/* <p>
            <strong>number:</strong> {number}
          </p> */}
          {resumeURL && (
            <p>
              <strong>Resume:</strong>{" "}
              <a href={resumeURL} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </p>
          )}
        </div>
        <input
          className="user-file"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
        />
        <button onClick={handleUpload} className="upload-btn">
          Upload Resume
        </button>
        <button onClick={handleSignOut} className="signout-btn">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Userdetails;
