import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Make sure the path is correct
import '../style/RecruiterLayout.css';

const RecruiterLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear localStorage + context
    navigate("/Recruiter-login"); // Redirect to login page
  };

  return (
    <div className="recruiter-layout">
      <aside className="recruiter-layout-sidebar">
        <div className="recruiter-layout-logo">Recruiter</div>
        <nav className="recruiter-layout-nav">
          <ul>
            {/* <li><NavLink to="/recruiter/dashboard" activeclassname="active">Dashboard</NavLink></li> */}
            <li><NavLink to="/recruiter/job-posting" activeclassname="active">Post Job</NavLink></li>
            <li><NavLink to="/recruiter/my-jobs" activeclassname="active">My Jobs</NavLink></li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="recruiter-layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterLayout;
