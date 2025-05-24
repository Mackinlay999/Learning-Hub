import React, { useState } from "react";
import { motion } from "framer-motion";
import "../style/JobPosting.css";

const API_BASE = "https://learning-hub-p2yq.onrender.com/api/recruiter/jobs";

const JobPosting = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    employmentType: "",
    workplaceType: "",
    industry: "",
    experienceLevel: "",
    salaryRange: "",
    jobDescription: "",
    skillsRequired: "",
    applicationDeadline: "",
    applyLink: "",
    contactEmail: "",
    jobBenefits: "",
    vacancies: 1,
    educationRequirements: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simple email validation
  const isValidEmail = (email) =>
    /^\S+@\S+\.\S+$/.test(email);

  // Simple URL validation
  const isValidURL = (url) => {
    if (!url) return true; // allow empty
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and URL before submitting
    if (formData.contactEmail && !isValidEmail(formData.contactEmail)) {
      alert("Please enter a valid contact email.");
      return;
    }
    if (!isValidURL(formData.applyLink)) {
      alert("Please enter a valid URL for the Apply Link.");
      return;
    }

    try {
      const recruiterId = localStorage.getItem("recruiterId");
      if (!recruiterId)
        throw new Error("Recruiter ID not found in localStorage.");

      const dataToSend = {
        ...formData,
        recruiterId,
      };

      const url = isEditing ? `${API_BASE}/${editJobId}` : API_BASE;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok)
        throw new Error(
          isEditing ? "Failed to update job" : "Failed to post job"
        );

      alert(isEditing ? "Job Updated Successfully!" : "Job Posted Successfully!");

      setFormData({
        jobTitle: "",
        companyName: "",
        location: "",
        employmentType: "",
        workplaceType: "",
        industry: "",
        experienceLevel: "",
        salaryRange: "",
        jobDescription: "",
        skillsRequired: "",
        applicationDeadline: "",
        applyLink: "",
        contactEmail: "",
        jobBenefits: "",
        vacancies: 1,
        educationRequirements: "",
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
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="job-posting-title">{isEditing ? "Edit Job" : "Post a Job"}</h2>

      <form className="job-posting-form" onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className="form-group">
          <label>Job Title *</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>

        {/* Company Name */}
        <div className="form-group">
          <label>Company Name *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Employment Type & Workplace Type */}
        <div className="form-row">
          <div className="form-group">
            <label>Employment Type *</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div className="form-group">
            <label>Workplace Type *</label>
            <select
              name="workplaceType"
              value={formData.workplaceType}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Industry */}
        <div className="form-group">
          <label>Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
          />
        </div>

        {/* Experience Level & Salary Range */}
        <div className="form-row">
          <div className="form-group">
            <label>Experience Level</label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
            >
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

        {/* Vacancies */}
        <div className="form-group">
          <label>Number of Vacancies *</label>
          <input
            type="number"
            min="1"
            name="vacancies"
            value={formData.vacancies}
            onChange={handleChange}
            required
          />
        </div>

        {/* Education Requirements */}
        <div className="form-group">
          <label>Education Requirements</label>
          <input
            type="text"
            name="educationRequirements"
            value={formData.educationRequirements}
            onChange={handleChange}
            placeholder="e.g. Bachelor's Degree in Computer Science"
          />
        </div>

        {/* Job Description */}
        <div className="form-group">
          <label>Job Description *</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows="6"
            required
          />
        </div>

        {/* Skills Required */}
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

        {/* Job Benefits */}
        <div className="form-group">
          <label>Job Benefits</label>
          <textarea
            name="jobBenefits"
            value={formData.jobBenefits}
            onChange={handleChange}
            rows="3"
            placeholder="e.g. Health insurance, Paid time off"
          />
        </div>

        {/* Application Deadline */}
        <div className="form-group">
          <label>Application Deadline</label>
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
          />
        </div>

        {/* Apply Link */}
        <div className="form-group">
          <label>Apply Link URL *</label>
          <input
            type="url"
            name="applyLink"
            value={formData.applyLink}
            onChange={handleChange}
            placeholder="https://example.com/apply"
            required
          />
        </div>

        {/* Contact Email */}
        <div className="form-group">
          <label>Contact Email *</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="contact@company.com"
            required
          />
        </div>

        <motion.button
          type="submit"
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isEditing ? "Update Job" : "Post Job"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default JobPosting;
