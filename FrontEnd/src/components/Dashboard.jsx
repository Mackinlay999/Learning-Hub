



import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  BookOpenCheck,
  Mail,
  CreditCard,
  Building2,
  BarChart2,
  MessageCircle,
  Briefcase
} from 'lucide-react';

import DashboardAdmin from "../components/DashboardAdmin";
import LeadAndStudentManagement from './LeadAndStudentManagement';
import Trainingprogram from './Traningprogram';
import EMailMarketing from './EMailMarketing';
import FinanceAndPayment from './FinanceAndPayment';
import CorporateTrainingEnterprice from './CorporateTrainingEnterprice';
import AnalyticsAndReports from './AnalyticsAndReports';
import SupportAndFeedback from './SupportAndFeedback';
import RecruiterAndPlacementManagement from './RecruiterAndPlacementManagement';
import "../style/Dashboard.css";
import SuperAdminPanel from './SuperAdminPanel';




const sections = [
  { name: "Super Admin Panel", icon: <ShieldCheck size={18} />, component: <SuperAdminPanel /> },
  { name: "Lead & Student Management", icon: <Users size={18} />, component: <LeadAndStudentManagement /> },
  { name: "Training Program", icon: <BookOpenCheck size={18} />, component: <Trainingprogram /> },
  { name: "Email Marketing", icon: <Mail size={18} />, component: <EMailMarketing /> },
  { name: "Finance & Payment", icon: <CreditCard size={18} />, component: <FinanceAndPayment /> },
  { name: "Corporate Training", icon: <Building2 size={18} />, component: <CorporateTrainingEnterprice /> },
  { name: "Analytics & Reports", icon: <BarChart2 size={18} />, component: <AnalyticsAndReports /> },
  { name: "Support & Feedback", icon: <MessageCircle size={18} />, component: <SupportAndFeedback /> },
  { name: "Recruiter & Placement", icon: <Briefcase size={18} />, component: <RecruiterAndPlacementManagement /> },
];


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(sections[0]);

  return (
    <div className="d-dashboard-container">
      {/* Sidebar Navigation */}
      <div className="d-sidebar">
        <h3 className="d-sidebar-title">Dashboard</h3>
        

<ul className="d-sidebar-list">
  {sections.map((item, index) => (
    <li 
      key={index} 
      onClick={() => setActiveSection(item)}
      className={`d-sidebar-item ${activeSection.name === item.name ? "d-active" : ""}`}
    >
      <span className="d-icon">{item.icon}</span>
      {item.name}
    </li>
  ))}
</ul>

      </div>
      
      {/* Main Content */}
      <div className="d-content">
        {/* <DashboardAdmin /> */}
        {activeSection.component}
      </div>
    </div>
  );
};

export default Dashboard;
