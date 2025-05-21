import React from 'react';
import { motion } from 'framer-motion';
import '../style/StudentDashboard.css';

const overviewStats = [
  { label: 'Applied Jobs', count: 17 },
  { label: 'Saved Jobs', count: 8 },
  { label: 'Profile Views', count: 134 },
];

const appliedJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    status: 'Under Review',
    appliedDate: '3 days ago',
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'DataWorks',
    location: 'New York, NY',
    status: 'Interview Scheduled',
    appliedDate: '1 week ago',
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'Creative Minds',
    location: 'San Francisco, CA',
    status: 'Rejected',
    appliedDate: '2 weeks ago',
  },
];

const savedJobs = [
  {
    id: 101,
    title: 'Backend Developer',
    company: 'Innovatech',
    location: 'Chicago, IL',
    type: 'Full-Time',
  },
  {
    id: 102,
    title: 'Product Manager',
    company: 'Global Corp',
    location: 'Remote',
    type: 'Contract',
  },
];

function StudentDashboard() {
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
              key={job.id}
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
                <span className="student-dashboard-applied-date">{job.appliedDate}</span>
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
              key={job.id}
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
