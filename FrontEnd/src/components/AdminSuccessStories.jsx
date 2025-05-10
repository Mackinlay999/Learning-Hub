

import React, { useEffect, useState } from "react";
import axios from "./axios";
import "../style/AdminSuccessStories.css";

const AdminSuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    photo: null,
    LinkedinUrl:""
  });
  const [editId, setEditId] = useState(null);

  // GET all success stories
  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get(`/getAllStories`);
      setStories(res.data);
    } catch (err) {
      console.error("Error fetching stories:", err);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Create or update story
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("company", formData.company);
    data.append("LinkedinUrl", formData.LinkedinUrl);
    if (formData.photo) data.append("photo", formData.photo);

    try {
      if (editId) {
        await axios.put(`/updateStory/${editId}`, data);
      } else {
        await axios.post(`/createStory`, data);
      }
      await fetchStories();
      setEditId(null);
      setFormData({ name: "", company: "", LinkedinUrl:"", photo: null, visible: true });
    } catch (err) {
      console.error("Error submitting story:", err);
    }
  };

  // Edit story
  const handleEdit = (story) => {
    setEditId(story._id);
    setFormData({
      name: story.name,
      company: story.company,
      LinkedinUrl: story.LinkedinUrl,
      visible: story.visible ?? true,
      photo: null,
    });
  };

  // Delete story
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/deleteStory/${id}`);
      setStories(stories.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting story:", err);
    }
  };

  // Toggle visibility
  const handleToggleVisibility = async (id, current) => {
    try {
      await axios.put(`/updateStory/${id}`, {
        visible: !current,
      });
      await fetchStories();
    } catch (err) {
      console.error("Error toggling visibility:", err);
    }
  };

  return (
    <div className="adminsuccess-story-con">
      <h2 className="adminsuccess-story-title">Add / Edit Student Success Story</h2>
      <form onSubmit={handleSubmit} className="adminsuccess-story-form">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Placed At"
          value={formData.company}
          onChange={handleChange}
          required
        />
         <input
          type="text"
          name="LinkedinUrl"
          placeholder="LinkedinUrl"
          value={formData.LinkedinUrl}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
        />
        
        <button type="submit" className="adminsuccess-story-btn">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <h2 className="adminsuccess-subtitle">All Success Stories</h2>
      <div className="adminsuccess-story-list">
        
        {stories.map((story) => (
          <div key={story._id} className="adminsuccess-story-card">
            <div>
            <img
                  // src={story.photo}
                  src={`http://localhost:3000${story.photo}`}
                  alt={story.name}
                   
                  className="adminsuccess-story-photo"
                />
              <p className="adminsuccess-story-name"><span className="adminsuccess-span">Name:</span>    {story.name}</p>
              <p className="adminsuccess-story-name"> <span className="adminsuccess-span">Company:</span> {story.company}</p>
              <p className="adminsuccess-story-name">
  <span className="adminsuccess-span">LinkedinUrl:</span> 
  <a 
    href={story.LinkedinUrl} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="linkedin-link"
  >
    {story.LinkedinUrl}
  </a>
</p>
  </div>
            <div className="adminsuccess-story-actions">
              <button onClick={() => handleEdit(story)} className="adminsuccess-story-edit-btn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(story._id)}
                className="adminsuccess-story-delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSuccessStories;


