import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Button,
  ButtonGroup,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "../style/AdminBlogWebinar.css";

const AdminBlogWebinar = () => {
  const [publish, setPublish] = useState(false);
  const [tab, setTab] = useState("blog");
  const [formData, setFormData] = useState({
    blogTitle: "",
    blogContent: "",
    blogImage: null, // new
    webinarTitle: "",
    webinarDateTime: "",
    webinarDescription: "",
    webinarLink: "", // new
    typeofProgram: "", // new
  });
  const [registrants, setRegistrants] = useState([]);
  const [showRegistrants, setShowRegistrants] = useState(false);

  const handleViewRegistrants = async () => {
    try {
      const response = await axios.get(
        "https://learning-hub-p2yq.onrender.com/api/webinars/registrants"
      );
      setRegistrants(response.data); // Assuming backend returns an array
      setShowRegistrants(true);
    } catch (error) {
      console.error("Error fetching registrants:", error);
    }
  };
  const handleExportAttendance = async () => {
    try {
      const response = await axios.get(
        "https://learning-hub-p2yq.onrender.com/api/webinars/export",
        {
          responseType: "blob", // Important for downloading files
        }
      );

      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "attendance.xlsx"); // Adjust filename/extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting attendance:", error);
    }
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      blogImage: e.target.files[0],
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.blogTitle); // backend expects 'title'
      data.append("content", formData.blogContent); // backend expects 'content'
      data.append("publish", publish.toString()); // boolean or string "true"/"false"
      if (formData.blogImage) {
        data.append("image", formData.blogImage); // multer expects field name 'image'
      }

      const response = await axios.post(
        "https://learning-hub-p2yq.onrender.com/api/blog",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("✅ Blog created successfully!");
      console.log("Blog created:", response.data);
    } catch (error) {
      toast.error("❌ Error creating blog. Please try again.");
      console.error("Error creating blog:", error);
    }
  };

  const handleWebinarSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://learning-hub-p2yq.onrender.com/api/webinars",
        {
          title: formData.webinarTitle,
          dateTime: formData.webinarDateTime,
          description: formData.webinarDescription,
          link: formData.webinarLink,
          typeofProgram: formData.typeofProgram,
        }
      );
      toast.success("✅ Webinar scheduled successfully!");
      console.log("Webinar scheduled:", response.data);
    } catch (error) {
      toast.error("❌ Error scheduling webinar. Please try again.");
      console.error("Error scheduling webinar:", error);
    }
  };

  return (
    <Container className="blog-webinar-container py-5">
      <Row className="blog-webinar-align-items-center justify-content-between mb-4">
        <Col xs={12} md="auto">
          <h1 className="blog-webinar-title fw-bold">Blog & Webinars</h1>
        </Col>
        <Col xs={12} md="auto" className="mt-3 mt-md-0">
          <ButtonGroup className="blog-webinar-button-group">
            <Button
              className={`blog-webinar-button ${
                tab === "blog"
                  ? "blog-webinar-button-primary"
                  : "blog-webinar-button-secondary"
              }`}
              onClick={() => setTab("blog")}
            >
              Blog
            </Button>
            <Button
              className={`blog-webinar-button ${
                tab === "webinar"
                  ? "blog-webinar-button-primary"
                  : "blog-webinar-button-secondary"
              }`}
              onClick={() => setTab("webinar")}
            >
              Webinars
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {/* Blog Section */}
      {tab === "blog" && (
        <motion.div
          key="blog"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
          className="blog-webinar-appear"
        >
          <h2 className="blog-webinar-section-title mb-4">Create Blog Post</h2>
          <Form onSubmit={handleBlogSubmit}>
            <Form.Group className="blog-webinar-form-group mb-3">
              <Form.Label className="blog-webinar-form-label">
                Blog Title
              </Form.Label>
              <Form.Control
                className="blog-webinar-form-control"
                type="text"
                placeholder="Enter blog title"
                name="blogTitle"
                value={formData.blogTitle}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="blog-webinar-form-group mb-3">
              <Form.Label className="blog-webinar-form-label">
                Blog Content
              </Form.Label>
              <Form.Control
                className="blog-webinar-form-control"
                as="textarea"
                rows={6}
                placeholder="Write your blog content here..."
                name="blogContent"
                value={formData.blogContent}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="blog-webinar-form-group mb-3">
              <Form.Label className="blog-webinar-form-label">
                Blog Image
              </Form.Label>
              <Form.Control
                className="blog-webinar-form-control"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Form.Group className="blog-webinar-form-group mb-3 d-flex align-items-center gap-3">
              <Form.Label className="blog-webinar-switch-label mb-0">
                Publish:
              </Form.Label>
              <Form.Check
                type="switch"
                id="publish-switch"
                checked={publish}
                onChange={() => setPublish(!publish)}
                label={publish ? "Yes" : "No"}
              />
            </Form.Group>

            <Button
              type="submit"
              className="blog-webinar-button-schedule"
              variant="success"
            >
              Schedule Content
            </Button>
          </Form>
        </motion.div>
      )}

      {/* Webinar Section */}
      {tab === "webinar" && (
        <motion.div
          key="webinar"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.4 }}
          className="blog-webinar-appear"
        >
          <h2 className="blog-webinar-section-title mb-4">
            Schedule Upcoming Webinars
          </h2>
          <Form onSubmit={handleWebinarSubmit}>
            <Form.Group className="blog-webinar-form-group mb-3">
              <Form.Label className="blog-webinar-form-label">
                Webinar Title
              </Form.Label>
              <Form.Control
                className="blog-webinar-form-control"
                type="text"
                placeholder="Enter webinar title"
                name="webinarTitle"
                value={formData.webinarTitle}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="blog-webinar-form-group mb-3">
              <Form.Label className="blog-webinar-form-label">
                Date & Time
              </Form.Label>
              <Form.Control
                className="blog-webinar-form-control"
                type="datetime-local"
                name="webinarDateTime"
                value={formData.webinarDateTime}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="blog-webinar-form-group mb-3">
              <Form.Label className="blog-webinar-form-label">
                Webinar Description
              </Form.Label>
              <Form.Control
                className="blog-webinar-form-control"
                as="textarea"
                rows={4}
                placeholder="Webinar description..."
                name="webinarDescription"
                value={formData.webinarDescription}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="blog-webinar-form-group mb-3">
              <Form.Label className="blog-webinar-form-label">
                Webinar Link
              </Form.Label>
              <Form.Control
                className="blog-webinar-form-control"
                type="url"
                placeholder="Enter webinar link (e.g., Zoom, Google Meet)"
                name="webinarLink"
                value={formData.webinarLink}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="blog-webinar-form-group mb-3">
              <Form.Label className="blog-webinar-form-label">
                Type of Program
              </Form.Label>
              <Form.Control
                className="blog-webinar-form-control"
                type="text"
                placeholder="e.g., Workshop, Seminar, Live Q&A"
                name="typeofprogram"
                value={formData.typeofprogram}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="d-flex flex-wrap gap-3">
              <Button
                type="button"
                className="blog-webinar-button-view"
                variant="primary"
                onClick={handleViewRegistrants}
              >
                View Registrants
              </Button>

              <Button
                className="blog-webinar-button-export"
                variant="info"
                onClick={handleExportAttendance}
              >
                Export Attendance Post-Session
              </Button>
            </div>
            {showRegistrants && (
              <div className="mt-4">
                <h4>Registrants</h4>
                <ul>
                  {registrants.length === 0 ? (
                    <li>No registrants found.</li>
                  ) : (
                    registrants.map((r, idx) => (
                      <li key={idx}>
                        {r.name} ({r.email})
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </Form>
        </motion.div>
      )}
    </Container>
  );
};

export default AdminBlogWebinar;
