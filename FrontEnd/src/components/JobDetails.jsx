import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../style/JobDetail.css";

function JobDetails() {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        const res = await axios.get(`/api/recruiter/jobs/${id}`);
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

  const postedDate = new Date(jobData.postedAt).toLocaleDateString();
  const deadlineDate = jobData.applicationDeadline
    ? new Date(jobData.applicationDeadline).toLocaleDateString()
    : "N/A";

  return (
    <motion.div
      className="job-details-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <header className="job-details-header">
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
          href={jobData.applicationLink || `/api/apply/${jobData._id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="job-details-apply-btn"
          whileHover={{ scale: 1.05, backgroundColor: '#c70039' }}
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

        {jobData.jobBenefits && (
          <section className="job-details-section">
            <h2 className="job-details-section-title">Job Benefits</h2>
            <p>{jobData.jobBenefits}</p>
          </section>
        )}

        <section className="job-details-section">
          <h2 className="job-details-section-title">Additional Information</h2>
          <p><strong>Industry:</strong> {jobData.industry || "N/A"}</p>
          <p><strong>Experience Level:</strong> {jobData.experienceLevel || "N/A"}</p>
          <p><strong>Salary Range:</strong> {jobData.salaryRange || "N/A"}</p>
          <p><strong>Vacancies:</strong> {jobData.vacancies || "N/A"}</p>
          <p><strong>Education Requirements:</strong> {jobData.educationRequirements || "N/A"}</p>
          <p><strong>Workplace Type:</strong> {jobData.workplaceType || "N/A"}</p>
          <p><strong>Application Deadline:</strong> {deadlineDate}</p>
          <p><strong>Contact Email:</strong> {jobData.contactEmail || "N/A"}</p>
        </section>
      </main>
    </motion.div>
  );
}

export default JobDetails;
