import React, { useState } from "react";
import "../style/AdminCareerReportForm.css";

const AdminCareerReportForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Hide modal when isOpen is false

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="career-" onClick={onClose}>
          ×
        </button>
        <h2>Get a Copy of the Career Report</h2>
        <p>Fill in the below details to receive your copy</p>

        <form className="career-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />

          <div className="phone-input">
            <select>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input type="tel" placeholder="Mobile Number" required />
          </div>

          <select required>
            <option value="">Work Experience in years</option>
            <option value="0-1">0-1</option>
            <option value="1-3">1-3</option>
            <option value="3-5">3-5</option>
            <option value="5+">5+</option>
          </select>

          <select required>
            <option value="">Select Domain</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>

          <p className="consent-text">
            By submitting this form, you consent to our{" "}
            <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a> and
            agree to be contacted via Email/Call/Whatsapp/SMS.
          </p>

          <button type="submit" className="download-btn">
            Download Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCareerReportForm;
