import React, { useState, useEffect } from "react";
import axios from "./axios";
import "../style/AdminPlacementAssistanceTracking.css";

const AdminPlacementAssistanceTracking = () => {
  const [applications, setApplications] = useState([]);
  const [application, setApplication] = useState({
    studentName: "",
    jobTitle: "",
    company: "",
    interviewStatus: "Pending",
    placementStatus: "Not Placed",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);


  // Fetch all applications
  useEffect(() => {
    axios
      .get(`/getAllApplications`)
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/updateApplication/${editingId}`, application);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await axios.post(`/createApplication`, application);
      }

      // Refresh data
      const res = await axios.get(`/getAllApplications`);
      setApplications(res.data);

      // Reset form
      setApplication({
        studentName: "",
        jobTitle: "",
        company: "",
        interviewStatus: "Pending",
        placementStatus: "Not Placed",
      });
    } catch (error) {
      console.error("Error saving application:", error);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`/deleteApplication/${id}`);
      setApplications(applications.filter((app) => app._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const editApplication = (app) => {
    setApplication(app);
    setIsEditing(true);
    setEditingId(app._id);
  };

  return (
    <div className="PA-main">
      <h1 className="PA-title">Placement Assistance & Tracking</h1>
      <p className="PA-description">
        Track job applications, interviews & placement rates.
        <br />
        Generate employment success reports.
      </p>

      <form className="PA-form" onSubmit={handleSubmit}>
        <input
          name="studentName"
          placeholder="Student Name"
          value={application.studentName}
          onChange={handleChange}
          required
        />
        <input
          name="jobTitle"
          placeholder="Job Title"
          value={application.jobTitle}
          onChange={handleChange}
          required
        />
        <input
          name="company"
          placeholder="Company"
          value={application.company}
          onChange={handleChange}
          required
        />
        <select
          name="interviewStatus"
          value={application.interviewStatus}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Scheduled</option>
          <option>Cleared</option>
          <option>Rejected</option>
        </select>
        <select
          name="placementStatus"
          value={application.placementStatus}
          onChange={handleChange}
        >
          <option>Not Placed</option>
          <option>Placed</option>
        </select>
        <button type="submit">
          {isEditing ? "Update Application" : "Add Application"}
        </button>
      </form>

      <div className="PA-list">
        <h2>Applications</h2>
        {applications.length === 0 ? (
          <p className="PA-empty">No applications yet.</p>
        ) : (
          <table className="PA-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Interview</th>
                <th>Placement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.studentName}</td>
                  <td>{app.jobTitle}</td>
                  <td>{app.company}</td>
                  <td>{app.interviewStatus}</td>
                  <td>{app.placementStatus}</td>
                  <td>
                    <button onClick={() => editApplication(app)}>Edit</button>
                    <button onClick={() => deleteApplication(app._id)}>Delete</button>
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

export default AdminPlacementAssistanceTracking;
