import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../style/JobList.css";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://learning-hub-p2yq.onrender.com/api/recruiter/jobs"
        );
        setJobs(response.data);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(job.employmentType);

      return matchesSearch && matchesType;
    });
  }, [jobs, searchTerm, selectedTypes]);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <motion.div
      className="job-list-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="job-list-title">Available Jobs</h2>

      <div className="job-list-filters">
        <input
          type="text"
          placeholder="Search by job title, company or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="job-list-search-input"
        />
        <div className="job-list-type-filters">
          {["Full-time", "Part-time", "Contract", "Internship","Freelance"].map((type) => (
            <button
              key={type}
              className={`job-list-type-btn ${
                selectedTypes.includes(type) ? "selected" : ""
              }`}
              onClick={() => toggleType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <ul className="job-list-jobs">
        {filteredJobs.length === 0 && (
          <p className="job-list-no-results">
            No jobs found matching your criteria.
          </p>
        )}
        {filteredJobs.map((job) => (
          <motion.li
            key={job._id}
            className="job-list-job-card"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <div className="job-list-job-info">
              <h3 className="job-list-job-title">{job.jobTitle}</h3>
              <p className="job-list-company">{job.companyName}</p>
              <p className="job-list-location">{job.location}</p>
              <p className="job-list-type">{job.employmentType}</p>
            </div>
            <div className="job-list-job-meta">
              <p className="job-list-posted">
                Posted {new Date(job.postedAt).toLocaleDateString()}
              </p>
              {/* ✅ Replaced Apply Button with Link */}
              <Link className="job-list-apply-btn" to={`${job._id}`}>
                View Details
              </Link>
              <button
                className="job-list-apply-btn"
                onClick={async () => {
                  try {
                    const res = await fetch(
                      `https://learning-hub-p2yq.onrender.com/api/apply/${job._id}`
                    );
                    const data = await res.json();
                    if (data.applicationLink) {
                      window.open(
                        data.applicationLink,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    } else {
                      alert("Application link not found");
                    }
                  } catch (err) {
                    console.error(err);
                    alert("Failed to get application link");
                  }
                }}
              >
                Apply
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default JobList;
