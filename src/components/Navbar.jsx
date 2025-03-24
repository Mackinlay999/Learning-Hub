import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'
import {
  FaUserTie,
  FaChartLine,
  FaShoppingCart,
  FaBusinessTime,
  FaMoneyBillWave,
} from 'react-icons/fa'
import '../style/NavBar.css' // Import custom styles

const programCategories = [
  { name: 'HR', icon: <FaUserTie /> },
  { name: 'Marketing', icon: <FaChartLine /> },
  { name: 'Sales', icon: <FaShoppingCart /> },
  { name: 'Business Analyst', icon: <FaBusinessTime /> },
  { name: 'Finance', icon: <FaMoneyBillWave /> },
]

const programs = [
  { title: 'HR Leadership Program', duration: '6 months', mode: 'Online' },
  {
    title: 'Marketing Strategy Course',
    duration: '5 months',
    mode: 'Classroom',
  },
  {
    title: 'Sales Mastery Certification',
    duration: '8 months',
    mode: 'Online',
  },
  {
    title: 'Business Analytics Program',
    duration: '12 months',
    mode: 'Online',
  },
  { title: 'Finance Management Course', duration: '10 months', mode: 'Hybrid' },
]

const quickLinks = [
  { title: 'Salary Builder', desc: 'Compare your salary v/s peers' },
  { title: 'Career Growth', desc: 'Enhance your career path' },
  { title: 'On-Demand Webinars', desc: 'Watch recorded webinars' },
]

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          {/* Logo */}
          <Navbar.Brand href="#" className="fw-bold logo">
            <motion.span whileHover={{ scale: 1.1 }}>
              <span className="text-danger">G</span>reat Learning
            </motion.span>
          </Navbar.Brand>

          {/* Navbar Toggle */}
          <Navbar.Toggle aria-controls="navbar-nav" />

          {/* Navbar Links */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mx-auto align-items-center nav-links">
              <Nav.Link onClick={() => setShowDropdown(!showDropdown)}>
                <Button variant="danger">Explore Programs ⌄</Button>
              </Nav.Link>
              <Nav.Link href="#">Career Support</Nav.Link>
              <Nav.Link href="#">Success Stories</Nav.Link>
              <Nav.Link href="#">Enterprise</Nav.Link>
              <Nav.Link href="#">For Recruiters</Nav.Link>

              <NavDropdown title="More" id="more-dropdown">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <NavDropdown.Item href="#">About Us</NavDropdown.Item>
                  <NavDropdown.Item href="#">Contact</NavDropdown.Item>
                </motion.div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          {/* Login Button */}
          <Button variant="outline-danger" className="login-btn">
            LOGIN
          </Button>
        </Container>
      </Navbar>

      {/* Dropdown Content */}
      {showDropdown && (
        <motion.div
          className="dropdown-menu-container"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="dropdown-content">
            {/* Sidebar */}
            <div className="sidebar">
              <h5 className="sidebar-title">Programs</h5>
              {programCategories.map((category, index) => (
                <div key={index} className="sidebar-item">
                  {category.icon} <span>{category.name}</span>
                </div>
              ))}
            </div>

            {/* Programs */}
            <div className="programs">
              <h5>Popular Programs</h5>
              <div className="program-grid">
                {programs.map((program, index) => (
                  <div key={index} className="program-card">
                    <h6>{program.title}</h6>
                    <p>
                      {program.duration} • {program.mode}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="quick-links">
              <h5>Quick Links</h5>
              {quickLinks.map((link, index) => (
                <div key={index} className="quick-link-item">
                  <strong>{link.title}</strong>
                  <p>{link.desc}</p>
                </div>
              ))}
              <button
                className="close-btn"
                onClick={() => setShowDropdown(false)}
              >
                ✖
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default NavBar
