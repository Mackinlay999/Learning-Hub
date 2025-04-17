// src/pages/Partners.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import {
  Container, Row, Col, Card, Button, Modal, Form, Alert,
} from 'react-bootstrap';
import '../style/Partners.css'; // Don't forget the CSS import

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', website: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch partners from backend
  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await axios.get('/recruiters/partners');
      setPartners(res.data);
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error fetching partners data.' });
    }
  };

  const handleShowModal = (partner = null) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name,
        description: partner.description,
        website: partner.website,
      });
    } else {
      setEditingPartner(null);
      setFormData({ name: '', description: '', website: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', description: '', website: '' });
    setMessage({ type: '', text: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPartner) {
        await axios.put(`/recruiters/partners/${editingPartner._id}`, formData);
        setMessage({ type: 'success', text: 'Partner updated successfully.' });
      } else {
        await axios.post('/recruiters/partners', formData);
        setMessage({ type: 'success', text: 'Partner added successfully.' });
      }
      fetchPartners();
      handleCloseModal();
    } catch (err) {
      setMessage({ type: 'danger', text: 'Error submitting the form. Please try again.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return;
    try {
      await axios.delete(`/recruiters/partners/${id}`);
      setMessage({ type: 'success', text: 'Partner deleted.' });
      fetchPartners();
    } catch (err) {
      setMessage({ type: 'danger', text: 'Error deleting partner.' });
    }
  };

  return (
    <Container className="Partners-container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Partner Companies</h3>
        <Button variant="success" onClick={() => handleShowModal()}>Add Partner</Button>
      </div>

      {message.text && <Alert variant={message.type}>{message.text}</Alert>}

      <Row>
        {partners.map((company) => (
          <Col key={company._id} md={4}>
            <Card className="mb-4 shadow-sm Partners-card">
              <Card.Body>
                <Card.Title>{company.name}</Card.Title>
                <Card.Text>{company.description}</Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <Button href={company.website} target="_blank" variant="primary" size="sm">Visit</Button>
                  <div>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(company)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(company._id)}>Delete</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingPartner ? 'Edit Partner' : 'Add Partner'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter partner name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter partner description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Website</Form.Label>
              <Form.Control
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
                placeholder="Enter partner website URL"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="Partners-submit-btn">
              {editingPartner ? 'Update' : 'Create'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Partners;
