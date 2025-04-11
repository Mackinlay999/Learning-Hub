import { useState } from "react";
import "../style/DUser.css";

const DUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  const [editUser, setEditUser] = useState(null);

  // Handle input changes for new or edited user
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editUser) {
      setEditUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add a new user
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ name: "", email: "", role: "User" });
  };

  // Start editing a user
  const handleEdit = (user) => {
    setEditUser(user);
  };

  // Save the edited user
  const handleSaveEdit = () => {
    setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
    setEditUser(null);
  };

  // Delete a user
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="users">
      <h1 className="page-title">User Management</h1>

      {/* Add / Edit User Form */}
      <div className="user-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={editUser ? editUser.name : newUser.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={editUser ? editUser.email : newUser.email}
          onChange={handleChange}
        />
        <select name="role" value={editUser ? editUser.role : newUser.role} onChange={handleChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        {editUser ? (
          <button className="save-user" onClick={handleSaveEdit}>Save Changes</button>
        ) : (
          <button className="add-user" onClick={handleAddUser}>Add User</button>
        )}
      </div>

      {/* Users Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(user)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DUsers;
