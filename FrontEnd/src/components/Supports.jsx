import { useState } from "react";
import "../style/Supports.css"

const  Supports = () => {
    const [tickets, setTickets] = useState([
      { id: 1, user: "John Doe", issue: "Login Issue", status: "Open" },
      { id: 2, user: "Jane Smith", issue: "Payment Failure", status: "Resolved" },
    ]);
    const [newTicket, setNewTicket] = useState({ user: "", issue: "" });
  
    const handleAddTicket = () => {
      if (!newTicket.user || !newTicket.issue) return;
      setTickets([...tickets, { id: tickets.length + 1, ...newTicket, status: "Open" }]);
      setNewTicket({ user: "", issue: "" });
    };
  
    return (
      <div className="support">
        <h1 className="page-title">Support & Helpdesk</h1>
        <div className="support-form">
          <input
            type="text"
            placeholder="User Name"
            value={newTicket.user}
            onChange={(e) => setNewTicket({ ...newTicket, user: e.target.value })}
          />
          <input
            type="text"
            placeholder="Issue Description"
            value={newTicket.issue}
            onChange={(e) => setNewTicket({ ...newTicket, issue: e.target.value })}
          />
          <button className="add-ticket" onClick={handleAddTicket}>Submit Ticket</button>
        </div>
        <table className="support-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Issue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.user}</td>
                <td>{ticket.issue}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Supports;