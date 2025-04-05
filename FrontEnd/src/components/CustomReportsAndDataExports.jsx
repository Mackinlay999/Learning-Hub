import React, { useState } from "react";
import "../style/CustomReportsAndDataExports.css";

const CustomReportsAndDataExports = () => {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState({
    title: "",
    type: "Excel",
    prediction: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setReports(
        reports.map((r) => (r.id === editingId ? { ...report, id: editingId } : r))
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newReport = { ...report, id: Date.now() };
      setReports([...reports, newReport]);
    }
    setReport({ title: "", type: "Excel", prediction: "" });
  };

  const deleteReport = (id) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  const editReport = (report) => {
    setReport(report);
    setIsEditing(true);
    setEditingId(report.id);
  };

  return (
    <div className="CR-main">
      <h1 className="CR-title">Custom Reports & Data Exports</h1>
      <p className="CR-subtitle">
        Downloadable reports (Excel, CSV, PDF).<br />
        AI-based trend predictions & recommendations.
      </p>

      <form onSubmit={handleSubmit} className="CR-form">
        <input
          name="title"
          placeholder="Report Title"
          value={report.title}
          onChange={handleChange}
          required
        />
        <select name="type" value={report.type} onChange={handleChange}>
          <option value="Excel">Excel</option>
          <option value="CSV">CSV</option>
          <option value="PDF">PDF</option>
        </select>
        <textarea
          name="prediction"
          placeholder="AI-based prediction or insight..."
          value={report.prediction}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">{isEditing ? "Update Report" : "Add Report"}</button>
      </form>

      <div className="CR-list">
        <h2 className="CR-section-title">Reports</h2>
        {reports.length === 0 ? (
          <p className="CR-empty">No reports created yet.</p>
        ) : (
          <table className="CR-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>AI Prediction</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>{r.title}</td>
                  <td>{r.type}</td>
                  <td>{r.prediction}</td>
                  <td>
                    <button onClick={() => editReport(r)}>Edit</button>
                    <button onClick={() => deleteReport(r.id)}>Delete</button>
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

export  default CustomReportsAndDataExports;
