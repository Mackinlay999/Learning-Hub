import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../style/Navbar.css";
import logo from "../images/logo.png";

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
          <Container fluid>
            {/* Left Side: Logo */}
            <Navbar.Brand as={Link} to="/" className="fw-bold navbar-logo1">
              <motion.img
                src={logo}
                alt="Logo"
                className="navbar-logo"
                whileHover={{ scale: 1.1 }}
              />
            </Navbar.Brand>

            {/* Navbar Toggle for Mobile */}
            <Navbar.Toggle aria-controls="navbar-nav" />

            {/* Center & Right: Nav Links + Login Button */}
            <Navbar.Collapse id="navbar-nav">
              <div className="w-100 d-flex justify-content-between align-items-center">
                {/* Center: Navigation Links */}
                <Nav className="nav-links d-flex align-items-center">

                  <Nav.Link as={Link} to="/Dashboard">
                    Dashboard
                  </Nav.Link>
                </Nav>

                {/* Right: Login Button (Inside Navbar) */}
                <div className="login">
                <Link to="/login">
                  <motion.button 
                    className="navbar-login-btn-1"
                    whileHover={{ backgroundColor: "#D32F2F" , color: "#ffffff" }}
                  >

                    LOGIN
                  </motion.button>
                </Link>
                </div>
                
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </motion.nav>
    </>
  );
};

export default NavBar;
