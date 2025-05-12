import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/AdminCorporateClientForm.css";

const AdminCorporateClientForm = () => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    contractStartDate: "",
    contractEndDate: "",
    status: "Pending",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://learning-hub-p2yq.onrender.com/api/clients"; // update with your backend URL if hosted

  // Fetch clients from backend
  const fetchClients = async () => {
    try {
      const res = await axios.get(API_URL);
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  // Submit form - Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editingId}`, client);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await axios.post(API_URL, client);
      }
      setClient({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        contractStartDate: "",
        contractEndDate: "",
        status: "Pending",
      });
      fetchClients(); // Refresh list
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  // Delete client
  const deleteClient = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchClients();
    } catch (err) {
      console.error("Error deleting client:", err);
    }
  };

  // Set form for editing
  const editClient = (clientData) => {
    setClient(clientData);
    setIsEditing(true);
    setEditingId(clientData._id);
  };

  return (
    <div className="CT-main">
      <h1 className="CT-title">Corporate Training & Enterprise Solutions</h1>
      <h2 className="CT-subtitle">✅ Corporate Enrollment Management</h2>
      <p className="CT-description">
        Track B2B training contracts & client accounts.
        <br />
        Assign corporate-specific courses & training schedules.
      </p>

      <form onSubmit={handleSubmit} className="CT-form">
        <input
          name="companyName"
          placeholder="Company Name"
          value={client.companyName}
          onChange={handleChange}
          required
        />
        <input
          name="contactPerson"
          placeholder="Contact Person"
          value={client.contactPerson}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={client.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={client.phone}
          onChange={handleChange}
          required
        />
        <input
          name="contractStartDate"
          type="date"
          value={client.contractStartDate}
          onChange={handleChange}
          required
        />
        <input
          name="contractEndDate"
          type="date"
          value={client.contractEndDate}
          onChange={handleChange}
          required
        />
        <select name="status" value={client.status} onChange={handleChange}>
          <option>Pending</option>
          <option>Active</option>
          <option>Expired</option>
        </select>
        <button type="submit">
          {isEditing ? "Update Client" : "Add Client"}
        </button>
      </form>

      <div className="CT-list">
        <h2 className="CT-section-title">Corporate Clients</h2>
        {clients.length === 0 ? (
          <p className="CT-empty">No clients added yet.</p>
        ) : (
          <table className="CT-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Contract Period</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c._id}>
                  <td>{c.companyName}</td>
                  <td>{c.contactPerson}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    {c.contractStartDate?.slice(0, 10)} to{" "}
                    {c.contractEndDate?.slice(0, 10)}
                  </td>
                  <td>{c.status}</td>
                  <td>
                    <button onClick={() => editClient(c)}>Edit</button>{" "}
                    <button onClick={() => deleteClient(c._id)}>Delete</button>
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

export default AdminCorporateClientForm;
