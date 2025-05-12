import React, { useState } from "react";
import axios from "axios";
import "../style/AdminCareerContact.css";

const AdminCareerContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    learningDomain: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.learningDomain
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://learning-hub-p2yq.onrender.com/api/contact",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="contact-page">
      <div className="form-container">
        <div className="image-content">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.-ZoOM1nW7Nhk50ZyRnBk_wHaE8&pid=Api&P=0&h=220"
            alt="Customer Support"
            className="content-image"
          />
        </div>
        <div className="g-form-content">
          <h2>Contact Us</h2>
          <form className="google-form" onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className="g-from"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="g-from"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />

            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              className="g-from"
              placeholder="Enter your number"
              onChange={handleChange}
              required
            />

            <label className="form-label">
              What Training Program Do You Need?
            </label>
            <select
              name="learningDomain"
              className="g-select"
              onChange={handleChange}
              required
            >
              <option value="">Select Learning Domain</option>
              <option value="data-scientist">Data Scientist</option>
              <option value="full-stack-developer">Full Stack Developer</option>
              <option value="qa-testing">QA Testing</option>
              <option value="graphic-designer">Graphic Designer</option>
              <option value="ui-ux-designer">UI/UX Designer</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="Finance">Finance</option>
            </select>

            <button className="career-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCareerContact;
