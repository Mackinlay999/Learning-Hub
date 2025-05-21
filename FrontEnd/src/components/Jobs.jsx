import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import "../style/Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/recruiters/jobs");
        setJobs(response.data.reverse());
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="user-jobs-loader">
        <div className="user-jobs-spinner"></div>
      </div>
    );
  }

  return (
    <div className="user-jobs-container">
      <h2 className="user-jobs-title">Available Jobs & Internships</h2>
      <div className="user-jobs-grid">
        {jobs.map((job, index) => (
          <motion.div
            key={index}
            className="user-jobs-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <h3 className="user-jobs-job-title">{job.title}</h3>
            <p className="user-jobs-type">{job.type}</p>
            <div className="user-jobs-details">
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Stipend:</strong> {job.stipend || "N/A"}</p>
              <p><strong>Duration:</strong> {job.duration || "N/A"}</p>
              <p><strong>Start:</strong> {job.startDate}</p>
              <p><strong>End:</strong> {job.endDate || "N/A"}</p>
              <p><strong>Deadline:</strong> {job.deadline}</p>
              <p><strong>Openings:</strong> {job.openings}</p>
              <p><strong>Experience:</strong> {job.experience}</p>
              <p><strong>Skills:</strong> {job.skills}</p>
            </div>
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="user-jobs-button"
            >
              Apply Now
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
