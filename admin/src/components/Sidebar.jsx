// src/components/Sidebar.jsx
import React, { useState } from 'react';
import {
  ShieldCheck, Users, BookOpenCheck, Mail, CreditCard,
  Building2, BarChart2, MessageCircle, Briefcase
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SuperAdminPanel from './SuperAdminPanel';
import LeadAndStudentManagement from './LeadAndStudentManagement';
import Trainingprogram from './Traningprogram';
import EMailMarketing from './EMailMarketing';
import FinanceAndPayment from './FinanceAndPayment';
import CorporateTrainingEnterprice from './CorporateTrainingEnterprice';
import AnalyticsAndReports from './AnalyticsAndReports';
import SupportAndFeedback from './SupportAndFeedback';
import RecruiterAndPlacementManagement from './RecruiterAndPlacementManagement';
import Home from './Home';
import '../style/Sidebar.css';

const sections = [
    { name: "Dashboard", icon: <ShieldCheck size={18} />, path: "/" },
    { name: "Super Admin Panel", icon: <ShieldCheck size={18} />, path: "/super-admin" },
    { name: "Lead & Student Management", icon: <Users size={18} />, path: "/lead-student" },
    { name: "Training Program", icon: <BookOpenCheck size={18} />, path: "/training-program" },
    { name: "Email Marketing", icon: <Mail size={18} />, path: "/email-marketing" },
    { name: "Finance & Payment", icon: <CreditCard size={18} />, path: "/finance-payment" },
    { name: "Corporate Training", icon: <Building2 size={18} />, path: "/corporate-training" },
    { name: "Analytics & Reports", icon: <BarChart2 size={18} />, path: "/analytics-reports" },
    { name: "Support & Feedback", icon: <MessageCircle size={18} />, path: "/support-feedback" },
    { name: "Recruiter & Placement", icon: <Briefcase size={18} />, path: "/recruitment" },
  ];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState(sections[0]);

  return (
    <div className="d-dashboard-container">
      {/* Sidebar */}
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
              <span className="me-2">{item.icon}</span>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Sidebar;
