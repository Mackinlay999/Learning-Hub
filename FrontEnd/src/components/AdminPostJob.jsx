import React, { useState } from "react";
import axios from "../api/axios";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../style/AdminPostJob.css";

const JOB_TYPES = ["Full-time", "Internship"];
const EXPERIENCE_LEVELS = ["Fresher", "0-1 year", "2+ years"];

const AdminPostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: JOB_TYPES[0],
    duration: "",
    startDate: "",
    endDate: "",
    stipend: "",
    deadline: "",
    openings: "",
    location: "",
    skills: "",
    experience: EXPERIENCE_LEVELS[0],
    applyLink: ""
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.post("/recruiters/post", formData);
      setFormData({
        title: "",
        description: "",
        type: JOB_TYPES[0],
        duration: "",
        startDate: "",
        endDate: "",
        stipend: "",
        deadline: "",
        openings: "",
        location: "",
        skills: "",
        experience: EXPERIENCE_LEVELS[0],
        applyLink: ""
      });
      setStatus({
        type: "success",
        message: "Job/Internship posted successfully!",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      setStatus({
        type: "danger",
        message: error.response?.data?.message || "Failed to post job.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="admin-post-job-container py-5">
      <div className="admin-post-job-header d-flex justify-content-between align-items-center mb-4">
        <h3 className="admin-post-job-title fw-bold">Post Job/Internship</h3>
        <Button
          variant="secondary"
          onClick={() => navigate("/recruiters/dashboard")}
          className="admin-post-job-back-btn"
        >
          Back to Dashboard
        </Button>
      </div>

      {status.message && (
        <Alert
          variant={status.type}
          className="admin-post-job-alert"
          onClose={() => setStatus({ type: "", message: "" })}
          dismissible
        >
          {status.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="admin-post-job-form">
        <Form.Group controlId="title" className="admin-post-job-group">
          <Form.Label className="admin-post-job-label">Title</Form.Label>
          <Form.Control
            name="title"
            className="admin-post-job-input"
            placeholder="e.g. Frontend Developer"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            className="admin-post-job-textarea"
            placeholder="Job responsibilities, requirements, etc."
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="type" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">Type</Form.Label>
          <Form.Select
            name="type"
            className="admin-post-job-select"
            value={formData.type}
            onChange={handleChange}
          >
            {JOB_TYPES.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="duration" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">Duration</Form.Label>
          <Form.Control
            name="duration"
            className="admin-post-job-input"
            placeholder="e.g. 6 months"
            value={formData.duration}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="startDate" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            className="admin-post-job-input"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="endDate" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            className="admin-post-job-input"
            value={formData.endDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="stipend" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">Stipend / Salary</Form.Label>
          <Form.Control
            name="stipend"
            className="admin-post-job-input"
            placeholder="e.g. ₹10,000/month or ₹6-8 LPA"
            value={formData.stipend}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="deadline" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">Application Deadline</Form.Label>
          <Form.Control
            type="date"
            name="deadline"
            className="admin-post-job-input"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="openings" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">Number of Openings</Form.Label>
          <Form.Control
            type="number"
            name="openings"
            className="admin-post-job-input"
            placeholder="e.g. 3"
            value={formData.openings}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="location" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">Location</Form.Label>
          <Form.Control
            name="location"
            className="admin-post-job-input"
            placeholder="e.g. Chennai / Remote"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="skills" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">Required Skills</Form.Label>
          <Form.Control
            name="skills"
            className="admin-post-job-input"
            placeholder="e.g. React, Node.js, MongoDB"
            value={formData.skills}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="experience" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">Experience Level</Form.Label>
          <Form.Select
            name="experience"
            className="admin-post-job-select"
            value={formData.experience}
            onChange={handleChange}
          >
            {EXPERIENCE_LEVELS.map((exp, i) => (
              <option key={i} value={exp}>
                {exp}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="applyLink" className="admin-post-job-group mt-3">
          <Form.Label className="admin-post-job-label">How to Apply</Form.Label>
          <Form.Control
            name="applyLink"
            className="admin-post-job-input"
            placeholder="e.g. https://yourcompany.com/careers"
            value={formData.applyLink}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="admin-post-job-submit-btn mt-4"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="admin-post-job-spinner me-2" />
              Posting...
            </>
          ) : (
            "Post"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default AdminPostJob;
