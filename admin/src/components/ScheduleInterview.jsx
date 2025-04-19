// src/pages/ScheduleInterview.jsx
import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import "../style/ScheduleInterview.css"; // optional CSS import for styling

const ScheduleInterview = () => {
  const [formData, setFormData] = useState({
    applicantId: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get("/applicants"); // 🔁 Update the endpoint if needed
        setApplicants(res.data);
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      }
    };

    fetchApplicants();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (!formData.applicantId) {
      setMessage({ type: "danger", text: "Please select an applicant" });
      setLoading(false);
      return;
    }

    try {
      await axios.post("/recruiters/schedule", formData);
      setMessage({
        type: "success",
        text: "Interview scheduled successfully!",
      });
      setFormData({ applicantId: "", date: "", time: "" });
    } catch (error) {
      console.error("Error scheduling interview:", error);
      setMessage({
        type: "danger",
        text: error.response?.data?.message || "Error scheduling interview.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="ScheduleInterview-container py-5">
      <h3 className="ScheduleInterview-title mb-4 text-center">
        Schedule Interview
      </h3>

      {message.text && (
        <Alert
          variant={message.type}
          dismissible
          onClose={() => setMessage({ type: "", text: "" })}
          className="ScheduleInterview-alert"
        >
          {message.text}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="ScheduleInterview-form">
        <Form.Group className="mb-3">
          <Form.Label className="ScheduleInterview-label">
            Select Applicant
          </Form.Label>
          <Form.Select
            name="applicantId"
            value={formData.applicantId}
            onChange={handleChange}
            required
            className="ScheduleInterview-input"
          >
            <option value="">-- Select an Applicant --</option>
            {applicants.map((applicant) => (
              <option key={applicant._id} value={applicant._id}>
                {applicant.name} ({applicant.email})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="ScheduleInterview-label">Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="ScheduleInterview-input"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="ScheduleInterview-label">Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="ScheduleInterview-input"
          />
        </Form.Group>

        <div className="text-center">
          <Button
            type="submit"
            variant="primary"
            className="ScheduleInterview-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Scheduling...
              </>
            ) : (
              "Schedule Interview"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ScheduleInterview;
