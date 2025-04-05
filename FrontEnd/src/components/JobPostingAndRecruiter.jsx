import React, { useState } from "react";
import "../style/JobPostingAndRecruiter.css";

const JobPostingAndRecruiter = () => {
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

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setJobs(
        jobs.map((j) => (j.id === editingId ? { ...job, id: editingId } : j))
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newJob = { ...job, id: Date.now() };
      setJobs([...jobs, newJob]);
    }
    setJob({ title: "", company: "", role: "", location: "", skills: "" });
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };

  const editJob = (j) => {
    setJob(j);
    setIsEditing(true);
    setEditingId(j.id);
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
        <button type="submit">{isEditing ? "Update" : "Post Job"}</button>
      </form>

      <div className="job-list">
        <h2>Posted Jobs</h2>
        {jobs.length === 0 ? (
          <p>No job postings yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
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
                <tr key={j.id}>
                  <td>{j.title}</td>
                  <td>{j.company}</td>
                  <td>{j.role}</td>
                  <td>{j.location}</td>
                  <td>{j.skills}</td>
                  <td>
                    <button onClick={() => editJob(j)}>Edit</button>
                    <button onClick={() => deleteJob(j.id)}>Delete</button>
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

export default JobPostingAndRecruiter;
