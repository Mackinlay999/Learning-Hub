import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/AdminManagement.css";

const API_URL = "http://localhost:3000/api/admins"; // replace with your backend

const roles = ['Super Admin', 'Admin', 'Analyst', 'Support Staff'];
const permissions = ['View Users', 'Edit Users', 'Delete Users', 'Manage Roles', 'Approve Actions'];

function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    permissions: [],
    approvalRequired: false
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(API_URL);
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
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchAdmins();
      resetForm();
    } catch (error) {
      console.error("Error saving admin:", error);
    }
  };

  const handleEdit = (admin) => {
    setFormData(admin);
    setEditId(admin._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchAdmins();
      } catch (error) {
        console.error("Error deleting admin:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: '',
      permissions: [],
      approvalRequired: false
    });
    setEditId(null);
  };

  return (
    <div className="AD-container">
      <h1>User & Role Management</h1>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="name"
          value={formData.name}
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

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <div className="permissions">
          <p>Assign Permissions:</p>
          {permissions.map((perm) => (
            <label key={perm}>
              <input
                type="checkbox"
                name="permissions"
                value={perm}
                checked={formData.permissions.includes(perm)}
                onChange={handleChange}
              />
              {perm}
            </label>
          ))}
        </div>

        <label>
          <input
            type="checkbox"
            name="approvalRequired"
            checked={formData.approvalRequired}
            onChange={handleChange}
          />
          Requires Approval Workflow
        </label>

        <button type="submit">
          {editId ? 'Update' : 'Add'} Admin
        </button>
      </form>

      <table>
        <thead>
          <tr className='ad-tr'>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Approval</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td data-label="Name">{admin.name}</td>
              <td data-label="Email">{admin.email}</td>
              <td data-label="Role">{admin.role}</td>
              <td data-label="Permissions">{admin.permissions.join(', ')}</td>
              <td data-label="Approval">{admin.approvalRequired ? 'Yes' : 'No'}</td>
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
