import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Program from './Program';
import '../style/NavBar.css';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <motion.nav 
        className="custom-navbar"
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/" className="fw-bold logo">
              <motion.span whileHover={{ scale: 1.1 }}>
                <span className="text-danger">M</span>ackinlay Learning Hub
              </motion.span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="mx-auto align-items-center nav-links">
                <Nav.Link onClick={() => setShowDropdown(!showDropdown)}>
                  <motion.button 
                    className="btn-explore"
                    whileHover={{ scale: 1.05 }}
                  >
                    Explore Programs ⌄
                  </motion.button>
                </Nav.Link>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/career-support">Career Support</Nav.Link>
                <Nav.Link as={Link} to="/success-story">Success Stories</Nav.Link>
                <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>

            <motion.button 
              className="login-btn"
              whileHover={{ backgroundColor: '#d32f2f', color: '#ffffff' }}
            >
              LOGIN
            </motion.button>
          </Container>
        </Navbar>
      </motion.nav>

      {/* Explore Programs Dropdown */}
      <Program showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
    </>
  );
};

export default NavBar;
