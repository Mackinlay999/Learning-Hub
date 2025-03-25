import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { motion } from 'framer-motion'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from 'react-icons/fa'
import '../style/Footer.css'

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true)
      } else {
        setShowScroll(false)
      }
    }
    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
            {/* Footer Logo & Copyright */}
            <Col md={4} className="footer-logo">
              <motion.p
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                &copy; 2024 Mackinlay Learning Hub. All Rights Reserved.
              </motion.p>
            </Col>

            {/* Quick Links Section */}
            <Col md={4} className="footer-links">
              <h5>Quick Links</h5>
              <ul>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <a href="#about">About Us</a>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <a href="#contact">Contact</a>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <a href="#careers">Careers</a>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                  <a href="#blog">Blog</a>
                </motion.li>
              </ul>
            </Col>

            {/* Social Media Links */}
            <Col md={4} className="footer-social">
              <h5>Follow Us</h5>
              <motion.a
                href="#"
                className="social-icon facebook"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="#"
                className="social-icon twitter"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="#"
                className="social-icon linkedin"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <FaLinkedinIn />
              </motion.a>
              <motion.a
                href="#"
                className="social-icon instagram"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <FaInstagram />
              </motion.a>
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
  )
}

export default Footer
