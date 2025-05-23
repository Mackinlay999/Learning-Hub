import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const StudentLayout = () => {
  return (
    <div className="student-layout">
      <header className="student-header">
        <nav>
          <ul>
            <li><NavLink to="/student/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/student/jobs">Jobs</NavLink></li>
          </ul>
        </nav>
      </header>
      <main className="content">
        <Outlet /> {/* Renders nested student page components */}
      </main>
    </div>
  );
};

export default StudentLayout;
