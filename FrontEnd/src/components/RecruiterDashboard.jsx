import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../style/RecruiterDashboard.css';

function RecruiterDashboard() {
  const [stats, setStats] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [performance, setPerformance] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [statsRes, applicationsRes, performanceRes] = await Promise.all([
          axios.get('https://learning-hub-p2yq.onrender.com/api/recruiter/dashboard/stats', { withCredentials: true }),
          axios.get('https://learning-hub-p2yq.onrender.com/api/recruiter/dashboard/recent-applications', { withCredentials: true }),
          axios.get('https://learning-hub-p2yq.onrender.com/api/recruiter/dashboard/job-performance', { withCredentials: true }),
        ]);

        setStats([
          { title: 'Total Jobs Posted', count: statsRes.data.totalJobs },
          { title: 'Active Jobs', count: statsRes.data.activeJobs },
          { title: 'Total Applications', count: statsRes.data.totalApplications },
        ]);

        setRecentApplications(applicationsRes.data); // Should be an array
        setPerformance(performanceRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="error">{error}</p>;

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

      <motion.div className="recruiter-section" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
        <h3 className="recruiter-section-title">Recent Applications</h3>
        <ul className="recruiter-applications-list">
          {recentApplications.map((app, index) => (
            <li key={index} className="recruiter-application-item">
              <div className="recruiter-applicant-info">
                <strong>{app.name}</strong> applied for <em>{app.jobTitle}</em>
              </div>
              <div className="recruiter-application-time">{app.appliedTime}</div>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div className="recruiter-section" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
        <h3 className="recruiter-section-title">Job Performance</h3>
        <div className="recruiter-performance-cards">
          <div className="recruiter-performance-card">
            <h4>Job Views</h4>
            <p>{performance.views || 0}</p>
          </div>
          <div className="recruiter-performance-card">
            <h4>Applications Received</h4>
            <p>{performance.totalApplications || 0}</p>
          </div>
          <div className="recruiter-performance-card">
            <h4>Jobs Expired</h4>
            <p>{performance.expiredJobs || 0}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default RecruiterDashboard;
