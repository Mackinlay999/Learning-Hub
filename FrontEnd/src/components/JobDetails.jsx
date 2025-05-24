import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/JobDetail.css";

const InfoRow = ({ label, value, isEmail }) => (
  <p>
    <strong>{label}:</strong>{" "}
    {value ? (
      isEmail ? <a href={`mailto:${value}`}>{value}</a> : value
    ) : (
      "N/A"
    )}
  </p>
);

function JobDetails() {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/recruiter/jobs/${id}`);
        setJobData(data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
  };

  if (loading) return <p className="job-details-loading">Loading job details...</p>;
  if (error) return <p className="job-details-error">{error}</p>;
  if (!jobData) return <p className="job-details-error">Job not found</p>;

  const {
    companyLogo,
    companyName,
    companyWebsite,
    jobTitle,
    location,
    employmentType,
    postedAt,
    applicationLink,
    jobDescription,
    skillsRequired,
    jobBenefits,
    industry,
    experienceLevel,
    salaryRange,
    vacancies,
    educationRequirements,
    workplaceType,
    applicationDeadline,
    contactEmail
  } = jobData;

  return (
    <motion.div
      className="job-details-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <header className="job-details-header">
        <motion.img
          src={companyLogo || "https://via.placeholder.com/80"}
          alt={`${companyName || "Company"} logo`}
          className="job-details-company-logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <div className="job-details-title-info">
          <h1 className="job-details-title">{jobTitle || "N/A"}</h1>
          <a
            href={companyWebsite || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="job-details-company-name"
          >
            {companyName || "N/A"}
          </a>
          <p className="job-details-location">{location || "N/A"}</p>
          <p className="job-details-type-posted">
            <span className="job-details-type">{employmentType || "N/A"}</span>
            &nbsp;&middot;&nbsp;
            <span className="job-details-posted">Posted on {formatDate(postedAt)}</span>
          </p>
        </div>
        <motion.a
          href={applicationLink || `/api/apply/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="job-details-apply-btn"
          whileHover={{ scale: 1.05, backgroundColor: "#c70039" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Apply Now
        </motion.a>
      </header>

      {/* Main Body */}
      <main className="job-details-main">
        <section className="job-details-section">
          <h2 className="job-details-section-title">Job Description</h2>
          <p className="job-details-description">{jobDescription || "N/A"}</p>
        </section>

        {skillsRequired && (
          <section className="job-details-section">
            <h2 className="job-details-section-title">Skills Required</h2>
            <ul className="job-details-list">
              {skillsRequired.split(",").map((skill, idx) => (
                <li key={idx} className="job-details-list-item">
                  {skill.trim()}
                </li>
              ))}
            </ul>
          </section>
        )}

        {jobBenefits && (
          <section className="job-details-section">
            <h2 className="job-details-section-title">Job Benefits</h2>
            <p>{jobBenefits}</p>
          </section>
        )}

        <section className="job-details-section">
          <h2 className="job-details-section-title">Additional Information</h2>
          <InfoRow label="Industry" value={industry} />
          <InfoRow label="Experience Level" value={experienceLevel} />
          <InfoRow label="Salary Range" value={salaryRange} />
          <InfoRow label="Vacancies" value={vacancies !== undefined ? vacancies : "N/A"} />
          <InfoRow label="Education Requirements" value={educationRequirements} />
          <InfoRow label="Workplace Type" value={workplaceType} />
          <InfoRow label="Application Deadline" value={formatDate(applicationDeadline)} />
          <InfoRow label="Contact Email" value={contactEmail} isEmail />
        </section>
      </main>
    </motion.div>
  );
}

export default JobDetails;
