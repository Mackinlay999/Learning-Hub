import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Users, CalendarCheck } from 'lucide-react';
import axios from '../api/axios';
import '../style/AdminRecruiterDashboard.css';

const features = [
  {
    title: 'Partner Companies',
    description: 'Explore companies partnered with our platform.',
    link: '/admin/recruiters/partners',
    icon: <Briefcase size={28} />,
    apiCall: async () => {
      try {
        const response = await axios.get('/recruiters/partners');
        return response.data;
      } catch (error) {
        console.error('Error fetching partner companies:', error);
        return [];
      }
    }
  },
  {
    title: 'Post Job/Internship',
    description: 'Add new job or internship openings.',
    link: '/admin/recruiters/post',
    icon: <FileText size={28} />
  },
  {
    title: 'View Applicants',
    description: 'Access a list of applicants for your postings.',
    link: '/admin/recruiters/applicants',
    icon: <Users size={28} />
  },
  {
    title: 'Shortlist & Schedule Interviews',
    description: 'Manage shortlists and schedule interviews easily.',
    link: '/admin/recruiters/schedule',
    icon: <CalendarCheck size={28} />
  }
];

const AdminRecruiterDashboard = () => {
  const [partnerCompanies, setPartnerCompanies] = useState([]);

  useEffect(() => {
    const fetchPartnerCompanies = async () => {
      const companies = await features[0].apiCall();
      setPartnerCompanies(companies);
    };
    fetchPartnerCompanies();
  }, []);

  return (
    <Container className="admin-recruiter-dashboard-container py-5">
      <motion.h2
        className="admin-recruiter-dashboard-heading text-center mb-5 fw-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Recruiter Dashboard
      </motion.h2>

      <Row className="admin-recruiter-dashboard-row g-4">
        {features.map((item, index) => (
          <Col xs={12} sm={6} lg={6} xl={6} key={item.id || index}>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="admin-recruiter-dashboard-motion"
            >
              <Card className="admin-recruiter-dashboard-card h-100 shadow-sm border-0 rounded-4">
                <Card.Body className="admin-recruiter-dashboard-card-body d-flex flex-column justify-content-between">
                  <div>
                    <div className="admin-recruiter-dashboard-icon-title d-flex align-items-center gap-3 mb-3">
                      <div className="admin-recruiter-dashboard-icon-circle bg-primary text-white d-flex justify-content-center align-items-center rounded-circle">
                        {item.icon}
                      </div>
                      <Card.Title className="admin-recruiter-dashboard-card-title mb-0 fw-semibold">
                        {item.title}
                      </Card.Title>
                    </div>
                    <Card.Text className="admin-recruiter-dashboard-card-text text-muted">
                      {item.description}
                    </Card.Text>
                  </div>
                  <div className="admin-recruiter-dashboard-button-wrapper mt-3">
                    <Link to={item.link}>
                      <Button
                        variant="outline-primary"
                        aria-label={`Go to ${item.title}`}
                        className="admin-recruiter-dashboard-button"
                      >
                        Go
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <Row className="admin-recruiter-dashboard-partner-row g-4 mt-4">
        {partnerCompanies.length > 0 ? (
          partnerCompanies.map((company, index) => (
            <Col key={index} xs={12} sm={6} lg={4}>
              <Card className="admin-recruiter-dashboard-partner-card h-100 shadow-sm border-0 rounded-4">
                <Card.Body className="admin-recruiter-dashboard-partner-card-body">
                  <Card.Title className="admin-recruiter-dashboard-partner-title">{company.name}</Card.Title>
                  <Card.Text className="admin-recruiter-dashboard-partner-description">{company.description}</Card.Text>
                  <Button
                    variant="link"
                    href={company.website}
                    target="_blank"
                    className="admin-recruiter-dashboard-partner-button"
                  >
                    Visit Website
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="admin-recruiter-dashboard-no-companies">No partner companies available</p>
        )}
      </Row>
    </Container>
  );
};

export default AdminRecruiterDashboard;