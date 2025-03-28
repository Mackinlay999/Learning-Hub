import React from "react";
import { motion } from "framer-motion";
import "../style/About.css";
import learner from  "../images/learners.jpg";
import contactImage from "../images/contactImage.png"
import aboutImage from "../images/1.png"
const About = () => {
  return (
    <>
      <section className="about-container1">
      <motion.div
        className="about-content1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="about-title1">
          Pioneering Excellence in{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Global Education
          </motion.span>
        </h1>
        <p className="about-description1">
          Mackinlay Learning Hub is at the forefront of redefining professional 
          education. Founded with a vision to cultivate intellectual brilliance and 
          industry expertise, our institution stands as a beacon of academic 
          excellence.
        </p>
        <p className="about-description1">
          Our distinguished faculty comprises world-class educators, industry 
          leaders, and thought pioneers who bring an unmatched depth of knowledge 
          and mentorship to our learners.
        </p>
        <p className="about-description1">
          Driven by innovation, we are committed to fostering a transformative 
          learning experience that shapes the future of business and technology. 
          Whether you are an aspiring leader or a seasoned professional, our 
          programs are designed to accelerate your success.
        </p>
        <motion.button
          className="about-btn1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Innovation. Excellence. Leadership.
        </motion.button>
      </motion.div>

      <motion.div
        className="about-image1"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={aboutImage} alt="About Learning" />
      </motion.div>
    </section>
      <section className="about-section">
      <div className="overlay"></div> {/* Background overlay effect */}
      <div className="about-container">
        {/* Text Content */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            <span className="highlight">Impactful Learning</span> <br />
            for Everyone
          </h1>
          <p>
            With more than <strong>12.4 Million learners</strong> in 170+ countries,
            Great Learning is a leading global edtech company for professional and
            higher education, offering industry-relevant programs.
          </p>
          <button className="cta-button">Explore More</button>
        </motion.div>

        {/* Image / Video Section */}
        <motion.div
          className="about-image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="video-container">
            <img src={learner} alt="About Us" className="about-img" />
            <div className="play-button">
              <motion.div
                className="play-icon"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ▶
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    <section className="mission-section">
    <div className="mission-container">
      {/* Left Side - Our Mission */}
      <div className="mission-left">
        <h2>Our <br /> Mission</h2>
      </div>

      {/* Right Side - Mission Content */}
      <div className="mission-right">
        <h2 className="mission-heading">
          Enabling career success through high-quality transformative learning
        </h2>
        <p className="mission-text">
          As India’s largest professional learning company with a global presence in over 170 countries, we're on a mission to empower professionals to become proficient and future-ready.
        </p>
        <p className="mission-text">
          Over the past 11 years, we have transformed careers by providing high-quality education that enables thousands of professionals to achieve remarkable career progression at leading organizations such as Microsoft, Amazon, Adobe, American Express, Deloitte, IBM, Accenture, McKinsey, and beyond.
        </p>
        <p className="mission-text">
          Through a combination of deep-rooted industry expertise, academic rigour, and AI-driven learning, we deliver a guided educational experience that imparts all the skills required to thrive in today’s rapidly evolving global landscape.
        </p>
      </div>
    </div>
  </section>
  <section className="contact-section">
      <div className="contact-container">
        {/* Left Side - Text & Button */}
        <div className="contact-left">
          <h3>GET IN TOUCH</h3>
          <h2>For Queries, Feedback or Assistance</h2>
          <button className="contact-button">Contact Us</button>
        </div>

        {/* Right Side - Image */}
        <div className="contact-right">
          <img src={contactImage} alt="Contact Illustration" />
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
