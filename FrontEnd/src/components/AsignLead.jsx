import React, { useState } from "react";
import axios from "axios";

const AssignLead = ({ lead, onUpdate }) => {
  const [assignee, setAssignee] = useState(lead.assignedTo || "");

  const handleAssign = async () => {
    await axios.put(`/api/leads/${lead._id}/assign`, { assignedTo: assignee });
    onUpdate();
  };

  return (
    <div className="my-4">
      <label className="block font-semibold mb-1">Assign to Team:</label>
      <select value={assignee} onChange={(e) => setAssignee(e.target.value)} className="border p-2">
        <option value="">Select</option>
        <option value="John">John</option>
        <option value="Emily">Emily</option>
      </select>
      <button onClick={handleAssign} className="ml-2 bg-green-600 text-white px-3 py-1">Assign</button>
    </div>
  );
};

export default AssignLead;
