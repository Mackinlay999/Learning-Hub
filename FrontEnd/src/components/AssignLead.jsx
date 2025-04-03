import { useState } from "react";
import "../style/AssignLead.css"
const AssignLead = () => {
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <div className="A-assign-lead">
      <h3 className="A-assign-lead-title">Assign Lead</h3>
      <select
        className="A-assign-lead-select"
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select Sales Person</option>
        <option value="Sales1">Sales Team 1</option>
        <option value="Sales2">Sales Team 2</option>
      </select>
      <button
        className="A-assign-lead-button"
        onClick={() => alert(`Lead assigned to ${selectedUser}`)}
      >
        Assign
      </button>
    </div>
  );
};

export default AssignLead;
