import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RecruiterLayout = () => {
  return (
    <div className="recruiter-layout">
      <aside className="sidebar">
        <nav>
          <ul>
            <li><NavLink to="/recruiter/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/recruiter/job-posting">Post Job</NavLink></li>
            <li><NavLink to="/recruiter/my-jobs">My Jobs</NavLink></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet /> {/* Renders nested recruiter page components */}
      </main>
    </div>
  );
};

export default RecruiterLayout;
