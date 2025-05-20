


import React, { useState, useEffect } from 'react';
import axios from './axios';
import "../style/AdminManagement.css";

const roles = ['Super Admin', 'Admin', 'Mentors', 'Recruiter']; 

function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAdmins();
  
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`/admin/alluser`);
      console.log("Fetched Admins:", res.data);  // Debugging log
      setAdmins(res.data);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'permissions') {
      const updatedPermissions = checked
        ? [...formData.permissions, value]
        : formData.permissions.filter((perm) => perm !== value);
      setFormData({ ...formData, permissions: updatedPermissions });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editId) {
        // Update admin
        console.log("Updating admin with ID:", editId);  // Debugging log
        const res = await axios.put(
          `/admin/update-role`,
          {
            id: editId,
            username: formData.username,
            email: formData.email,
            role: formData.role,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Update response:", res);  // Debugging log
      } else {
        // Create new admin
        await axios.post(`/admin/register`, formData);
      }
      fetchAdmins();  // Refresh the list
      resetForm();
    } catch (error) {
      console.error("Error saving admin:", error);
    }
  };

  const handleEdit = (admin) => {
    console.log("Editing admin:", admin);  // Debugging log
    setFormData({
      username: admin.username || '',
      email: admin.email || '',
      role: admin.role || '',
    });
    setEditId(admin._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this admin?")) {
  //     try {
  //       console.log("Deleting admin with ID:", id);  // Debugging log
  //       await axios.delete(`/admin/deleteUser/${id}`, {
  //         data: { userIdToDelete: id },
  //         withCredentials: true,
  //       });
  //       fetchAdmins();  // Refresh the list
  //     } catch (error) {
  //       console.error("Error deleting admin:", error);
  //     }
  //   }
  // };
const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this admin?")) {
    try {
      const token = localStorage.getItem("token");  // get token from localStorage
      console.log("Deleting admin with ID:", id);

      await axios.delete(`/admin/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // add bearer token header
        },
        withCredentials: true,  // if your backend uses cookies as well
      });

      fetchAdmins();  // Refresh the list
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  }
};





  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      role: '',
    });
    setEditId(null);
  };

  return (
    <div className="AD-container">
      <h1>User & Role Management</h1>

      {/* Show form only when editing */}
      {editId !== null && (
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <button type="submit">
            {editId ? 'Update' : 'Add'} Admin
          </button>
        </form>
      )}

      <table>
        <thead>
          <tr className="ad-tr">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td data-label="Name">{admin.username}</td>
              <td data-label="Email">{admin.email}</td>
              <td data-label="Role">{admin.role}</td>
              <td data-label="Actions">
                <button onClick={() => handleEdit(admin)}>Edit</button>
                <button onClick={() => handleDelete(admin._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManagement;
