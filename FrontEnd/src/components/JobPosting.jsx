import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../style/JobPosting.css';

const API_BASE = 'https://learning-hub-p2yq.onrender.com/api/recruiter/jobs';

const JobPosting = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    employmentType: '',
    workplaceType: '',
    industry: '',
    experienceLevel: '',
    salaryRange: '',
    jobDescription: '',
    skillsRequired: '',
    applicationDeadline: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `${API_BASE}/${editJobId}` : API_BASE;
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(isEditing ? 'Failed to update job' : 'Failed to post job');

      alert(isEditing ? 'Job Updated Successfully!' : 'Job Posted Successfully!');
      setFormData({
        jobTitle: '',
        companyName: '',
        location: '',
        employmentType: '',
        workplaceType: '',
        industry: '',
        experienceLevel: '',
        salaryRange: '',
        jobDescription: '',
        skillsRequired: '',
        applicationDeadline: '',
      });
      setIsEditing(false);
      setEditJobId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <motion.div
      className="job-posting-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="job-posting-title">{isEditing ? 'Edit Job' : 'Post a Job'}</h2>

      <form className="job-posting-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Employment Type</label>
            <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div className="form-group">
            <label>Workplace Type</label>
            <select name="workplaceType" value={formData.workplaceType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Industry</label>
          <input type="text" name="industry" value={formData.industry} onChange={handleChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Experience Level</label>
            <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Entry-level">Entry-level</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior-level">Senior-level</option>
              <option value="Director">Director</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

          <div className="form-group">
            <label>Salary Range (optional)</label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              placeholder="e.g. $60k–$90k/year"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Job Description</label>
          <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows="6" required />
        </div>

        <div className="form-group">
          <label>Skills Required</label>
          <input
            type="text"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
            placeholder="Comma-separated e.g. React, Node.js"
          />
        </div>

        <div className="form-group">
          <label>Application Deadline</label>
          <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} />
        </div>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isEditing ? 'Update Job' : 'Post Job'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default JobPosting;
