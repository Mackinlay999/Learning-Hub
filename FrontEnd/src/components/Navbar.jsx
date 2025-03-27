import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Program from "./Program";
import "../style/NavBar.css";

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
        <Navbar expand="lg" className="w-100">
          <Container fluid className="d-flex justify-content-between align-items-center">
            
            {/* Brand Name on Left */}
            <Navbar.Brand as={Link} to="/" className="fw-bold logo">
              <motion.span whileHover={{ scale: 1.1 }}>
                <span className="text-primary">M</span>ackinlay Learning Hub
              </motion.span>
            </Navbar.Brand>

            {/* Nav Links at Center */}
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-center">
              <Nav className="nav-links d-flex align-items-center">
                <Nav.Link onClick={() => setShowDropdown(!showDropdown)}>
                  <motion.button className="btn-explore" whileHover={{ scale: 1.05 }}>
                    Explore Programs ⌄
                  </motion.button>
                </Nav.Link>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/career-support">Career Support</Nav.Link>
                <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>

            {/* Login Button on Right */}
            <motion.button 
              className="login-btn"
              whileHover={{ backgroundColor: "#D32F2F", color: "#ffffff" }}
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
