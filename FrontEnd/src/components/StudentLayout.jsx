import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/StudentLayout.css';

const StudentLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="student-layout">
      <aside className="student-sidebar">
        <div className="student-sidebar-logo">Student</div>
        <nav className="student-sidebar-nav">
          <ul>
            <li>
              <NavLink to="/student/jobs" activeclassname="active">Jobs</NavLink>
            </li>
            {/* Add other links here if needed */}
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </aside>
      <main className="student-layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
