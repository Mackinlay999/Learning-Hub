import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/AdminStudentHelpdeskAndTicketing.css";

const API_URL = "https://learning-hub-p2yq.onrender.com/api/tickets"; // change if deployed

const AdminStudentHelpdeskAndTicketing = () => {
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({
    name: "",
    email: "",
    phone: "", // ← Add this
    issue: "",
    status: "Open",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(API_URL);
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editingId}`, ticket);
      } else {
        await axios.post(API_URL, ticket);
      }
      setTicket({ name: "", email: "", issue: "", status: "Open" });
      setIsEditing(false);
      setEditingId(null);
      fetchTickets();
    } catch (err) {
      console.error("Error submitting ticket:", err);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTickets();
    } catch (err) {
      console.error("Error deleting ticket:", err);
    }
  };

  const editTicket = (t) => {
    setTicket(t);
    setIsEditing(true);
    setEditingId(t._id);
  };

  return (
    <div className="SH-main">
      <h1 className="SH-title">🎓 Student Helpdesk & Ticketing System</h1>
      <p className="SH-subtitle">
        Chat support, ticket escalation, FAQs & Knowledge Base
      </p>

      <form onSubmit={handleSubmit} className="SH-form">
        <input
          name="name"
          placeholder="Your Name"
          value={ticket.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={ticket.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={ticket.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="issue"
          placeholder="Describe your issue..."
          value={ticket.issue}
          onChange={handleChange}
          required
        />
        <select name="status" value={ticket.status} onChange={handleChange}>
          <option>Open</option>
          <option>In Progress</option>
          <option>Escalated</option>
          <option>Resolved</option>
        </select>
        <button type="submit">
          {isEditing ? "Update Ticket" : "Submit Ticket"}
        </button>
      </form>

      <div className="SH-list">
        <h2 className="SH-section-title">Submitted Tickets</h2>
        {tickets.length === 0 ? (
          <p className="SH-empty">No tickets submitted.</p>
        ) : (
          <table className="SH-table">
            <thead>
              <tr className="ST-tr">
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t._id}>
                  <td>{t.name}</td>
                  <td>{t.email}</td>
                  <td>{t.phone}</td>

                  <td>{t.issue}</td>
                  <td>{t.status}</td>
                  <td>
                    <button onClick={() => editTicket(t)}>Edit</button>
                    <button onClick={() => deleteTicket(t._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="SH-faq">
        <h2>📚 FAQs & Knowledge Base</h2>
        <ul>
          <li>
            <strong>How do I reset my password?</strong> — Click "Forgot
            Password" on the login page.
          </li>
          <li>
            <strong>How do I contact a faculty member?</strong> — Use the
            Faculty Directory under "Academics".
          </li>
          <li>
            <strong>Can I edit my submitted ticket?</strong> — Yes, use the Edit
            button in your ticket list.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminStudentHelpdeskAndTicketing;
