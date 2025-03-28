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
    <>
      <motion.footer
        className="footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Container>
          <Row className="footer-content">
            {/* Footer Logo & Branding */}
            <Col md={4} className="footer-logo text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={Logo}
                  alt="Company Logo"
                  className="footer-logo-img"
                />
              </motion.div>
            </Col>

            {/* Quick Links Section */}
            <Col md={4} className="footer-links">
              <h5>Quick Links</h5>
              <ul>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link to="/about">About Us</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link to="/contact">Contact</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link to="/careers">Careers</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <Link to="/blog">Blog</Link>
                </motion.li>
              </ul>
            </Col>

            {/* Social Media Links */}
            <Col md={4} className="footer-social text-center">
              <h5>Follow Us</h5>
              <motion.a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon twitter"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/mackinlay-learning-hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <FaLinkedinIn />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/mackinlay_learning_hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <FaInstagram />
              </motion.a>
            </Col>
          </Row>

          {/* Copyright Text - Centered */}
          <Row>
            <Col className="text-center copyright-text">
              <p>&copy; 2024 Mackinlay Learning Hub. All Rights Reserved.</p>
            </Col>
          </Row>
        </Container>
      </motion.footer>

      {/* Scroll-to-Top Button */}
      {showScroll && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp />
        </motion.button>
      )}
    </>
  );
};

export default Footer;
