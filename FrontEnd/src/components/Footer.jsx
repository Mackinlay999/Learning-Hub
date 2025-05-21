import React, { useState, useEffect } from "react";
import { Container, Row, Image, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
      className="footer-main py-5 bg-dark text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* <Container> */}
        <Row className="gy-4 align-items-start justify-content-between">
          {/* Logo */}
          <motion.div
            className="col-md-3 text-center text-md-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src={Logo}
                alt="Mackinlay Learning Hub Logo"
                className="footer-main-logo-img mb-3"
              />
            </motion.div>
          </motion.div>

          {/* Contact and Links */}
          <motion.div
            className="col-md-6 d-flex flex-column flex-md-row justify-content-around text-center text-md-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact */}
            <div className="footer-main-contact mb-4 mb-md-0">
              <h5>Contact Us</h5>
              <p>📍 Bangalore, Karnataka</p>
              <p>📞 09363352660</p>
              <p>📧 harikrishg44@gmail.com</p>
              <p>🌐 Mackinlay Learning Hub</p>
            </div>

            {/* Links */}
            <div className="footer-main-links">
              <h5>Quick Links</h5>
              <Nav className="flex-column">
                {[
                  { path: "/about", label: "About Us" },
                  { path: "/contact", label: "Contact" },
                  { path: "/jobs", label: "Careers" },
                  { path: "/blog", label: "Blog" },
                ].map(({ path, label }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 8, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Nav.Link
                      as={Link}
                      to={path}
                      className="footer-main-link text-white"
                      aria-label={label}
                    >
                      {label}
                    </Nav.Link>
                  </motion.div>
                ))}
              </Nav>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            className="col-md-3 text-center text-md-end"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 flex-wrap">
              {[
                { icon: <FaFacebookF />, link: "https://facebook.com/" },
                { icon: <FaTwitter />, link: "https://twitter.com/" },
                {
                  icon: <FaLinkedinIn />,
                  link: "https://linkedin.com/company/mackinlay-learning-hub/",
                },
                {
                  icon: <FaInstagram />,
                  link: "https://instagram.com/mackinlay_learning_hub/",
                },
              ].map(({ icon, link }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-main-social-icon"
                  aria-label={`Visit our ${link.split(".")[1]} page`}
                  whileHover={{ scale: 1.2, color: "#FFC107" }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </Row>

        {/* Copyright */}
        <motion.div
          className="text-center mt-4 footer-main-copyright"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="mb-0">
            &copy; 2025 <strong>Mackinlay Learning Hub</strong>. All Rights
            Reserved.
          </p>
        </motion.div>
      {/* </Container> */}

      {/* Scroll To Top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            key="scroll-button"
            className="footer-main-scroll-to-top footer-main-btn btn btn-primary"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default Footer;
