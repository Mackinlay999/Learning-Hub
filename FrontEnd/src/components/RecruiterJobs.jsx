import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../style/RecruiterJobs.css';

function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://learning-hub-p2yq.onrender.com/api/recruiter/jobs'); // adjust baseURL if needed
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`https://learning-hub-p2yq.onrender.com/api/recruiter/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <motion.div
      className="recruiter-jobs-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="recruiter-jobs-title">Your Posted Jobs</h2>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="recruiter-jobs-list">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              className="recruiter-jobs-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              <div className="recruiter-jobs-info">
                <h3 className="recruiter-jobs-job-title">{job.jobTitle}</h3>
                <p className="recruiter-jobs-meta">
                  {job.location} • {job.employmentType} • Posted on{' '}
                  {new Date(job.postedAt).toLocaleDateString()}
                </p>
                <p className="recruiter-jobs-applications">
                  Industry: <strong>{job.industry || 'N/A'}</strong>
                </p>
              </div>

              <div className="recruiter-jobs-actions">
                <button className="recruiter-jobs-btn edit">Edit</button>
                <button
                  className="recruiter-jobs-btn delete"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default RecruiterJobs;
