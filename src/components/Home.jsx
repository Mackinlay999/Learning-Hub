import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import ProgramCard from './ProgramCard'
import SuccessStory from './SuccessStory'
import Blog from './Blog'
import Footer from './Footer'
import ChatBot from './ChatBot' // Import ChatBot
import '../style/Home.css'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Empowering Leaders. Elevating Careers.
          </motion.h1>
          <p>Setting the Benchmark in Professional Education.</p>
          <div className="hero-buttons">
            <motion.button
              className="apply-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
            </motion.button>
            <motion.button
              className="explore-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Programs
            </motion.button>
          </div>
        </div>
      </div>

      {/* What Sets Us Apart */}
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="section-title">What Sets Us Apart?</h2>
              <ul className="features-list">
                <li>
                  <FaCheckCircle className="icon" /> Industry-designed
                  Curriculum
                </li>
                <li>
                  <FaCheckCircle className="icon" /> Elite Faculty & Industry
                  Mentors
                </li>
                <li>
                  <FaCheckCircle className="icon" /> Guaranteed Placement
                  Assistance
                </li>
                <li>
                  <FaCheckCircle className="icon" /> Global Business Case
                  Studies
                </li>
              </ul>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Featured Programs */}
      <Container className="mt-5">
        <h2 className="section-title">Featured Programs</h2>
        <Row>
          <ProgramCard
            title="HR Leadership"
            duration="6 months"
            mode="Online"
          />
          <ProgramCard
            title="Marketing Strategy"
            duration="5 months"
            mode="Classroom"
          />
          <ProgramCard
            title="Business Analytics"
            duration="12 months"
            mode="Online"
          />
        </Row>
      </Container>

      {/* Learning Experience */}
      <Container className="mt-5 learning-experience">
        <h2 className="section-title">The Mackinlay Learning Experience</h2>
        <p>
          Interactive AI-driven dashboard to track progress, assessments & job
          placements.
        </p>
      </Container>

      {/* Success Stories */}
      <Container className="mt-5">
        <h2 className="section-title">Student Success Stories</h2>
        <Row>
          <SuccessStory name="John Doe" position="HR Manager at XYZ Corp" />
          <SuccessStory name="Sarah Lee" position="Marketing Lead at ABC Ltd" />
        </Row>
      </Container>

      {/* Blog Section */}
      <Blog />

      {/* Call to Action */}
      <Container className="mt-5 text-center">
        <h2 className="section-title">
          Join Our Exclusive Community of Future Leaders
        </h2>
        <motion.button
          className="get-started-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </Container>

      {/* ChatBot Floating Button */}
      <ChatBot />
    </>
  )
}

export default Home
