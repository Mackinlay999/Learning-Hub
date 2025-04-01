import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"; // Added NavDropdown import
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Program from "./Program";
import "../style/NavBar.css";
import logo from "../images/logo.png"; // Import your logo image

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
          <Container
            fluid
            className="d-flex justify-content-between align-items-center"
          >
            {/* Logo + Brand Name */}
            <Navbar.Brand
              as={Link}
              to="/"
              className="fw-bold logo d-flex align-items-center"
            >
              <motion.img
                src={logo}
                alt="Logo"
                className="navbar-logo"
                whileHover={{ scale: 1.1 }}
              />
            </Navbar.Brand>

            {/* Nav Links at Center */}
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-center">
              <Nav className="nav-links d-flex align-items-center">
                <Nav.Link onClick={() => setShowDropdown(!showDropdown)}>
                  <motion.button
                    className="btn-explore"
                    whileHover={{ scale: 1.05 }}
                  >
                    Explore Programs ⌄
                  </motion.button>
                </Nav.Link>

                <Nav.Link as={Link} to="/career-support">Career Support</Nav.Link>
<<<<<<< HEAD

                <Nav.Link as={Link} to="/success-story">Success Stories</Nav.Link>
                <Nav.Link as={Link} to="/enterprise">Enterprise</Nav.Link> 
                <Nav.Link as={Link} to="/for-recruiters">For Recruiters</Nav.Link> 
              
=======
                <Nav.Link as={Link} to="/success-story">Success Stories</Nav.Link>
                <Nav.Link as={Link} to="/enterprise">Enterprise</Nav.Link>
                <Nav.Link as={Link} to="/for-recruiters">For Recruiters</Nav.Link>
               
>>>>>>> marcus
                <NavDropdown title="More" id="more-dropdown">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NavDropdown.Item as={Link} to="/webinars">
                      Free Counselling Webinars
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/blog-training">
                      Blog & Training Program
                    </NavDropdown.Item>
                  </motion.div>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

            {/* Login Button on Right */}
            <Link to="/login">
              <motion.button
                className="login-btn"
                whileHover={{ backgroundColor: "#D32F2F", color: "#ffffff" }}
              >
                LOGIN
              </motion.button>
            </Link>
          </Container>
        </Navbar>
      </motion.nav>

      {/* Explore Programs Dropdown */}
      <Program showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
    </>
  );
};

export default NavBar;
