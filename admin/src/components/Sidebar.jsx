// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Users, BookOpenCheck, Mail, CreditCard,
  Building2, BarChart2, MessageCircle, Briefcase, 
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import '../style/Sidebar.css';

const sections = [
<<<<<<< HEAD
  { name: "Dashboard", icon: <ShieldCheck size={18} />, path: "/Home" },
  { name: "Super Admin Panel", icon: <ShieldCheck size={18} />, path: "/super-admin" },
  { name: "Lead & Student Management", icon: <Users size={18} />, path: "/lead-student" },
  { name: "Training Program", icon: <BookOpenCheck size={18} />, path: "/training-program" },
=======
  { name: "Login", icon: <ShieldCheck size={18} />, path: "/login" },
  { name: "Student-Management", icon: <ShieldCheck size={18} />, path: "/students" },
  { name: "Student-Detail", icon: <ShieldCheck size={18} />, path: "/student/:id" },
  { name: "Dashboard", icon: <ShieldCheck size={18} />, path: "/" },
  { name: "Super Admin Panel", icon: <ShieldCheck size={18} />, path: "/super-admin" },
  { name: "Lead & Student Management", icon: <Users size={18} />, path: "/lead-student" },
  { name: "Training Program", icon: <BookOpenCheck size={18} />, path: "/training-program" },
  { name: "Mentor", icon: <ShieldCheck size={18} />, path: "/mentors" },
>>>>>>> 5778a0eb569a28ea5d3747b234dc6081e270eae1
  { name: "Email Marketing", icon: <Mail size={18} />, path: "/email-marketing" },
  { name: "Finance & Payment", icon: <CreditCard size={18} />, path: "/finance-payment" },
  { name: "Corporate Training", icon: <Building2 size={18} />, path: "/corporate-training" },
  { name: "Analytics & Reports", icon: <BarChart2 size={18} />, path: "/analytics-reports" },
  { name: "Support & Feedback", icon: <MessageCircle size={18} />, path: "/support-feedback" },
  { name: "Recruiter & Placement", icon: <Briefcase size={18} />, path: "/recruitment" },
];

const Sidebar = () => {
<<<<<<< HEAD
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-wrapper">
      
      <div className="custom-sidebar">
        <div className="sidebar-header">
          <h5 className="brand-text">Mackinlay Learning Hub</h5>
        </div>
        <ul className="sidebar-nav">
          {sections.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-nav-link ${isActive ? 'active' : ''}`
                }
              >
                {item.icon}
                <span className="link-text">{item.name}</span>
              </NavLink>


            </li>
          ))}
        </ul>
      </div>
    </div>
=======
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {isMobile && (
        <button className="sidebar-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          ☰
        </button>
      )}

      {isSidebarOpen && (
        <div className={`home-custom-sidebar ${isMobile ? 'mobile' : ''}`}>
          <div className="home-sidebar-header">
            <h5 className="home-brand-text">Mackinlay Learning Hub</h5>
          </div>
          <ul className="home-sidebar-nav">
            {sections.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `home-sidebar-nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={handleNavClick}
                >
                  <span className="me-2">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
>>>>>>> 5778a0eb569a28ea5d3747b234dc6081e270eae1
  );
};

export default Sidebar;
