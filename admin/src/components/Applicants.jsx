import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Container,
  Table,
  Button,
  Alert,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../style/Applicants.css";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);
  const [shortlistingId, setShortlistingId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
  const [currentApplicant, setCurrentApplicant] = useState({
    name: "",
    email: "",
    resumeUrl: "",
    _id: null,
  });
  const navigate = useNavigate();

  // Fetch applicants on mount
  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get("/recruiters/applicants");
      setApplicants(res.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      setMessage({ type: "danger", text: "Failed to load applicants." });
    } finally {
      setLoading(false);
    }
  };

  const handleShortlist = async (id) => {
    setShortlistingId(id);
    try {
      await axios.put(`/recruiters/applicants/${id}/shortlist`);
      setApplicants((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, shortlisted: true } : app
        )
      );
      setMessage({ type: "success", text: "Applicant shortlisted!" });
    } catch (error) {
      console.error("Shortlist error:", error);
      setMessage({ type: "danger", text: "Error shortlisting applicant." });
    } finally {
      setShortlistingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this applicant?"))
      return;
    try {
      await axios.delete(`/recruiters/applicants/${id}`);
      setApplicants(applicants.filter((app) => app._id !== id));
      setMessage({ type: "success", text: "Applicant deleted successfully." });
    } catch (error) {
      console.error("Delete error:", error);
      setMessage({ type: "danger", text: "Error deleting applicant." });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === "add") {
        const res = await axios.post(
          "/recruiters/applicants",
          { ...currentApplicant, resumeUrl: currentApplicant.resumeUrl }
        );
        setApplicants([...applicants, res.data]);
        setMessage({ type: "success", text: "Applicant added!" });
      } else {
        const res = await axios.put(
          `/recruiters/applicants/${currentApplicant._id}`,
          { ...currentApplicant, resumeUrl: currentApplicant.resumeUrl }
        );
        setApplicants((prev) =>
          prev.map((app) => (app._id === currentApplicant._id ? res.data : app))
        );
        setMessage({ type: "success", text: "Applicant updated!" });
      }
      setShowForm(false);
    } catch (error) {
      console.error("Form submit error:", error);
      setMessage({ type: "danger", text: "Error submitting form." });
    }
  };
  

  const openEditForm = (app) => {
    setCurrentApplicant(app);
    setFormMode("edit");
    setShowForm(true);
  };

  const openAddForm = () => {
    setCurrentApplicant({ name: "", email: "", resumeUrl: "" });
    setFormMode("add");
    setShowForm(true);
  };

  return (
    <Container className="Applicant-container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="Applicant-title">Applicants</h3>
        <Button
          variant="secondary"
          onClick={() => navigate("/recruiters/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>

      <Button variant="success" onClick={openAddForm} className="mb-3">
        + Add Applicant
      </Button>

      {message.text && (
        <Alert
          variant={message.type}
          dismissible
          onClose={() => setMessage({ type: "", text: "" })}
          className="Applicant-alert"
        >
          {message.text}
        </Alert>
      )}

      {loading ? (
        <div className="Applicant-loader">
          <Spinner animation="border" role="status" />
        </div>
      ) : applicants.length === 0 ? (
        <p className="Applicant-empty">No applicants found.</p>
      ) : (
        <Table bordered responsive className="Applicant-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app) => (
              <tr
                key={app._id}
                className={app.shortlisted ? "Applicant-row-shortlisted" : ""}
              >
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => {
                      console.log("Navigating to resume:", app.resumeUrl);
                      navigate("/resume", {
                        state: { resumeUrl: app.resumeUrl },
                      });
                    }}
                  >
                    View
                  </Button>
                </td>
                <td>
                  {app.shortlisted ? (
                    <span className="text-success fw-semibold">
                      Shortlisted
                    </span>
                  ) : (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleShortlist(app._id)}
                      disabled={shortlistingId === app._id}
                      className="me-2"
                    >
                      {shortlistingId === app._id ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-1"
                          />
                          Shortlisting...
                        </>
                      ) : (
                        "Shortlist"
                      )}
                    </Button>
                  )}
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="me-2"
                    onClick={() => openEditForm(app)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(app._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formMode === "add" ? "Add Applicant" : "Edit Applicant"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={currentApplicant.name}
                onChange={(e) =>
                  setCurrentApplicant({
                    ...currentApplicant,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={currentApplicant.email}
                onChange={(e) =>
                  setCurrentApplicant({
                    ...currentApplicant,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Resume URL</Form.Label>
              <Form.Control
                type="text"
                required
                value={currentApplicant.resumeUrl}
                onChange={(e) =>
                  setCurrentApplicant({
                    ...currentApplicant,
                    resumeUrl: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {formMode === "add" ? "Add" : "Update"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Applicants;
