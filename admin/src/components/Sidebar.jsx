import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path based on where useAuth is
import {
  ShieldCheck,
  Users,
  Mail,
  CreditCard,
  Building2,
  BarChart2,
  MessageCircle,
  Briefcase,
} from "lucide-react";
import "../style/Sidebar.css"; // Your existing CSS remains

const allSections = [
  {
    name: "Dashboard",
    icon: <ShieldCheck size={18} />,
    path: "/Home",
    roles: ["Super Admin", "Admin", "Recruiter", "Mentor"],
  },
  {
    name: "Super Admin Panel",
    icon: <ShieldCheck size={18} />,
    path: "/super-admin",
    roles: ["Super Admin"],
  },
  {
    name: "Lead & Student Management",
    icon: <Users size={18} />,
    path: "/lead-student",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Login",
    icon: <ShieldCheck size={18} />,
    path: "/login",
    roles: ["Super Admin", "Admin", "Recruiter", "Mentor", "Super Admin"],
  },
  {
    name: "Student-Management",
    icon: <ShieldCheck size={18} />,
    path: "/students",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Mentor",
    icon: <ShieldCheck size={18} />,
    path: "/mentors",
    roles: ["Mentor", "Admin", "Super Admin"],
  },
  {
    name: "Email Marketing",
    icon: <Mail size={18} />,
    path: "/email-marketing",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Recruiter Dashboard",
    icon: <ShieldCheck size={18} />,
    path: "/recruiters/dashboard",
    roles: ["Recruiter", "Super Admin"],
  },
  {
    name: "Finance & Payment",
    icon: <CreditCard size={18} />,
    path: "/finance-payment",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Corporate Training",
    icon: <Building2 size={18} />,
    path: "/corporate-training",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Analytics & Reports",
    icon: <BarChart2 size={18} />,
    path: "/analytics-reports",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Support & Feedback",
    icon: <MessageCircle size={18} />,
    path: "/support-feedback",
    roles: ["Admin", "Mentor", "Recruiter", "Super Admin"],
  },
  {
    name: "Sucess Story",
    icon: <Briefcase size={18} />,
    path: "/Suceess",
    roles: ["Admin", "Mentor", "Super Admin"],
  },
  {
    name: "Blog & Webinar",
    icon: <ShieldCheck size={18} />,
    path: "/blog-webinar",
    roles: ["Admin", "Super Admin"],
  },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth = {}, logout } = useAuth();
  const { role, loading } = auth;

  console.log('Role in Sidebar:', auth.role);
  console.log('Auth state:', auth); // Add this to check the full auth state
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter sections based on user's role
  // Filter sections only after auth is loaded
  const availableSections = !loading && role ? allSections.filter(section => section.roles.includes(role)) : [];


  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {sidebarOpen ? "Close" : "Menu"}
      </button>

      <div className={`sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
        <div className="custom-sidebar">
          <div className="sidebar-header">
            <h5 className="brand-text">Mackinlay Learning Hub</h5>
          </div>

          <div className="S-sidebar">
            <ul className="sidebar-nav">
              {loading ? (
                <div className="sidebar-loading">Loading...</div>
              ) : (
                availableSections.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `sidebar-nav-link ${isActive ? "active" : ""}`
                      }
                    >
                      <span className="S-icon">{item.icon}</span>
                      <p className="S-content">{item.name}</p>
                    </NavLink>
                  </li>
                ))
              )}

              <li>
                <button onClick={logout} className="sidebar-logout-btn">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
