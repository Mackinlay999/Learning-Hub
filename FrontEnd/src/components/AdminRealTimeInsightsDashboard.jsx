import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/AdminRealTimeInsightsDashboard.css";

const BASE_URL = "https://learning-hub-p2yq.onrender.com/api/insights"; // replace if hosted elsewhere

const AdminRealTimeInsightsDashboard = () => {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState({
    metric: "",
    value: "",
    category: "Enrollment Trends",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setRecords(res.data);
    } catch (err) {
      console.error("Failed to fetch insights:", err);
    }
  };

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${BASE_URL}/${editingId}`, record);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await axios.post(BASE_URL, record);
      }
      setRecord({ metric: "", value: "", category: "Enrollment Trends" });
      fetchRecords();
    } catch (err) {
      console.error("Failed to save record:", err);
    }
  };

  const editRecord = (rec) => {
    setRecord(rec);
    setIsEditing(true);
    setEditingId(rec._id);
  };

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetchRecords();
    } catch (err) {
      console.error("Failed to delete record:", err);
    }
  };

  return (
    <div className="RD-main">
      <h1 className="RD-title">📊 Real-Time Insights Dashboard</h1>
      <p className="RD-subtitle">
        Monitor student enrollment trends, lead conversion, revenue, and
        engagement.
      </p>

      <form className="RD-form" onSubmit={handleSubmit}>
        <input
          name="metric"
          placeholder="Metric Name (e.g., Total Students)"
          value={record.metric}
          onChange={handleChange}
          required
        />
        <input
          name="value"
          placeholder="Value (e.g., 1200)"
          value={record.value}
          onChange={handleChange}
          required
        />
        <select name="category" value={record.category} onChange={handleChange}>
          <option>Enrollment Trends</option>
          <option>Lead Conversion</option>
          <option>Revenue Projections</option>
          <option>Engagement Metrics</option>
        </select>
        <button type="submit">{isEditing ? "Update" : "Add"} Record</button>
      </form>

      <div className="RD-list">
        {records.length === 0 ? (
          <p className="RD-empty">No insights yet.</p>
        ) : (
          <table className="RD-table">
            <thead>
              <tr className="ST-tr">
                <th>Metric</th>
                <th>Value</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec._id}>
                  <td>{rec.metric}</td>
                  <td>{rec.value}</td>
                  <td>{rec.category}</td>
                  <td>
                    <button onClick={() => editRecord(rec)}>Edit</button>
                    <button onClick={() => deleteRecord(rec._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminRealTimeInsightsDashboard;
