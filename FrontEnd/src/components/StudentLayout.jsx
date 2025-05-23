import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/StudentLayout.css'; // 🔁 Link to your external stylesheet

const StudentLayout = () => {
   const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear localStorage + context
    navigate("/login"); // Redirect to login page
  };
  return (
    <div className="student-layout">
      <header className="student-layout-header">
        <div className="student-layout-logo">Student</div>
        <nav className="student-layout-nav">
          <ul>
            <li><NavLink to="/student/dashboard" activeclassname="active">Dashboard</NavLink></li>
            <li><NavLink to="/student/jobs" activeclassname="active">Jobs</NavLink></li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="student-layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
