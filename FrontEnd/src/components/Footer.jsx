import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { motion } from 'framer-motion'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from 'react-icons/fa'
import '../style/Footer.css'
import Logo from '../images/logo.png' // Ensure the logo image is in the correct folder

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 200)
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
        className="footer-container1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Container>
          <Row className="footer-content1">
            {/* Footer Logo & Branding */}
            <Col md={4} className="footer-logo1">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image src={Logo} alt="Company Logo" className="footer-logo-img" />
              </motion.div>
            </Col>

            {/* Quick Links Section */}
            <Col md={4} className="footer-links1">
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
              <motion.a href="#" target="_blank" rel="noopener noreferrer" className="social-icon facebook" whileHover={{ scale: 1.2, rotate: 10 }}>
                <FaFacebookF />
              </motion.a>
              <motion.a href="#" target="_blank" rel="noopener noreferrer" className="social-icon twitter" whileHover={{ scale: 1.2, rotate: -10 }}>
                <FaTwitter />
              </motion.a>
              <motion.a href="https://www.linkedin.com/company/mackinlay-learning-hub/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" whileHover={{ scale: 1.2, rotate: 10 }}>
                <FaLinkedinIn />
              </motion.a>
              <motion.a href="https://www.instagram.com/mackinlay_learning_hub/" target="_blank" rel="noopener noreferrer" className="social-icon instagram" whileHover={{ scale: 1.2, rotate: -10 }}>
                <FaInstagram />
              </motion.a>
            </Col>
          </Row>

          {/* Copyright Text - Centered */}
          <Row>
            <Col className="text-center footer-copyright-text-1">
              <p className="text-white">&copy; 2024 Mackinlay Learning Hub. All Rights Reserved.</p>
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
