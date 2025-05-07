import React, { useState, useEffect } from "react";
import axios from "./axios";
import "../style/AdminAlumniNetworking.css";

const AdminAlumniNetworking = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [alumni, setAlumni] = useState({
    name: "",
    graduationYear: "",
    industry: "",
    testimonial: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const res = await axios.get(`/getAllAlumni`);
      setAlumniList(res.data);
    } catch (err) {
      console.error("Error fetching alumni:", err);
    }
  };

  const handleChange = (e) => {
    setAlumni({ ...alumni, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/updateAlumni/${editingId}`, alumni);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await axios.post(`/createAlumni`, alumni);
      }
      setAlumni({ name: "", graduationYear: "", industry: "", testimonial: "" });
      fetchAlumni();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleEdit = (alum) => {
    setAlumni(alum);
    setIsEditing(true);
    setEditingId(alum._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/deleteAlumni/${id}`);
      fetchAlumni();
    } catch (err) {
      console.error("Error deleting alumni:", err);
    }
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
              <tr className="ST-tr">
                <th>Name</th>
                <th>Year</th>
                <th>Industry</th>
                <th>Testimonial</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alumniList.map((a) => (
                <tr key={a._id}>
                  <td>{a.name}</td>
                  <td>{a.graduationYear}</td>
                  <td>{a.industry}</td>
                  <td>{a.testimonial}</td>
                  <td>
                    <button onClick={() => handleEdit(a)}>Edit</button>
                    <button onClick={() => handleDelete(a._id)}>Delete</button>
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

export default AdminAlumniNetworking;
