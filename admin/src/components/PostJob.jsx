import React, { useState } from 'react';
import axios from '../api/axios';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import '../style/PostJob.css';
const JOB_TYPES = ['Full-time', 'Internship'];

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: JOB_TYPES[0],
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post('/recruiters/post', formData);
      setFormData({ title: '', description: '', type: JOB_TYPES[0] });
      setStatus({ type: 'success', message: 'Job/Internship posted successfully!' });
    } catch (error) {
      console.error('Error posting job:', error);
      setStatus({ type: 'danger', message: error.response?.data?.message || 'Failed to post job.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="postjob-container py-5">
      <h3 className="postjob-title mb-4 fw-bold">Post Job/Internship</h3>

      {status.message && (
        <Alert
          variant={status.type}
          className="postjob-alert"
          onClose={() => setStatus({ type: '', message: '' })}
          dismissible
        >
          {status.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="postjob-form">
        <Form.Group controlId="title" className="postjob-group">
          <Form.Label className="postjob-label">Title</Form.Label>
          <Form.Control
            name="title"
            className="postjob-input"
            placeholder="e.g. Frontend Developer"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" className="postjob-group mt-3">
          <Form.Label className="postjob-label">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            className="postjob-textarea"
            placeholder="Job responsibilities, requirements, etc."
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="type" className="postjob-group mt-3">
          <Form.Label className="postjob-label">Type</Form.Label>
          <Form.Select
            name="type"
            className="postjob-select"
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

        <Button
          type="submit"
          variant="primary"
          className="postjob-submit-btn mt-4"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Posting...
            </>
          ) : (
            'Post'
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default PostJob;
