import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Users, CalendarCheck } from 'lucide-react';

const features = [
  {
    title: 'Partner Companies',
    description: 'Explore companies partnered with our platform.',
    link: '/recruiters/partners',
    icon: <Briefcase size={32} color="#0d6efd" />
  },
  {
    title: 'Post Job/Internship',
    description: 'Add new job or internship openings.',
    link: '/recruiters/post',
    icon: <FileText size={32} color="#0d6efd" />
  },
  {
    title: 'View Applicants',
    description: 'Access a list of applicants for your postings.',
    link: '/recruiters/applicants',
    icon: <Users size={32} color="#0d6efd" />
  },
  {
    title: 'Shortlist & Schedule Interviews',
    description: 'Manage shortlists and schedule interviews easily.',
    link: '/recruiters/schedule',
    icon: <CalendarCheck size={32} color="#0d6efd" />
  }
];

const RecruiterDashboard = () => {
  return (
    <Container className="py-5">
      <motion.h2
        className="text-center mb-5"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Recruiter Dashboard
      </motion.h2>

      <Row>
        {features.map((item, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">{item.icon}</div>
                    <Card.Title>{item.title}</Card.Title>
                  </div>
                  <Card.Text>{item.description}</Card.Text>
                  <Link to={item.link}>
                    <Button variant="primary">Go</Button>
                  </Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecruiterDashboard;
