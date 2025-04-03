import { useState } from "react";
import LeadDetails from "./LeadDetails";
import LeadForm from "./LeadForm"; // Import LeadForm
import "../style/LeadList.css";

const LeadList = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Hot" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Warm" },
    { id: 3, name: "Mike Ross", email: "mike@example.com", status: "Cold" },
  ]);

  const [filter, setFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);

  // Function to add a new lead
  const addLead = (newLead) => {
    setLeads([...leads, { id: leads.length + 1, ...newLead }]);
  };

  const filteredLeads = filter === "All" ? leads : leads.filter((lead) => lead.status === filter);

  return (
    <div className="container">
      <h2>Lead List</h2>

      {/* Add New Lead Form */}
      {/* <LeadForm addLead={addLead} /> */}
      
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show LeadDetails as a modal */}
      {selectedLead && (
        <div className="modal-container">
          <LeadDetails lead={selectedLead} setSelectedLead={setSelectedLead} />
        </div>
      )}
    </div>
  );
};

export default LeadList;
