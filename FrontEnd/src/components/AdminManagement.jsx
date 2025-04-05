import React, { useState, useEffect } from 'react';
import "../style/AdminManagement.css";

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
  const [editIndex, setEditIndex] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const storedAdmins = localStorage.getItem('admins');
    if (storedAdmins) {
      setAdmins(JSON.parse(storedAdmins));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('admins', JSON.stringify(admins));
  }, [admins]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedAdmins = [...admins];
      updatedAdmins[editIndex] = formData;
      setAdmins(updatedAdmins);
      setEditIndex(null);
    } else {
      setAdmins([...admins, formData]);
    }

    setFormData({
      name: '',
      email: '',
      role: '',
      permissions: [],
      approvalRequired: false
    });
  };

  const handleEdit = (index) => {
    setFormData(admins[index]);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      const updatedAdmins = admins.filter((_, i) => i !== index);
      setAdmins(updatedAdmins);
    }
  };

  return (
    <div className="container">
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
          {editIndex !== null ? 'Update' : 'Add'} Admin
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Approval</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={index}>
              <td data-label="Name">{admin.name}</td>
              <td data-label="Email">{admin.email}</td>
              <td data-label="Role">{admin.role}</td>
              <td data-label="Permissions">{admin.permissions.join(', ')}</td>
              <td data-label="Approval">{admin.approvalRequired ? 'Yes' : 'No'}</td>
              <td data-label="Actions">
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManagement;
