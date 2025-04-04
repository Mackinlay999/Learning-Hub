// // import React from 'react'
// // import DashboardAdmin from "../components/DashboardAdmin"
// // import DUsers from './dUser'


// // import Supports from './Supports'
// // import Setting from './Setting'

// // import Query from './Query'
// // import Trainingprogram from './Traningprogram'
// // import LeadAndStudentManagement from './LeadAndStudentManagement'
// // import EMailMarketing from './EMailMarketing'
// // import CorporateTrainingEnterprice from './CorporateTrainingEnterprice'
// // import AnalyticsAndReports from './AnalyticsAndReports'
// // import SupportAndFeedback from './SupportAndFeedback'
// // import RecruiterAndPlacementManagement from './RecruiterAndPlacementManagement'
// // import FinanceAndPayment from './FinanceAndPayment'


// // const Dashboard = () => {
// //   return (
// //     <div>
// //       {/* Lead Management  */}
// //       <DashboardAdmin />
      
// //  <LeadAndStudentManagement />
// //  <Trainingprogram />
// //  <EMailMarketing />
// //  <FinanceAndPayment />
// //  <CorporateTrainingEnterprice />
// //  <AnalyticsAndReports />
// //  <SupportAndFeedback />
// //  <RecruiterAndPlacementManagement />
      
// //     <DUsers />
    
    
// //     <Supports />
// //     <Query />
// //     <Trainingprogram />
// //     {/* <Setting /> */}
      
// //     </div>
// //   )
// // }

// // export default Dashboard


// import React, { useState } from 'react';
// import DashboardAdmin from "../components/DashboardAdmin";
// import LeadAndStudentManagement from './LeadAndStudentManagement';
// import Trainingprogram from './Traningprogram';
// import EMailMarketing from './EMailMarketing';
// import FinanceAndPayment from './FinanceAndPayment';
// import CorporateTrainingEnterprice from './CorporateTrainingEnterprice';
// import AnalyticsAndReports from './AnalyticsAndReports';
// import SupportAndFeedback from './SupportAndFeedback';
// import RecruiterAndPlacementManagement from './RecruiterAndPlacementManagement';
// import "../style/Dashboard.css"

// const sections = [
//   { name: "Lead & Student Management", component: <LeadAndStudentManagement /> },
//   { name: "Training Program", component: <Trainingprogram /> },
//   { name: "Email Marketing", component: <EMailMarketing /> },
//   { name: "Finance & Payment", component: <FinanceAndPayment /> },
//   { name: "Corporate Training", component: <CorporateTrainingEnterprice /> },
//   { name: "Analytics & Reports", component: <AnalyticsAndReports /> },
//   { name: "Support & Feedback", component: <SupportAndFeedback /> },
//   { name: "Recruiter & Placement", component: <RecruiterAndPlacementManagement /> },
// ];

// const Dashboard = () => {
//   const [activeSection, setActiveSection] = useState(sections[0]);

//   return (
//     <div className="dashboard-container" style={{ display: "flex" }}>
//       {/* Sidebar Navigation */}
//       <div className="sidebar" style={{ width: "250px", background: "#f4f4f4", padding: "10px" }}>
//         <h3>Dashboard</h3>
//         <ul>
//           {sections.map((item, index) => (
//             <li 
//               key={index} 
//               onClick={() => setActiveSection(item)}
//               style={{ cursor: "pointer", padding: "5px", background: activeSection.name === item.name ? "#ddd" : "transparent" }}
//             >
//               {item.name}
//             </li>
//           ))}
//         </ul>
//       </div>
      
//       {/* Main Content */}
//       <div className="content" style={{ flex: 1, padding: "20px" }}>
//         {/* <DashboardAdmin /> */}
//         {activeSection.component}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState } from 'react';
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

const sections = [
  { name: "Lead & Student Management", component: <LeadAndStudentManagement /> },
  { name: "Training Program", component: <Trainingprogram /> },
  { name: "Email Marketing", component: <EMailMarketing /> },
  { name: "Finance & Payment", component: <FinanceAndPayment /> },
  { name: "Corporate Training", component: <CorporateTrainingEnterprice /> },
  { name: "Analytics & Reports", component: <AnalyticsAndReports /> },
  { name: "Support & Feedback", component: <SupportAndFeedback /> },
  { name: "Recruiter & Placement", component: <RecruiterAndPlacementManagement /> },
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
