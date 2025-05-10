// src/pages/Partners.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../style/AdminPartners.css"; // Don't forget the CSS import

const AdminPartners = () => {
  const [partners, setPartners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    about: "",
    email: "",
    phoneNumber: "",
    logoUrl: "",
    linkedin: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await axios.get("/recruiters/partners");
      setPartners(res.data);
    } catch (error) {
      setMessage({ type: "danger", text: "Error fetching partners data." });
    }
  };

  const handleShowModal = (partner = null) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name || "",
        description: partner.description || "",
        website: partner.website || "",
        about: partner.about || "",
        email: partner.email || "",
        phoneNumber: partner.phoneNumber || "",
        logoUrl: partner.logoUrl || "",
        linkedin: partner.linkedin || "",
      });
    } else {
      setEditingPartner(null);
      setFormData({
        name: "",
        description: "",
        website: "",
        about: "",
        email: "",
        phoneNumber: "",
        logoUrl: "",
        linkedin: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      description: "",
      website: "",
      about: "",
      email: "",
      phoneNumber: "",
      logoUrl: "",
      linkedin: "",
    });
    setMessage({ type: "", text: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPartner) {
        await axios.put(`/recruiters/partners/${editingPartner._id}`, formData);
        setMessage({ type: "success", text: "Partner updated successfully." });
      } else {
        await axios.post("/recruiters/partners", formData);
        setMessage({ type: "success", text: "Partner added successfully." });
      }
      fetchPartners();
      handleCloseModal();
    } catch (err) {
      setMessage({
        type: "danger",
        text: "Error submitting the form. Please try again.",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this partner?"))
      return;
    try {
      await axios.delete(`/recruiters/partners/${id}`);
      setMessage({ type: "success", text: "Partner deleted." });
      fetchPartners();
    } catch (err) {
      setMessage({ type: "danger", text: "Error deleting partner." });
    }
  };

  return (
    <Container className="admin-partner-container py-5">
      <div className="admin-partner-header d-flex justify-content-between align-items-center mb-4">
        <h3 className="admin-partner-title">Partner Companies</h3>
        <div className="admin-partner-header-btns">
          <Button
            variant="secondary"
            className="admin-partner-back-btn me-2"
            onClick={() => navigate("/admin/recruiters/dashboard")}
          >
            Back to Dashboard
          </Button>
          <Button
            variant="success"
            className="admin-partner-add-btn"
            onClick={() => handleShowModal()}
          >
            Add Partner
          </Button>
        </div>
      </div>
      {message.text && (
        <Alert variant={message.type} className="admin-partner-alert">
          {message.text}
        </Alert>
      )}

      <Row className="admin-partner-row">
        {partners.map((company) => (
          <Col key={company._id} md={4} className="admin-partner-col">
            <Card className="admin-partner-card mb-4 shadow-sm">
              <Card.Body className="admin-partner-card-body">
                <Card.Title className="admin-partner-card-title">
                  {company.name}
                </Card.Title>
                <Card.Text className="admin-partner-card-description">
                  {company.description}
                </Card.Text>
                <div className="admin-partner-card-actions d-flex justify-content-between align-items-center mt-3">
                  <Button
                    href={company.website}
                    target="_blank"
                    variant="primary"
                    size="sm"
                    className="admin-partner-visit-btn"
                  >
                    Visit
                  </Button>
                  <div>
                    <Button
                      variant="warning"
                      size="sm"
                      className="admin-partner-edit-btn me-2"
                      onClick={() => handleShowModal(company)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="admin-partner-delete-btn"
                      onClick={() => handleDelete(company._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="admin-partner-modal"
      >
        <Modal.Header closeButton className="admin-partner-modal-header">
          <Modal.Title className="admin-partner-modal-title">
            {editingPartner ? "Edit Partner" : "Add Partner"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="admin-partner-modal-body">
          <Form onSubmit={handleSubmit} className="admin-partner-form">
            <Form.Group className="mb-3 admin-partner-form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter partner name"
                className="admin-partner-form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3 admin-partner-form-group">
              <Form.Label>About</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Enter more about the company"
                className="admin-partner-form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3 admin-partner-form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter contact email"
                className="admin-partner-form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3 admin-partner-form-group">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="admin-partner-form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3 admin-partner-form-group">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter partner description"
                className="admin-partner-form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3 admin-partner-form-group">
              <Form.Label>Logo URL</Form.Label>
              <Form.Control
                name="logoUrl"
                value={formData.logoUrl}
                onChange={handleChange}
                placeholder="Enter logo image URL"
                className="admin-partner-form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3 admin-partner-form-group">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="Enter LinkedIn URL"
                className="admin-partner-form-control"
              />
            </Form.Group>

            <Form.Group className="mb-3 admin-partner-form-group">
              <Form.Label>Website</Form.Label>
              <Form.Control
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
                placeholder="Enter partner website URL"
                className="admin-partner-form-control"
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="admin-partner-submit-btn"
            >
              {editingPartner ? "Update" : "Create"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPartners;
