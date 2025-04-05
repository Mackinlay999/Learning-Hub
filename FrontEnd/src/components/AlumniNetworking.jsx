import React, { useState } from "react";
import "../style/AlumniNetworking.css";

const AlumniNetworking = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [alumni, setAlumni] = useState({
    name: "",
    graduationYear: "",
    industry: "",
    testimonial: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setAlumni({ ...alumni, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setAlumniList(
        alumniList.map((a) =>
          a.id === editingId ? { ...alumni, id: editingId } : a
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newAlumni = { ...alumni, id: Date.now() };
      setAlumniList([...alumniList, newAlumni]);
    }
    setAlumni({ name: "", graduationYear: "", industry: "", testimonial: "" });
  };

  const handleEdit = (alum) => {
    setAlumni(alum);
    setIsEditing(true);
    setEditingId(alum.id);
  };

  const handleDelete = (id) => {
    setAlumniList(alumniList.filter((a) => a.id !== id));
  };

  return (
    <div className="AN-main">
      <h1 className="AN-title">Alumni & Networking</h1>
      <p className="AN-subtitle">
        Connect graduates with industry mentors. <br />
        Success stories & alumni testimonials.
      </p>

      <form className="AN-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Alumni Name"
          value={alumni.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="graduationYear"
          placeholder="Graduation Year"
          value={alumni.graduationYear}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={alumni.industry}
          onChange={handleChange}
          required
        />
        <textarea
          name="testimonial"
          placeholder="Testimonial or Success Story"
          value={alumni.testimonial}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? "Update Alumni" : "Add Alumni"}
        </button>
      </form>

      <div className="AN-list">
        <h2>Alumni Records</h2>
        {alumniList.length === 0 ? (
          <p className="AN-empty">No alumni added yet.</p>
        ) : (
          <table className="AN-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Year</th>
                <th>Industry</th>
                <th>Testimonial</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alumniList.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.graduationYear}</td>
                  <td>{a.industry}</td>
                  <td>{a.testimonial}</td>
                  <td>
                    <button onClick={() => handleEdit(a)}>Edit</button>
                    <button onClick={() => handleDelete(a.id)}>Delete</button>
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

export default AlumniNetworking;
