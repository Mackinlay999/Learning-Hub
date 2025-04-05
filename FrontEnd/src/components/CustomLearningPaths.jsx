import React, { useState } from "react";
import "../style/CustomLearningPaths.css";

const CustomLearningPaths = () => {
  const [paths, setPaths] = useState([]);
  const [path, setPath] = useState({
    company: "",
    courseList: "",
    objective: "",
    duration: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setPath({ ...path, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setPaths(paths.map((p) => (p.id === editId ? { ...path, id: editId } : p)));
      setIsEditing(false);
      setEditId(null);
    } else {
      const newPath = { ...path, id: Date.now() };
      setPaths([...paths, newPath]);
    }

    setPath({
      company: "",
      courseList: "",
      objective: "",
      duration: "",
    });
  };

  const handleEdit = (data) => {
    setPath(data);
    setIsEditing(true);
    setEditId(data.id);
  };

  const handleDelete = (id) => {
    setPaths(paths.filter((p) => p.id !== id));
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
              <tr>
                <th>Company</th>
                <th>Courses</th>
                <th>Objective</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paths.map((p) => (
                <tr key={p.id}>
                  <td>{p.company}</td>
                  <td>{p.courseList}</td>
                  <td>{p.objective}</td>
                  <td>{p.duration}</td>
                  <td>
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button onClick={() => handleDelete(p.id)}>Delete</button>
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

export default CustomLearningPaths;
