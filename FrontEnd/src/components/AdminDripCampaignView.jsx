



import React, { useEffect, useState } from "react";
import axios from "./axios";
import "../style/AdminDripCampaignView.css";


const AdminEmailTemplateManager = () => {
  const [templates, setTemplates] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    content: "",
    delayInMinutes: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await axios.get("/getEmails");
      setTemplates(res.data);
    } catch (err) {
      alert("❌ Failed to fetch email templates");
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      delayInMinutes: parseInt(formData.delayInMinutes)
    };

    try {
      if (editId) {
        const res = await axios.put(`/updateEmail/${editId}`, payload);
        const updatedList = templates.map((t) =>
          t._id === editId ? res.data : t
        );
        setTemplates(updatedList);
        alert("✅ Email updated successfully");
      } else {
        const res = await axios.post("/createEmail", payload);
        setTemplates([...templates, res.data]);
        alert("✅ Email created successfully");
      }
      setFormData({ subject: "", content: "", delayInMinutes: "" });
      setEditId(null);
    } catch (err) {
      alert("❌ Failed to save email");
    }
  };

  const handleEdit = (template) => {
    setFormData({
      subject: template.subject,
      content: template.content,
      delayInMinutes: template.delayInMinutes
    });
    setEditId(template._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/deleteEmail/${id}`);
      setTemplates(templates.filter((t) => t._id !== id));
      alert("🗑️ Email template deleted");
    } catch (err) {
      alert("❌ Failed to delete email");
    }
  };

  return (
    <div className="email-template-container">
      <h2>Email Template Manager 📬</h2>
      <div className="email-form">
        <input
          className="email-input"
          type="text"
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
        />
        <textarea
          className="email-textarea"
          placeholder="Email Content"
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
        />
        <input
          className="email-input"
          type="number"
          placeholder="Delay in Minutes (e.g. 10, 1440)"
          value={formData.delayInMinutes}
          onChange={(e) => handleChange("delayInMinutes", e.target.value)}
        />
        <button className="email-button" onClick={handleSubmit}>
          {editId ? "Update Email" : "Create Email"}
        </button>
      </div>

      <hr />

      <h3>Saved Templates 📑</h3>
      <ul className="email-list">
        {templates.map((template) => (
          <li key={template._id} className="email-item">
            <strong>📌 {template.subject}</strong> — {template.content}
            <br />
            ⏱️ Delay: {template.delayInMinutes} minutes
            <div className="email-actions">
              <button onClick={() => handleEdit(template)}>✏️ Edit</button>
              <button onClick={() => handleDelete(template._id)}>🗑️ Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminEmailTemplateManager;




