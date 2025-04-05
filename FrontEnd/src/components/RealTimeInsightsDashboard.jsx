import React, { useState } from "react";
import "../style/RealTimeInsightsDashboard.css";

const RealTimeInsightsDashboard = () => {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState({
    metric: "",
    value: "",
    category: "Enrollment Trends",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setRecords(
        records.map((rec) =>
          rec.id === editingId ? { ...record, id: editingId } : rec
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newRec = { ...record, id: Date.now() };
      setRecords([...records, newRec]);
    }
    setRecord({ metric: "", value: "", category: "Enrollment Trends" });
  };

  const editRecord = (rec) => {
    setRecord(rec);
    setIsEditing(true);
    setEditingId(rec.id);
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  return (
    <div className="RD-main">
      <h1 className="RD-title">📊 Real-Time Insights Dashboard</h1>
      <p className="RD-subtitle">
        Monitor student enrollment trends, lead conversion, revenue, and engagement.
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
        <select
          name="category"
          value={record.category}
          onChange={handleChange}
        >
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
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id}>
                  <td>{rec.metric}</td>
                  <td>{rec.value}</td>
                  <td>{rec.category}</td>
                  <td>
                    <button onClick={() => editRecord(rec)}>Edit</button>
                    <button onClick={() => deleteRecord(rec.id)}>Delete</button>
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

export default RealTimeInsightsDashboard;
