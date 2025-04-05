import { useState, useEffect } from "react";

const LeadForm = ({ addLead, isEditing, editingLead, updateLead }) => {
  const [leadData, setLeadData] = useState({ name: "", email: "", status: "Hot" });

  useEffect(() => {
    if (isEditing && editingLead) {
      setLeadData(editingLead);
    }
  }, [isEditing, editingLead]);

  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateLead(leadData);
    } else {
      addLead(leadData);
    }
    setLeadData({ name: "", email: "", status: "Hot" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={leadData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={leadData.email}
        onChange={handleChange}
        required
      />
      <select name="status" value={leadData.status} onChange={handleChange}>
        <option value="Hot">Hot</option>
        <option value="Warm">Warm</option>
        <option value="Cold">Cold</option>
      </select>
      <button type="submit">{isEditing ? "Update Lead" : "Add Lead"}</button>
    </form>
  );
};

export default LeadForm;
