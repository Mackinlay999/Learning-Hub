import React from 'react';
import { motion } from 'framer-motion';
import '../style/RecruiterJobs.css';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    location: 'Remote',
    type: 'Full-Time',
    posted: '3 days ago',
    applications: 45,
  },
  {
    id: 2,
    title: 'Backend Developer',
    location: 'New York, USA',
    type: 'Part-Time',
    posted: '1 week ago',
    applications: 32,
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    location: 'San Francisco, USA',
    type: 'Contract',
    posted: '2 weeks ago',
    applications: 27,
  },
];

function RecruiterJobs() {
  return (
    <motion.div
      className="recruiter-jobs-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="recruiter-jobs-title">Your Posted Jobs</h2>

      <div className="recruiter-jobs-list">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            className="recruiter-jobs-card"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 150 }}
          >
            <div className="recruiter-jobs-info">
              <h3 className="recruiter-jobs-job-title">{job.title}</h3>
              <p className="recruiter-jobs-meta">
                {job.location} • {job.type} • Posted {job.posted}
              </p>
              <p className="recruiter-jobs-applications">
                Applications: <strong>{job.applications}</strong>
              </p>
            </div>

            <div className="recruiter-jobs-actions">
              <button className="recruiter-jobs-btn edit">Edit</button>
              <button className="recruiter-jobs-btn delete">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default RecruiterJobs;
