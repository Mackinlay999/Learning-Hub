import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../style/JobPosting.css';

const API_BASE = 'https://learning-hub-p2yq.onrender.com/api/jobs'; // Change to your backend URL

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

  const [jobs, setJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update existing job
        const res = await fetch(`${API_BASE}/${editJobId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to update job');

        alert('Job Updated Successfully!');
        setIsEditing(false);
        setEditJobId(null);
      } else {
        // Create new job
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Failed to post job');

        alert('Job Posted Successfully!');
      }
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
      fetchJobs();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (job) => {
    setFormData({
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      location: job.location,
      employmentType: job.employmentType,
      workplaceType: job.workplaceType,
      industry: job.industry || '',
      experienceLevel: job.experienceLevel || '',
      salaryRange: job.salaryRange || '',
      jobDescription: job.jobDescription,
      skillsRequired: job.skillsRequired || '',
      applicationDeadline: job.applicationDeadline ? job.applicationDeadline.split('T')[0] : '',
    });
    setIsEditing(true);
    setEditJobId(job._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete job');
        alert('Job Deleted Successfully!');
        fetchJobs();
      } catch (err) {
        alert(err.message);
      }
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
        {/* Form fields as before */}
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

      {/* Job Listing Table */}
      {jobs.length > 0 && (
        <div className="job-table-section">
          <h3>Posted Jobs</h3>
          <table className="job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Employment Type</th>
                <th>Workplace Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.jobTitle}</td>
                  <td>{job.companyName}</td>
                  <td>{job.location}</td>
                  <td>{job.employmentType}</td>
                  <td>{job.workplaceType}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(job)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(job._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default JobPosting;
