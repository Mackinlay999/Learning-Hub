import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../style/AdminScheduleInterview.css";

const AdminScheduleInterview = () => {
  const [formData, setFormData] = useState({
    applicantId: "",
    date: "",
    time: "",
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [editingInterviewId, setEditingInterviewId] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: "", time: "" });

  const fetchApplicants = async () => {
    try {
      const res = await axios.get("/recruiters/applicants");
      setApplicants(res.data);
    } catch (error) {
      console.error("Failed to fetch applicants:", error);
    }
  };

  const fetchInterviews = async () => {
    try {
      const res = await axios.get("/recruiters/schedule/interviews");
      setInterviews(res.data);
    } catch (error) {
      console.error("Failed to fetch interviews:", error);
    }
  };

  useEffect(() => {
    fetchApplicants();
    fetchInterviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.applicantId) {
      errors.applicantId = "Applicant is required.";
    }
    if (!formData.date) {
      errors.date = "Date is required.";
    }
    if (!formData.time) {
      errors.time = "Time is required.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setValidationErrors({});

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
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
      fetchInterviews();
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const startEditing = (interview) => {
    setEditingInterviewId(interview._id);
    setEditFormData({ date: interview.date, time: interview.time });
  };

  const cancelEditing = () => {
    setEditingInterviewId(null);
    setEditFormData({ date: "", time: "" });
  };

  const handleUpdate = async (interviewId) => {
    try {
      await axios.put(
        `/recruiters/schedule/interviews/${interviewId}`,
        editFormData
      );
      setMessage({
        type: "success",
        text: "Interview updated successfully!",
      });
      setEditingInterviewId(null);
      fetchInterviews();
    } catch (error) {
      console.error("Error updating interview:", error);
      setMessage({
        type: "danger",
        text: "Error updating interview.",
      });
    }
  };

  const handleDelete = async (interviewId) => {
    try {
      await axios.delete(`/recruiters/schedule/interviews/${interviewId}`);
      setMessage({
        type: "success",
        text: "Interview deleted successfully!",
      });
      fetchInterviews();
    } catch (error) {
      console.error("Error deleting interview:", error);
      setMessage({
        type: "danger",
        text: "Error deleting interview.",
      });
    }
  };

  return (
    <Container className="ScheduleInterview-container py-5">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        Back
      </Button>
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
            isInvalid={validationErrors.applicantId}
          >
            <option value="">-- Select an Applicant --</option>
            {applicants.map((applicant) => (
              <option key={applicant._id} value={applicant._id}>
                {applicant.name} ({applicant.email})
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {validationErrors.applicantId}
          </Form.Control.Feedback>
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
            isInvalid={validationErrors.date}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.date}
          </Form.Control.Feedback>
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
            isInvalid={validationErrors.time}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.time}
          </Form.Control.Feedback>
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

      <h4 className="mt-5">Scheduled Interviews</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => (
            <tr key={interview._id}>
              <td>{interview.name}</td>
              <td>
                {editingInterviewId === interview._id ? (
                  <Form.Control
                    type="date"
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditChange}
                  />
                ) : (
                  new Date(interview.interviewDate).toLocaleDateString()
                )}
              </td>
              <td>
                {editingInterviewId === interview._id ? (
                  <Form.Control
                    type="time"
                    name="time"
                    value={editFormData.time}
                    onChange={handleEditChange}
                  />
                ) : (
                  new Date(interview.interviewDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                )}
              </td>
              <td>
                {editingInterviewId === interview._id ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => handleUpdate(interview._id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      className="ms-2"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="warning"
                      onClick={() => startEditing(interview)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => handleDelete(interview._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminScheduleInterview;