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
    applicationLink: "",
    contactEmail: "",
    jobBenefits: "",
    vacancies: 1,
    educationRequirements: "",
    companyLogo: "",
    companyWebsite: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation helpers
  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const isValidURL = (url) => {
    if (!url) return true; // allow empty
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const clearForm = () => {
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
      applicationLink: "",
      contactEmail: "",
      jobBenefits: "",
      vacancies: 1,
      educationRequirements: "",
      companyLogo: "",
      companyWebsite: "",
    });
    setIsEditing(false);
    setEditJobId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.jobTitle.trim() ||
      !formData.companyName.trim() ||
      !formData.location.trim() ||
      !formData.employmentType ||
      !formData.workplaceType ||
      !formData.jobDescription.trim() ||
      !formData.contactEmail.trim() ||
      !formData.applicationLink.trim()
    ) {
      alert("Please fill in all required fields marked with *.");
      return;
    }

    if (!isValidEmail(formData.contactEmail)) {
      alert("Please enter a valid contact email.");
      return;
    }
    if (!isValidURL(formData.applicationLink)) {
      alert("Please enter a valid URL for the Apply Link.");
      return;
    }
    if (formData.companyWebsite && !isValidURL(formData.companyWebsite)) {
      alert("Please enter a valid URL for the Company Website.");
      return;
    }
    if (formData.companyLogo && !isValidURL(formData.companyLogo)) {
      alert("Please enter a valid URL for the Company Logo.");
      return;
    }
    if (formData.vacancies < 1) {
      alert("Vacancies must be at least 1.");
      return;
    }

    try {
      setLoading(true);
      const recruiterId = localStorage.getItem("recruiterId");
      if (!recruiterId) throw new Error("Recruiter ID not found in localStorage.");

      const dataToSend = {
        ...formData,
        recruiterId,
        vacancies: Number(formData.vacancies),
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

      if (!res.ok) {
        const errMsg = await res.json();
        throw new Error(errMsg.message || (isEditing ? "Failed to update job" : "Failed to post job"));
      }

      alert(isEditing ? "Job Updated Successfully!" : "Job Posted Successfully!");
      clearForm();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
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

      <form className="job-posting-form" onSubmit={handleSubmit} noValidate>
        {/* Job Title */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Job Title *</label>
          <input
          className="job-posting-input"
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        {/* Company Name */}
        <div className="job-posting-form-group">
          <label>Company Name *</label>
          <input
            className="job-posting-input"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        {/* Location */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Location *</label>
          <input
            className="job-posting-input"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>

        {/* Employment Type & Workplace Type */}
        <div className="job-posting-form-row">
          <div className="job-posting-form-group">
            <label className="job-posting-label">Employment Type *</label>
            <select
              className="job-posting-select"
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

          <div className="job-posting-form-group">
            <label className="job-posting-label">Workplace Type *</label>
            <select
            className="job-posting-select"
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
        <div className="job-posting-form-group">
          <label className="job-posting-label">Industry</label>
          <input
            className="job-posting-input"
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        {/* Experience Level & Salary Range */}
        <div className="job-posting-form-row">
          <div className="job-posting-form-group">
            <label className="job-posting-label">Experience Level</label>
            <select
              className="job-posting-select"
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

          <div className="job-posting-form-group">
            <label className="job-posting-label">Salary Range (optional)</label>
            <input
              className="job-posting-input"
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              placeholder="e.g. $60k–$90k/year"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Vacancies */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Number of Vacancies *</label>
          <input
          className="job-posting-input"
            type="number"
            min="1"
            name="vacancies"
            value={formData.vacancies}
            onChange={handleChange}
            required
          />
        </div>

        {/* Education Requirements */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Education Requirements</label>
          <input
            className="job-posting-input"
            type="text"
            name="educationRequirements"
            value={formData.educationRequirements}
            onChange={handleChange}
            placeholder="e.g. Bachelor's Degree in Computer Science"
            autoComplete="off"
          />
        </div>

        {/* Company Logo URL */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Company Logo URL</label>
          <input
            className="job-posting-input"
            type="url"
            name="companyLogo"
            value={formData.companyLogo}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
            autoComplete="off"
          />
        </div>

        {/* Company Website URL */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Company Website URL</label>
          <input
            className="job-posting-input"
            type="url"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            placeholder="https://companywebsite.com"
            autoComplete="off"
          />
        </div>

        {/* Job Description */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Job Description *</label>
          <textarea
            className="job-posting-textarea"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows="6"
            required
          />
        </div>

        {/* Skills Required */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Skills Required</label>
          <input
            className="job-posting-input"
            type="text"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
            placeholder="Comma-separated e.g. React, Node.js"
            autoComplete="off"
          />
        </div>

        {/* Job Benefits */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Job Benefits</label>
          <textarea
          className="job-posting-textarea"
            name="jobBenefits"
            value={formData.jobBenefits}
            onChange={handleChange}
            rows="3"
            placeholder="e.g. Health insurance, Paid time off"
          />
        </div>

        {/* Application Deadline */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Application Deadline</label>
          <input
          className="job-posting-input"
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
          />
        </div>

        {/* Apply Link */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Apply Link URL *</label>
          <input
          className="job-posting-input"
            type="url"
            name="applicationLink"
            value={formData.applicationLink}
            onChange={handleChange}
            placeholder="https://example.com/apply"
            required
          />
        </div>

        {/* Contact Email */}
        <div className="job-posting-form-group">
          <label className="job-posting-label">Contact Email *</label>
          <input
          className="job-posting-input"
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="contact@company.com"
            required
          />
        </div>

        <div className="job-posting-form-buttons">
          <motion.button
            type="submit"
            className="job-posting-submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? (isEditing ? "Updating..." : "Posting...") : isEditing ? "Update Job" : "Post Job"}
          </motion.button>

          {isEditing && (
            <motion.button
              type="button"
              className="job-posting-cancel-btn"
              onClick={clearForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              Cancel
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default JobPosting;
