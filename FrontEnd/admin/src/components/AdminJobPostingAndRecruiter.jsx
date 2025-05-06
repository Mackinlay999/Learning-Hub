import React, { useEffect, useState } from "react";
import axios from "./axios";
import "../style/AdminJobPostingAndRecruiter.css";

const AdminJobPostingAndRecruiter = () => {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({
    title: "",
    company: "",
    role: "",
    location: "",
    skills: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  

  // 🔁 Fetch all jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`/getAllJobs`);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const res = await axios.put(`/updateJob/${editingId}`, job);
        setJobs(jobs.map((j) => (j._id === editingId ? res.data : j)));
        setIsEditing(false);
        setEditingId(null);
      } else {
        const res = await axios.post(`/createJob`, job);
        setJobs([...jobs, res.data]);
      }

      setJob({ title: "", company: "", role: "", location: "", skills: "" });
    } catch (err) {
      console.error("Error saving job:", err);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`/deleteJob/${id}`);
      setJobs(jobs.filter((j) => j._id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  const editJob = (j) => {
    setJob(j);
    setIsEditing(true);
    setEditingId(j._id);
  };

  return (
    <div className="job-dashboard">
      <h1>Recruiter Dashboard</h1>
      <p>Post jobs and match students with opportunities.</p>

      <form className="job-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
        />
        <input
          name="company"
          placeholder="Company"
          value={job.company}
          onChange={handleChange}
          required
        />
        <input
          name="role"
          placeholder="Role"
          value={job.role}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
        />
        <input
          name="skills"
          placeholder="Required Skills (comma separated)"
          value={job.skills}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? "Update Job" : "Post Job"}</button>
      </form>

      <div className="job-list">
        <h2>Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p>No job postings yet.</p>
        ) : (
          <table>
            <thead>
              <tr className="JP-tr">
                <th>Title</th>
                <th>Company</th>
                <th>Role</th>
                <th>Location</th>
                <th>Skills</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j._id}>
                  <td>{j.title}</td>
                  <td>{j.company}</td>
                  <td>{j.role}</td>
                  <td>{j.location}</td>
                  <td>{j.skills}</td>
                  <td>
                    <button onClick={() => editJob(j)}>Edit</button>
                    <button onClick={() => deleteJob(j._id)}>Delete</button>
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

export default AdminJobPostingAndRecruiter;
