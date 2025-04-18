// src/pages/ScheduleInterview.jsx
import React, { useState } from 'react';
import axios from '../api/axios';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import '../style/ScheduleInterview.css'; // optional CSS import for styling

const ScheduleInterview = () => {
  const [formData, setFormData] = useState({
    applicantId: '',
    date: '',
    time: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

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
    setMessage({ type: '', text: '' });

    try {
      await axios.post('/recruiters/schedule', formData);
      setMessage({ type: 'success', text: 'Interview scheduled successfully!' });
      setFormData({ applicantId: '', date: '', time: '' });
    } catch (error) {
      console.error('Error scheduling interview:', error);
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || 'Error scheduling interview.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="ScheduleInterview-container py-5">
      <h3 className="ScheduleInterview-title mb-4 text-center">Schedule Interview</h3>

      {message.text && (
        <Alert
          variant={message.type}
          dismissible
          onClose={() => setMessage({ type: '', text: '' })}
          className="ScheduleInterview-alert"
        >
          {message.text}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="ScheduleInterview-form">
        <Form.Group className="mb-3">
          <Form.Label className="ScheduleInterview-label">Applicant ID</Form.Label>
          <Form.Control
            type="text"
            name="applicantId"
            value={formData.applicantId}
            onChange={handleChange}
            required
            className="ScheduleInterview-input"
          />
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
              'Schedule Interview'
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ScheduleInterview;
