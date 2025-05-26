import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Button,
  ButtonGroup,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../style/AdminBlogWebinar.css';

const AdminBlogWebinar = () => {
  const [publish, setPublish] = useState(false);
  const [tab, setTab] = useState('blog');
  const [formData, setFormData] = useState({
    blogTitle: '',
    blogContent: '',
    blogImage: null, // new
    webinarTitle: '',
    webinarDateTime: '',
    webinarDescription: '',
    webinarLink: '', // new
    typeOfProgram: '', // new
  });
  // const [registrants, setRegistrants] = useState([]);
  // const [showRegistrants, setShowRegistrants] = useState(false);

  // const handleViewRegistrants = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://learning-hub-p2yq.onrender.com/api/webinars/registrants',
  //     );
  //     setRegistrants(response.data); // Assuming backend returns an array
  //     setShowRegistrants(true);
  //   } catch (error) {
  //     console.error('Error fetching registrants:', error);
  //   }
  // };
  // const handleExportAttendance = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://learning-hub-p2yq.onrender.com/api/webinars/export',
  //       {
  //         responseType: 'blob', // Important for downloading files
  //       },
  //     );

  //     // Create a blob URL and trigger download
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'attendance.xlsx'); // Adjust filename/extension
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error('Error exporting attendance:', error);
  //   }
  // };

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
      data.append('title', formData.blogTitle); // backend expects 'title'
      data.append('content', formData.blogContent); // backend expects 'content'
      data.append('publish', publish.toString()); // boolean or string "true"/"false"
      if (formData.blogImage) {
        data.append('image', formData.blogImage); // multer expects field name 'image'
      }

      const response = await axios.post(
        'https://learning-hub-p2yq.onrender.com/api/blog',
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      toast.success('✅ Blog created successfully!');
      console.log('Blog created:', response.data);
    } catch (error) {
      toast.error('❌ Error creating blog. Please try again.');
      console.error('Error creating blog:', error);
    }
  };

  const handleWebinarSubmit = async (e) => {
    e.preventDefault();

    const {
      webinarTitle,
      webinarDateTime,
      webinarDescription,
      webinarLink,
      typeOfProgram,
    } = formData;

    // Simple field validation
    if (
      ![
        webinarTitle,
        webinarDateTime,
        webinarDescription,
        webinarLink,
        typeOfProgram,
      ].every(Boolean)
    ) {
      toast.error('Please fill out all webinar fields.');
      return;
    }

    // Validate URL format
    if (!/^https?:\/\//i.test(webinarLink)) {
      toast.error('Please include http:// or https:// in the webinar link.');
      return;
    }

    try {
      const trimmedData = {
        webinarTitle: webinarTitle.trim(),
        webinarDateTime: new Date(webinarDateTime).toISOString(),
        webinarDescription: webinarDescription.trim(),
        webinarLink: webinarLink.trim(),
        typeOfProgram: typeOfProgram.trim(),
      };

      console.log('Sending webinar data:', trimmedData);

      const response = await axios.post(
        'https://learning-hub-p2yq.onrender.com/api/webinars',
        trimmedData,
        { headers: { 'Content-Type': 'application/json' } },
      );

      toast.success('✅ Webinar submitted successfully!');

      // Reset form after successful submission
      setFormData({
        webinarTitle: '',
        webinarDateTime: '',
        webinarDescription: '',
        webinarLink: '',
        typeOfProgram: '',
      });
    } catch (error) {
      console.error('Error scheduling webinar:', error);
      toast.error(
        error.response?.data?.message || '❌ Failed to schedule webinar',
      );
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
                tab === 'blog'
                  ? 'blog-webinar-button-primary'
                  : 'blog-webinar-button-secondary'
              }`}
              onClick={() => setTab('blog')}
            >
              Blog
            </Button>
            <Button
              className={`blog-webinar-button ${
                tab === 'webinar'
                  ? 'blog-webinar-button-primary'
                  : 'blog-webinar-button-secondary'
              }`}
              onClick={() => setTab('webinar')}
            >
              Webinars
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {/* Blog Section */}
      {tab === 'blog' && (
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
                label={publish ? 'Yes' : 'No'}
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
      {/* Webinar Section */}
      {tab === 'webinar' && (
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
                type="text"
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
                name="typeOfProgram"
                value={formData.typeOfProgram}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button
              type="submit"
              className="blog-webinar-button-submit"
              variant="success"
            >
              Post Webinar
            </Button>
          </Form>
        </motion.div>
      )}
    </Container>
  );
};

export default AdminBlogWebinar;
