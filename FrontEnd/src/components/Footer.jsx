import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";
import "../style/Footer.css";
import Logo from "../images/logo.png";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      className="footer py-5 bg-dark text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Container>
        {/* Responsive 4-Column Layout */}
        <Row className="gy-4 align-items-center text-center text-md-start">
          {/* Column 1: Logo */}
          <Col md={3} className="text-md-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={Logo}
                alt="Company Logo"
                className="footer-logo-img mb-3"
              />
            </motion.div>
          </Col>

          {/* Column 2: Contact Info */}
          <Col md={3}  className="text-center">
            <h5 className="text-white">Contact Us</h5>
            <p className="text-white">📍 Bangalore, Karnataka</p>
            <p className="text-white">📞 09363352660</p>
            <p className="text-white">📧 harikrishg44@gmail.com</p>
            <p className="text-white">🌐 Mackinlay Learning Hub</p>
          </Col>

          {/* Column 3: Quick Links */}
          <Col md={3}className="text-center">
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/about" className="text-white">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-white">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/careers" className="text-white">
                Careers
              </Nav.Link>
              <Nav.Link as={Link} to="/blog" className="text-white">
                Blog
              </Nav.Link>
            </Nav>
          </Col>

          {/* Column 4: Social Media */}
          <Col md={3} className="text-md-end">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <motion.a
                href="https://www.facebook.com/"
                className="social-icon"
              >
                <FaFacebookF />
              </motion.a>
              <motion.a href="https://twitter.com/" className="social-icon">
                <FaTwitter />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/mackinlay-learning-hub/"
                className="social-icon"
              >
                <FaLinkedinIn />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/mackinlay_learning_hub/"
                className="social-icon"
              >
                <FaInstagram />
              </motion.a>
            </div>
          </Col>
        </Row>

        {/* Copyright Text */}
        <Row className="mt-4 ">
          <Col className="text-center">
            <p className="text-white">
              &copy; 2024 Mackinlay Learning Hub. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Scroll-to-Top Button */}
      {showScroll && (
        <motion.button
          className="scroll-to-top btn btn-primary"
          onClick={scrollToTop}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp />
        </motion.button>
      )}
    </motion.footer>
  );
};

export default Footer;
