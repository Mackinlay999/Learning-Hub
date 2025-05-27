// src/components/WebinarManager.jsx
import React, { useEffect, useState } from 'react';
import axios from "./axios";
import "../style/Adminwebinar.css"

const WebinarManager = () => {
  const [webinars, setWebinars] = useState([]);
  const [form, setForm] = useState({
    webinarTitle: '',
    webinarDateTime: '',
    webinarDescription: '',
    webinarLink: '',
    typeOfProgram: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all webinars
  const fetchWebinars = async () => {
    try {
      const res = await axios.get('/getAllWebinars');
      setWebinars(res.data);
    } catch (err) {
      alert('Error fetching webinars');
    }
  };

  useEffect(() => {
    fetchWebinars();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/updateWebinar/${editingId}`, form);
        alert('Webinar updated');
      } else {
        await axios.post('/createWebinar', form);
        alert('Webinar created');
      }
      setForm({
        webinarTitle: '',
        webinarDateTime: '',
        webinarDescription: '',
        webinarLink: '',
        typeOfProgram: ''
      });
      setEditingId(null);
      fetchWebinars();
    } catch (err) {
      alert('Error: ' + err.response?.data?.message || err.message);
    }
  };

  // Edit a webinar
  const handleEdit = (webinar) => {
    setForm(webinar);
    setEditingId(webinar._id);
  };

  // Delete a webinar
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this webinar?')) {
      try {
        await axios.delete(`/deleteWebinar/${id}`);
        alert('Webinar deleted');
        fetchWebinars();
      } catch (err) {
        alert('Error deleting webinar');
      }
    }
  };

// ...rest of your imports and code

return (
  <div className="Adminwebinar-container">
    <h2 className="Adminwebinar-heading">{editingId ? 'Edit Webinar' : 'Create Webinar'}</h2>
    <form className="Adminwebinar-form" onSubmit={handleSubmit}>
      <input
        className="Adminwebinar-input"
        name="webinarTitle"
        placeholder="Webinar Title"
        value={form.webinarTitle}
        onChange={handleChange}
        required
      />
      <input
        className="Adminwebinar-input"
        type="datetime-local"
        name="webinarDateTime"
        value={form.webinarDateTime?.slice(0, 16)}
        onChange={handleChange}
        required
      />
      <input
        className="Adminwebinar-input"
        name="webinarDescription"
        placeholder="Webinar Description"
        value={form.webinarDescription}
        onChange={handleChange}
        required
      />
      <input
        className="Adminwebinar-input"
        name="webinarLink"
        placeholder="Webinar Link"
        value={form.webinarLink}
        onChange={handleChange}
        required
      />
      <input
        className="Adminwebinar-input"
        name="typeOfProgram"
        placeholder="Type of Program"
        value={form.typeOfProgram}
        onChange={handleChange}
        required
      />
      <button className="Adminwebinar-button" type="submit">
        {editingId ? 'Update' : 'Create'}
      </button>
    </form>

    <hr className="Adminwebinar-divider" />

    <h2 className="Adminwebinar-heading">All Webinars</h2>
    {webinars.length === 0 ? (
      <p className="Adminwebinar-no-webinars">No webinars found.</p>
    ) : (
      <ul className="Adminwebinar-list">
        {webinars.map((w) => (
          <li key={w._id} className="Adminwebinar-list-item">
            <strong>{w.webinarTitle}</strong> — {new Date(w.webinarDateTime).toLocaleString()}
            <div>{w.webinarDescription}</div>
            <div>
              <a href={w.webinarLink} target="_blank" rel="noreferrer" className="Adminwebinar-link">
                Join Link
              </a>
            </div>
            <div>Type: {w.typeOfProgram}</div>
            <button className="Adminwebinar-edit-button" onClick={() => handleEdit(w)}>Edit</button>
            <button
              className="Adminwebinar-delete-button"
              onClick={() => handleDelete(w._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

};

export default WebinarManager;
