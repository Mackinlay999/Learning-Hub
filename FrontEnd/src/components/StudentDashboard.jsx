import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../style/StudentDashboard.css';

function StudentDashboard() {
  const [overviewStats, setOverviewStats] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://learning-hub-p2yq.onrender.com/api/student/dashboard', {
          withCredentials: true, // 💡 This sends the JWT cookie
        });

        const { overviewStats, appliedJobs, savedJobs } = response.data;
        setOverviewStats([
          { label: 'Applied Jobs', count: overviewStats.appliedJobs },
          { label: 'Saved Jobs', count: overviewStats.savedJobs },
          { label: 'Profile Views', count: overviewStats.profileViews },
        ]);
        setAppliedJobs(appliedJobs);
        setSavedJobs(savedJobs);
      } catch (error) {
        console.error('Error fetching dashboard data:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <motion.div
      className="student-dashboard-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="student-dashboard-title">Student Dashboard</h2>

      <section className="student-dashboard-overview">
        {overviewStats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="student-dashboard-stat-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 140 }}
          >
            <p className="student-dashboard-stat-count">{stat.count}</p>
            <p className="student-dashboard-stat-label">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="student-dashboard-section">
        <h3 className="student-dashboard-section-title">Recently Applied Jobs</h3>
        <ul className="student-dashboard-applied-list">
          {appliedJobs.map((job) => (
            <motion.li
              key={job._id || job.id}
              className="student-dashboard-applied-item"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="student-dashboard-applied-info">
                <h4 className="student-dashboard-job-title">{job.title}</h4>
                <p className="student-dashboard-company">{job.company}</p>
                <p className="student-dashboard-location">{job.location}</p>
              </div>
              <div className="student-dashboard-applied-meta">
                <span
                  className={`student-dashboard-status status-${job.status
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                >
                  {job.status}
                </span>
                <span className="student-dashboard-applied-date">
                  {new Date(job.appliedDate).toLocaleDateString()}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="student-dashboard-section">
        <h3 className="student-dashboard-section-title">Saved Jobs</h3>
        <ul className="student-dashboard-saved-list">
          {savedJobs.map((job) => (
            <motion.li
              key={job._id || job.id}
              className="student-dashboard-saved-item"
              whileHover={{ boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="student-dashboard-saved-info">
                <h4 className="student-dashboard-job-title">{job.title}</h4>
                <p className="student-dashboard-company">{job.company}</p>
                <p className="student-dashboard-location">{job.location}</p>
                <p className="student-dashboard-job-type">{job.type}</p>
              </div>
              <button className="student-dashboard-btn-apply">Apply Now</button>
            </motion.li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
}

export default StudentDashboard;
