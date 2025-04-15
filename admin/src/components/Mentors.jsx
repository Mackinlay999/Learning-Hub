import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Mentor.css";

const API_URL = "http://localhost:3000/api/mentors";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    courses: "",
    sessions: "",
    feedback: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await axios.get(API_URL);
      setMentors(res.data);
    } catch (err) {
      console.error("Error fetching mentors:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      fetchMentors();
      setForm({ name: "", email: "", courses: "", sessions: "", feedback: "" });
      setEditing(null);
    } catch (err) {
      console.error("Error saving mentor:", err);
    }
  };

  const handleEdit = (mentor) => {
    setForm({
      name: mentor.name,
      email: mentor.email,
      courses: mentor.courses,
      sessions: mentor.sessions || "",
      feedback: mentor.feedback || "",
    });
    setEditing(mentor._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMentors();
    } catch (err) {
      console.error("Error deleting mentor:", err);
    }
  };

  return (
    <div className="container py-4 mentors-container">
      <h2 className="text-center mb-4 mentors-title-effect">Faculty & Mentor Management</h2>

      {/* Form */}
      <div className="card shadow mb-4 mentors-form-card">
        <div className="mentors-card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="mentors-form-control"
                placeholder="Mentor Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                className="mentors-form-control"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="mentors-form-control"
                placeholder="Assigned Courses (comma-separated)"
                value={form.courses}
                onChange={(e) => setForm({ ...form, courses: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="mentors-form-control"
                placeholder="Sessions Handled"
                value={form.sessions}
                onChange={(e) => setForm({ ...form, sessions: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                step="0.1"
                className="mentors-form-control"
                placeholder="Feedback Score (1 to 5)"
                value={form.feedback}
                onChange={(e) => setForm({ ...form, feedback: e.target.value })}
              />
            </div>
            <div className="col-12 d-grid">
              <button type="submit" className="btn btn-primary mentors-submit-btn">
                {editing ? "Update Mentor" : "Add Mentor"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mentor Cards */}
      <div className="row">
        {mentors.map((mentor) => (
          <div key={mentor._id} className="col-md-4 mb-4">
            <div className="card mentor-card shadow h-100">
              <div className="mentors-card-body">
                <h5 className="mentors-card-title">{mentor.name}</h5>
                <p className="mentors-card-text text-muted">{mentor.email}</p>
                <p className="mentors-card-text"><strong>Courses:</strong> {mentor.courses}</p>
                <p className="mentors-card-text text-success"><strong>Sessions:</strong> {mentor.sessions || 0}</p>
                <p className="mentors-card-text text-info"><strong>Feedback:</strong> {mentor.feedback || "N/A"}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleEdit(mentor)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(mentor._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
