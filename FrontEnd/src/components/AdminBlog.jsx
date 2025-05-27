import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Button,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../style/AdminBlog.css';

const AdminBlog = () => {
  const [publish, setPublish] = useState(false);
  const [formData, setFormData] = useState({
    blogTitle: '',
    blogContent: '',
    blogImage: null,
  });

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
      data.append('title', formData.blogTitle);
      data.append('content', formData.blogContent);
      data.append('publish', publish.toString());
      if (formData.blogImage) {
        data.append('image', formData.blogImage);
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

  return (
    <Container className="blog-webinar-container py-5">
      <Row className="justify-content-between mb-4">
        <Col>
          <h1 className="blog-webinar-title fw-bold">Create Blog Post</h1>
        </Col>
      </Row>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4 }}
        className="blog-webinar-appear"
      >
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
    </Container>
  );
};

export default AdminBlog;
