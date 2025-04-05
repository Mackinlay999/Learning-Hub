import { useState } from "react";
import LeadDetails from "./LeadDetails";
import LeadForm from "./LeadForm";
import "../style/LeadList.css";

const LeadList = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Hot" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Warm" },
    { id: 3, name: "Mike Ross", email: "mike@example.com", status: "Cold" },
  ]);

  const [filter, setFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  // Create
  const addLead = (newLead) => {
    const newId = leads.length > 0 ? leads[leads.length - 1].id + 1 : 1;
    setLeads([...leads, { id: newId, ...newLead }]);
  };

  // Delete
  const deleteLead = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  // Update
  const updateLead = (updatedLead) => {
    setLeads(
      leads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
    setIsEditing(false);
    setEditingLead(null);
  };

  const filteredLeads =
    filter === "All" ? leads : leads.filter((lead) => lead.status === filter);

  return (
    <div className="container">
      <h2>Lead List</h2>

      <LeadForm
        addLead={addLead}
        isEditing={isEditing}
        editingLead={editingLead}
        updateLead={updateLead}
      />

      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Hot">Hot</option>
        <option value="Warm">Warm</option>
        <option value="Cold">Cold</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.status}</td>
              <td>
                <button onClick={() => setSelectedLead(lead)}>View</button>
                <button
                  onClick={() => {
                    setEditingLead(lead);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteLead(lead.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLead && (
        <div className="modal-container">
          <LeadDetails lead={selectedLead} setSelectedLead={setSelectedLead} />
        </div>
      )}
    </div>
  );
};

export default LeadList;
