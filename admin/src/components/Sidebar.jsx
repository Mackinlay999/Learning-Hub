// // // src/components/Sidebar.jsx
// // import React, { useState, useEffect } from 'react';
// // import {
// //   ShieldCheck, Users, BookOpenCheck, Mail, CreditCard,
// //   Building2, BarChart2, MessageCircle, Briefcase, 
// // } from 'lucide-react';
// // import { NavLink } from 'react-router-dom';
// // import '../style/Sidebar.css';

// // const sections = [


// //   { name: "Dashboard", icon: <ShieldCheck size={18} />, path: "/Home" },
  
// //   // { name: "Login", icon: <ShieldCheck size={18} />, path: "/login" },

  
// //   { name: "Super Admin Panel", icon: <ShieldCheck size={18} />, path: "/super-admin" },
// //   { name: "Lead & Student Management", icon: <Users size={18} />, path: "/lead-student" },
// //   { name: "Training Program", icon: <BookOpenCheck size={18} />, path: "/training-program" },

// //   { name: "Login", icon: <ShieldCheck size={18} />, path: "/login" },
// //   { name: "Student-Management", icon: <ShieldCheck size={18} />, path: "/students" },
// //   { name: "Student-Detail", icon: <ShieldCheck size={18} />, path: "/student/:id" },
// //   { name: "Dashboard", icon: <ShieldCheck size={18} />, path: "/" },

  


 
 
// //   { name: "Mentor", icon: <ShieldCheck size={18} />, path: "/mentors" },

// //   { name: "Email Marketing", icon: <Mail size={18} />, path: "/email-marketing" },
// //   { name: "Finance & Payment", icon: <CreditCard size={18} />, path: "/finance-payment" },
// //   { name: "Corporate Training", icon: <Building2 size={18} />, path: "/corporate-training" },
// //   { name: "Analytics & Reports", icon: <BarChart2 size={18} />, path: "/analytics-reports" },
// //   { name: "Support & Feedback", icon: <MessageCircle size={18} />, path: "/support-feedback" },
// //   { name: "Recruiter & Placement", icon: <Briefcase size={18} />, path: "/recruitment" },
// // ];

// // const Sidebar = () => {

// //   const [isOpen, setIsOpen] = useState(true);

// //   const toggleSidebar = () => {
// //     setIsOpen(!isOpen);
// //   };

// //   return (
// //     <div className="sidebar-wrapper">
      
// //       <div className="custom-sidebar">
// //         <div className="sidebar-header">
// //           <h5 className="brand-text">Mackinlay Learning Hub</h5>
// //         </div>
// //         <ul className="sidebar-nav">
// //           {sections.map((item, index) => (
// //             <li key={index}>
// //               <NavLink
// //                 to={item.path}
// //                 className={({ isActive }) =>
// //                   `sidebar-nav-link ${isActive ? 'active' : ''}`
// //                 }
// //               >
// //                 {item.icon}
// //                 <span className="link-text">{item.name}</span>
// //               </NavLink>


// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>

  

  

  


// //   );
// // };

// // export default Sidebar;

// import React, { useState } from 'react';
// import {
//   ShieldCheck, Users, BookOpenCheck, Mail, CreditCard,
//   Building2, BarChart2, MessageCircle, Briefcase, 
// } from 'lucide-react';
// import { NavLink } from 'react-router-dom';
// import '../style/Sidebar.css';

// const sections = [
//   { name: "Dashboard", icon: <ShieldCheck size={18} />, path: "/Home" },
//   { name: "Super Admin Panel", icon: <ShieldCheck size={18} />, path: "/super-admin" },
//   { name: "Lead & Student Management", icon: <Users size={18} />, path: "/lead-student" },
//   { name: "Training Program", icon: <BookOpenCheck size={18} />, path: "/training-program" },
//   { name: "Login", icon: <ShieldCheck size={18} />, path: "/login" },
//   { name: "Student-Management", icon: <ShieldCheck size={18} />, path: "/students" },
//   { name: "Student-Detail", icon: <ShieldCheck size={18} />, path: "/student/:id" },
  
//   { name: "Mentor", icon: <ShieldCheck size={18} />, path: "/mentors" },
//   { name: "Email Marketing", icon: <Mail size={18} />, path: "/email-marketing" },
//   { name: "Finance & Payment", icon: <CreditCard size={18} />, path: "/finance-payment" },
//   { name: "Corporate Training", icon: <Building2 size={18} />, path: "/corporate-training" },
//   { name: "Analytics & Reports", icon: <BarChart2 size={18} />, path: "/analytics-reports" },
//   { name: "Support & Feedback", icon: <MessageCircle size={18} />, path: "/support-feedback" },
//   { name: "Recruiter & Placement", icon: <Briefcase size={18} />, path: "/recruitment" },
// ];

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//       <div className='sidebar-wrapper'>
//       <div className="custom-sidebar">
//         <div className="sidebar-header">
//           <h5 className="brand-text">Mackinlay Learning Hub</h5>
//         </div>

     
     
     
     
//       <div
//       className='S-sidebar'>

//         <ul className="sidebar-nav">
//           {sections.map((item, index) => (
//             <li key={index}>
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `sidebar-nav-link ${isActive ? 'active' : ''}`
//                 }
//               >
//                 <span className='S-icon'> {item.icon} </span>
//                 <p className="S-content">{item.name}</p>
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         </div>

        
//       </div>
//       </div>
      
   
   
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import {
  ShieldCheck, Users, BookOpenCheck, Mail, CreditCard,
  Building2, BarChart2, MessageCircle, Briefcase, 
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import '../style/Sidebar.css';

const sections = [
  { name: "Dashboard", icon: <ShieldCheck size={18} />, path: "/Home" },
  { name: "Super Admin Panel", icon: <ShieldCheck size={18} />, path: "/super-admin" },
  { name: "Lead & Student Management", icon: <Users size={18} />, path: "/lead-student" },
  { name: "Training Program", icon: <BookOpenCheck size={18} />, path: "/training-program" },
  { name: "Login", icon: <ShieldCheck size={18} />, path: "/login" },
  { name: "Student-Management", icon: <ShieldCheck size={18} />, path: "/students" },
  { name: "Mentor", icon: <ShieldCheck size={18} />, path: "/mentors" },
  { name: "Email Marketing", icon: <Mail size={18} />, path: "/email-marketing" },
  { name: "Finance & Payment", icon: <CreditCard size={18} />, path: "/finance-payment" },
  { name: "Corporate Training", icon: <Building2 size={18} />, path: "/corporate-training" },
  { name: "Analytics & Reports", icon: <BarChart2 size={18} />, path: "/analytics-reports" },
  { name: "Support & Feedback", icon: <MessageCircle size={18} />, path: "/support-feedback" },
  { name: "Recruiter & Placement", icon: <Briefcase size={18} />, path: "/recruitment" },
<<<<<<< HEAD
  { name: "Suceess Story", icon: <Briefcase size={18} />, path: "/Suceess" },
=======
  { name: "Blog & Webinar", icon: <ShieldCheck size={18} />, path: "/blog-webinar" },
>>>>>>> c16b11e322f33537a4a4d8a52dc791393783d4ef
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {sidebarOpen ? "Close" : "Menu"}
      </button>

      <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
        <div className="custom-sidebar">
          <div className="sidebar-header">
            <h5 className="brand-text">Mackinlay Learning Hub</h5>
          </div>

          <div className="S-sidebar">
            <ul className="sidebar-nav">
              {sections.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `sidebar-nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <span className="S-icon">{item.icon}</span>
                    <p className="S-content">{item.name}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    </>
  );
};

export default Sidebar;


