import { useState } from "react";
import "../style/LeadForm.css";

const LeadForm = ({ addLead }) => {
  const [formData, setFormData] = useState({ name: "", email: "", status: "Hot" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    addLead(formData);
    alert("Lead added successfully!");
    setFormData({ name: "", email: "", status: "Hot" });
  };

  return (
    <div className="LF-lead-form">
      <h3>Add New Lead</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="LF-input"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="LF-input"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <select name="status" className="LF-select" onChange={handleChange} value={formData.status}>
          <option value="Hot">Hot</option>
          <option value="Warm">Warm</option>
          <option value="Cold">Cold</option>
        </select>
        <button type="submit" className="LF-button">Add Lead</button>
      </form>
    </div>
  );
};

export default LeadForm;
