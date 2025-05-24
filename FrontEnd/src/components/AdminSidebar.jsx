import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust path as needed
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
import "../style/AdminSidebar.css";

const allSections = [
  {
    name: "Dashboard",
    icon: <ShieldCheck size={18} />,
    path: "/admin/home",
    roles: ["Super Admin", "Admin", "Recruiter", "Mentor"],
  },
  {
    name: "Super Admin Panel",
    icon: <ShieldCheck size={18} />,
    path: "/admin/super-admin",
    roles: ["Super Admin"],
  },
  {
    name: "Lead & Student Management",
    icon: <Users size={18} />,
    path: "/admin/lead-student",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Student-Management",
    icon: <ShieldCheck size={18} />,
    path: "/admin/students",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Mentor",
    icon: <ShieldCheck size={18} />,
    path: "/admin/mentors",
    roles: ["Mentor", "Admin", "Super Admin"],
  },
  {
    name: "Email Marketing",
    icon: <Mail size={18} />,
    path: "/admin/email-marketing",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Recruiter Dashboard",
    icon: <ShieldCheck size={18} />,
    path: "/admin/recruiters/dashboard",
    roles: ["Recruiter", "Super Admin"],
  },
  {
    name: "Finance & Payment",
    icon: <CreditCard size={18} />,
    path: "/admin/finance-payment",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Corporate Training",
    icon: <Building2 size={18} />,
    path: "/admin/corporate-training",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Analytics & Reports",
    icon: <BarChart2 size={18} />,
    path: "/admin/analytics-reports",
    roles: ["Admin", "Super Admin"],
  },
  {
    name: "Support & Feedback",
    icon: <MessageCircle size={18} />,
    path: "/admin/support-feedback",
    roles: ["Admin", "Mentor", "Recruiter", "Super Admin"],
  },
  {
    name: "Success Story",
    icon: <Briefcase size={18} />,
    path: "/admin/Success",
    roles: ["Admin", "Mentor", "Super Admin"],
  },
  {
    name: "Blog & Webinar",
    icon: <ShieldCheck size={18} />,
    path: "/admin/blog-webinar",
    roles: ["Admin", "Super Admin"],
  },
];

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth = {}, logout } = useAuth();
  const { role, loading } = auth;
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const availableSections =
    !loading && role
      ? allSections.filter((section) => section.roles.includes(role))
      : [];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        aria-label="Toggle sidebar"
        className="admin-sidebar-toggle-btn"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      <div className={`admin-sidebar-wrapper ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-custom-sidebar">
          <div className="admin-sidebar-header">
            <h5 className="admin-sidebar-brand-text">Mackinlay Learning Hub</h5>
          </div>

          <nav className="admin-sidebar-S-sidebar" aria-label="Admin Navigation">
            <ul className="admin-sidebar-nav">
              {loading ? (
                <li className="admin-sidebar-loading">Loading...</li>
              ) : (
                availableSections.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `admin-sidebar-nav-link ${isActive ? "active" : ""}`
                      }
                      onClick={() => setSidebarOpen(false)} // close sidebar on mobile after click
                    >
                      <span className="admin-sidebar-S-icon">{item.icon}</span>
                      <p className="admin-sidebar-S-content text-white">{item.name}</p>
                    </NavLink>
                  </li>
                ))
              )}

              <li>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setSidebarOpen(false);
                  }}
                  className="admin-sidebar-logout-btn"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay when sidebar open */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default AdminSidebar;
