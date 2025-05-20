import React from 'react';
import { motion } from 'framer-motion';
import '../style/RecruiterDashboard.css'; // External CSS

const stats = [
  { title: 'Total Jobs Posted', count: 12 },
  { title: 'Active Jobs', count: 5 },
  { title: 'Total Applications', count: 128 },
];

const recentApplications = [
  { name: 'Alice Johnson', job: 'Frontend Developer', time: '2 hours ago' },
  { name: 'Bob Smith', job: 'UI/UX Designer', time: '5 hours ago' },
  { name: 'Charlie Lee', job: 'Backend Developer', time: '1 day ago' },
];

function RecruiterDashboard() {
  return (
    <motion.div 
      className="recruiter-dashboard"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="recruiter-dashboard-title">Recruiter Dashboard</h2>

      <div className="recruiter-stats-section">
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            className="recruiter-stat-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 150 }}
          >
            <h3>{stat.count}</h3>
            <p>{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="recruiter-section"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="recruiter-section-title">Recent Applications</h3>
        <ul className="recruiter-applications-list">
          {recentApplications.map((app, index) => (
            <li key={index} className="recruiter-application-item">
              <div className="recruiter-applicant-info">
                <strong>{app.name}</strong> applied for <em>{app.job}</em>
              </div>
              <div className="recruiter-application-time">{app.time}</div>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div 
        className="recruiter-section"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="recruiter-section-title">Job Performance</h3>
        <div className="recruiter-performance-cards">
          <div className="recruiter-performance-card">
            <h4>Job Views</h4>
            <p>1,204</p>
          </div>
          <div className="recruiter-performance-card">
            <h4>Applications Received</h4>
            <p>128</p>
          </div>
          <div className="recruiter-performance-card">
            <h4>Jobs Expired</h4>
            <p>3</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RecruiterDashboard;
