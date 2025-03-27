import React, { useState } from "react";
import axios from "axios";
import "../style/FilterForm.css"
const FilterForm = () => {
  const [learningDomain, setLearningDomain] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("learningDomain", learningDomain);
    formData.append("workExperience", workExperience);
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit data");
    }
  };

  return (
    <div className="c-container">
      <div>
      <h2 className="filter-h2">Career Portal</h2>
      </div>
     
      <form  className="c-form" onSubmit={handleSubmit}>
      
        <label>Filter by</label>
        <select className="c-select" onChange={(e) => setLearningDomain(e.target.value)}>
          <option value="">Learning Domain</option>
          <option value="">HR</option>
          <option value="IT">Marketing</option>
          <option value="IT">Sales</option>
          <option value="IT">Business Analyst</option>
          <option value="Finance">Finance</option>
        </select>

        <select className="c-select"  onChange={(e) => setWorkExperience(e.target.value)}>
          <option value="">Work Experience</option>
          <option value="0-2 Years">0-1 Years</option>
          <option value="3-5 Years">1-3 Years</option>
          <option value="3-5 Years">3-5 Years</option>
          <option value="3-5 Years">10++ Years</option>
        </select>

        <input className="c-input" type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button className="c-submit" type="submit">Apply</button>
      </form>
    </div>
  );
};

export default FilterForm;



