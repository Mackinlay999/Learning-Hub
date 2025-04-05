import React, { useState } from "react";
import "../style/CorporateClientForm.css";

const CorporateClientForm = () => {
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

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setClients(
        clients.map((c) =>
          c.id === editingId ? { ...client, id: editingId } : c
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newClient = { ...client, id: Date.now() };
      setClients([...clients, newClient]);
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
  };

  const deleteClient = (id) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  const editClient = (clientData) => {
    setClient(clientData);
    setIsEditing(true);
    setEditingId(clientData.id);
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
                <tr key={c.id}>
                  <td>{c.companyName}</td>
                  <td>{c.contactPerson}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>
                    {c.contractStartDate} to {c.contractEndDate}
                  </td>
                  <td>{c.status}</td>
                  <td>
                    <button onClick={() => editClient(c)}>Edit</button>{" "}
                    <button onClick={() => deleteClient(c.id)}>Delete</button>
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

export default CorporateClientForm;
