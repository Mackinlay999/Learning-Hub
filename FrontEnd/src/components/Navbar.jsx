import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Program from './Program' // ✅ Import the new Program component
import '../style/NavBar.css'

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
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
                <Button variant="danger">Explore Programs ⌄</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/career-support">
                Career Support
              </Nav.Link>
              <Nav.Link as={Link} to="/success-story">
                Success Stories
              </Nav.Link>
              <Nav.Link as={Link} to="/enterprise">
                Enterprise
              </Nav.Link>
              <Nav.Link as={Link} to="/for-recruiters">
                For Recruiters
              </Nav.Link>

              <NavDropdown title="More" id="more-dropdown">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <NavDropdown.Item as={Link} to="/about">
                    About Us
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/contact">
                    Contact
                  </NavDropdown.Item>
                </motion.div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Button variant="outline-danger" className="login-btn">
            LOGIN
          </Button>
        </Container>
      </Navbar>

      {/* Explore Programs Dropdown */}
      <Program showDropdown={showDropdown} setShowDropdown={setShowDropdown} />
    </>
  )
}

export default NavBar
