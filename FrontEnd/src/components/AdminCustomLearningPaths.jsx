import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/AdminCustomLearningPaths.css";

const API_URL =
  "https://learning-hub-p2yq.onrender.com/api/custom-learning-paths"; // Change this to your actual backend URL

const AdminCustomLearningPaths = () => {
  const [paths, setPaths] = useState([]);
  const [path, setPath] = useState({
    company: "",
    courseList: "",
    objective: "",
    duration: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch paths from the backend
  const fetchPaths = async () => {
    try {
      const res = await axios.get(API_URL);
      setPaths(res.data);
    } catch (err) {
      console.error("Error fetching paths:", err);
    }
  };

  useEffect(() => {
    fetchPaths();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setPath({ ...path, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      try {
        const res = await axios.put(`${API_URL}/${editId}`, path);
        setPaths(paths.map((p) => (p._id === editId ? res.data : p)));
        setIsEditing(false);
        setEditId(null);
      } catch (err) {
        console.error("Error updating path:", err);
      }
    } else {
      try {
        const res = await axios.post(API_URL, path);
        setPaths([...paths, res.data]);
      } catch (err) {
        console.error("Error creating path:", err);
      }
    }

    setPath({
      company: "",
      courseList: "",
      objective: "",
      duration: "",
    });
  };

  // Handle edit
  const handleEdit = (data) => {
    setPath({
      company: data.company,
      courseList: data.courseList,
      objective: data.objective,
      duration: data.duration,
    });
    setIsEditing(true);
    setEditId(data._id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPaths(paths.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting path:", err);
    }
  };

  return (
    <div className="CLP-container">
      <h1 className="CLP-title">Custom Learning Paths for Companies</h1>
      <p className="CLP-description">
        Design & offer tailor-made learning paths for businesses.
      </p>

      <form className="CLP-form" onSubmit={handleSubmit}>
        <input
          name="company"
          placeholder="Company Name"
          value={path.company}
          onChange={handleChange}
          required
        />
        <input
          name="courseList"
          placeholder="Courses (comma-separated)"
          value={path.courseList}
          onChange={handleChange}
          required
        />
        <input
          name="objective"
          placeholder="Learning Objective"
          value={path.objective}
          onChange={handleChange}
          required
        />
        <input
          name="duration"
          placeholder="Duration (e.g., 3 months)"
          value={path.duration}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? "Update Path" : "Add Path"}</button>
      </form>

      <div className="CLP-list">
        <h2>Assigned Learning Paths</h2>
        {paths.length === 0 ? (
          <p>No paths assigned yet.</p>
        ) : (
          <table className="CLP-table">
            <thead>
              <tr className="ST-tr">
                <th>Company</th>
                <th>Courses</th>
                <th>Objective</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paths.map((p) => (
                <tr key={p._id}>
                  <td>{p.company}</td>
                  <td>{p.courseList}</td>
                  <td>{p.objective}</td>
                  <td>{p.duration}</td>
                  <td>
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button onClick={() => handleDelete(p._id)}>Delete</button>
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

export default AdminCustomLearningPaths;
