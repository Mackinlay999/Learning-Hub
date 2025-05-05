// src/components/ResumeViewer.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const AdminResumeViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeUrl = location.state?.resumeUrl;

  if (!resumeUrl) {
    return <p>No resume URL provided.</p>;
  }

  return (
    <Container className="py-4">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      <div className="mt-3" style={{ height: "80vh" }}>
        <iframe
          src={resumeUrl}
          title="Resume"
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </div>
    </Container>
  );
};

export default AdminResumeViewer;
