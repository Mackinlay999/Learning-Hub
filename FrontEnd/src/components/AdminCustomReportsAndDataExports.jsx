import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/AdminCustomReportsAndDataExports.css";

const API_URL = "https://learning-hub-p2yq.onrender.com/api/reports"; // Replace with your backend URL

const AdminCustomReportsAndDataExports = () => {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState({
    title: "",
    type: "Excel",
    prediction: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(API_URL);
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const { data } = await axios.put(`${API_URL}/${editingId}`, report);
        setReports(reports.map((r) => (r._id === editingId ? data : r)));
        setIsEditing(false);
        setEditingId(null);
      } else {
        const { data } = await axios.post(API_URL, report);
        setReports([...reports, data]);
      }

      setReport({ title: "", type: "Excel", prediction: "" });
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  const deleteReport = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setReports(reports.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const editReport = (r) => {
    setReport({
      title: r.title,
      type: r.type,
      prediction: r.prediction,
    });
    setIsEditing(true);
    setEditingId(r._id);
  };

  const downloadReport = async (id, type, title) => {
    try {
      const response = await axios.get(`${API_URL}/download/${id}`, {
        responseType: "blob", // important for file download
      });

      const fileExtension = type === "Excel" ? "xlsx" : type.toLowerCase();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.${fileExtension}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className="CR-main">
      <h1 className="CR-title">Custom Reports & Data Exports</h1>
      <p className="CR-subtitle">
        Downloadable reports (Excel, CSV, PDF).
        <br />
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
        <button type="submit">
          {isEditing ? "Update Report" : "Add Report"}
        </button>
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
                <tr key={r._id}>
                  <td>{r.title}</td>
                  <td>{r.type}</td>
                  <td>{r.prediction}</td>
                  <td>
                    <button onClick={() => editReport(r)}>Edit</button>
                    <button onClick={() => deleteReport(r._id)}>Delete</button>
                    <button
                      onClick={() => downloadReport(r._id, r.type, r.title)}
                    >
                      Download
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

export default AdminCustomReportsAndDataExports;
