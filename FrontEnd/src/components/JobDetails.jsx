import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';  // for dynamic route param
import axios from 'axios';
import "../style/JobDetail.css";

function JobDetails() {
  const { id } = useParams();  // get job ID from URL
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        const res = await axios.get(`/api/recruiter/jobs/${id}`);  // adjust base URL if needed
        setJobData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load job details');
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  if (loading) return <p className="job-details-loading">Loading job details...</p>;
  if (error) return <p className="job-details-error">{error}</p>;
  if (!jobData) return <p className="job-details-error">Job not found</p>;

  // Helper to format the posted date nicely
  const postedDate = new Date(jobData.postedAt).toLocaleDateString();

  return (
    <motion.div
      className="job-details-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <header className="job-details-header">
        {/* Placeholder logo or use company logo if available */}
        <motion.img
          src={jobData.companyLogo || 'https://via.placeholder.com/80'}
          alt={`${jobData.companyName} logo`}
          className="job-details-company-logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <div className="job-details-title-info">
          <h1 className="job-details-title">{jobData.jobTitle}</h1>
          <a
            href={jobData.companyWebsite || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="job-details-company-name"
          >
            {jobData.companyName}
          </a>
          <p className="job-details-location">{jobData.location}</p>
          <p className="job-details-type-posted">
            <span className="job-details-type">{jobData.employmentType}</span> &middot;{' '}
            <span className="job-details-posted">Posted on {postedDate}</span>
          </p>
        </div>

        <motion.a
          href={`/api/apply/${jobData._id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="job-details-apply-btn"
          whileHover={{ scale: 1.05, backgroundColor: '#005b91' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Apply Now
        </motion.a>
      </header>

      <main className="job-details-main">
        <section className="job-details-section">
          <h2 className="job-details-section-title">Job Description</h2>
          <p className="job-details-description">{jobData.jobDescription}</p>
        </section>

        {/* You can add more sections dynamically here if you store responsibilities, qualifications, etc. */}
        {/* For example, skillsRequired can be split by comma and shown as list */}

        {jobData.skillsRequired && (
          <section className="job-details-section">
            <h2 className="job-details-section-title">Skills Required</h2>
            <ul className="job-details-list">
              {jobData.skillsRequired.split(',').map((skill, i) => (
                <li key={i} className="job-details-list-item">{skill.trim()}</li>
              ))}
            </ul>
          </section>
        )}

        {jobData.applicationDeadline && (
          <section className="job-details-section">
            <h2 className="job-details-section-title">Application Deadline</h2>
            <p>{new Date(jobData.applicationDeadline).toLocaleDateString()}</p>
          </section>
        )}
      </main>
    </motion.div>
  );
}

export default JobDetails;
