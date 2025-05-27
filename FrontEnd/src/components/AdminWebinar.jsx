// src/components/WebinarManager.jsx
import React, { useEffect, useState } from 'react';
import axios from "./axios";

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

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>{editingId ? 'Edit Webinar' : 'Create Webinar'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="webinarTitle"
          placeholder="Webinar Title"
          value={form.webinarTitle}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="webinarDateTime"
          value={form.webinarDateTime?.slice(0, 16)}
          onChange={handleChange}
          required
        />
        <input
          name="webinarDescription"
          placeholder="Webinar Description"
          value={form.webinarDescription}
          onChange={handleChange}
          required
        />
        <input
          name="webinarLink"
          placeholder="Webinar Link"
          value={form.webinarLink}
          onChange={handleChange}
          required
        />
        <input
          name="typeOfProgram"
          placeholder="Type of Program"
          value={form.typeOfProgram}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ marginTop: '10px' }}>
          {editingId ? 'Update' : 'Create'}
        </button>
      </form>

      <hr />

      <h2>All Webinars</h2>
      {webinars.length === 0 ? (
        <p>No webinars found.</p>
      ) : (
        <ul>
          {webinars.map((w) => (
            <li key={w._id} style={{ marginBottom: '15px' }}>
              <strong>{w.webinarTitle}</strong> —{' '}
              {new Date(w.webinarDateTime).toLocaleString()}
              <div>{w.webinarDescription}</div>
              <div>
                <a href={w.webinarLink} target="_blank" rel="noreferrer">
                  Join Link
                </a>
              </div>
              <div>Type: {w.typeOfProgram}</div>
              <button onClick={() => handleEdit(w)}>Edit</button>
              <button onClick={() => handleDelete(w._id)} style={{ marginLeft: '10px' }}>
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
