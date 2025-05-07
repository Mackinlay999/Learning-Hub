import { useState, useEffect, forwardRef } from "react";

const AdminLeadForm = forwardRef(({ addLead, isEditing, editingLead, updateLead }, ref) => {
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
    <form onSubmit={handleSubmit} ref={ref}>
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
      <button className="d-btn" type="submit">{isEditing ? "Update Lead" : "Add Lead"}</button>
    </form>
  );
});

export default AdminLeadForm;
