import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaEnvelope, FaChartBar, FaCog } from 'react-icons/fa';
import '../style/Sidebar.css'; // Import the CSS we'll add next

const Sidebar = () => {
  return (
    <div className="custom-sidebar">
      <div className="sidebar-header">
        <h5 className="brand-text">Learn & Earn</h5>
      </div>
      <Nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-nav-link" activeclassname="active">
          <FaHome className="me-2" /> Dashboard
        </NavLink>
        <NavLink to="/community" className="sidebar-nav-link" activeclassname="active">
          <FaUsers className="me-2" /> Community
        </NavLink>
        <NavLink to="/messages" className="sidebar-nav-link" activeclassname="active">
          <FaEnvelope className="me-2" /> Messages
        </NavLink>
        <NavLink to="/analytics" className="sidebar-nav-link" activeclassname="active">
          <FaChartBar className="me-2" /> Analytics
        </NavLink>
        <NavLink to="/settings" className="sidebar-nav-link" activeclassname="active">
          <FaCog className="me-2" /> Settings
        </NavLink>
      </Nav>
    </div>
  );
};

export default Sidebar;
