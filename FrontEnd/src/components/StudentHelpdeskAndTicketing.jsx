import React, { useState } from "react";
import "../style/StudentHelpdeskAndTicketing.css";

const StudentHelpdeskAndTicketing = () => {
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({
    name: "",
    email: "",
    issue: "",
    status: "Open",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setTickets(
        tickets.map((t) =>
          t.id === editingId ? { ...ticket, id: editingId } : t
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newTicket = { ...ticket, id: Date.now() };
      setTickets([...tickets, newTicket]);
    }
    setTicket({ name: "", email: "", issue: "", status: "Open" });
  };

  const deleteTicket = (id) => {
    setTickets(tickets.filter((t) => t.id !== id));
  };

  const editTicket = (ticket) => {
    setTicket(ticket);
    setIsEditing(true);
    setEditingId(ticket.id);
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
        <button type="submit">{isEditing ? "Update Ticket" : "Submit Ticket"}</button>
      </form>

      <div className="SH-list">
        <h2 className="SH-section-title">Submitted Tickets</h2>
        {tickets.length === 0 ? (
          <p className="SH-empty">No tickets submitted.</p>
        ) : (
          <table className="SH-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.email}</td>
                  <td>{t.issue}</td>
                  <td>{t.status}</td>
                  <td>
                    <button onClick={() => editTicket(t)}>Edit</button>
                    <button onClick={() => deleteTicket(t.id)}>Delete</button>
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
          <li><strong>How do I reset my password?</strong> — Click "Forgot Password" on the login page.</li>
          <li><strong>How do I contact a faculty member?</strong> — Use the Faculty Directory under "Academics".</li>
          <li><strong>Can I edit my submitted ticket?</strong> — Yes, use the Edit button in your ticket list.</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentHelpdeskAndTicketing;
