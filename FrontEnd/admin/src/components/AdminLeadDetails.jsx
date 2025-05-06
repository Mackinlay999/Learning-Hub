import "../style/AdminLeadDetails.css";

const AdminLeadDetails = ({ lead, setSelectedLead }) => {
  if (!lead) return null;
  return (
    <div className="LD-modal">
      <h3>Lead Details</h3>
      <p><strong>Name:</strong> {lead.name}</p>
      <p><strong>Email:</strong> {lead.email}</p>
      <p><strong>Status:</strong> {lead.status}</p>
      <button className="LD-button" onClick={() => alert("Lead Follow-up Assigned!")}>
        Assign Follow-Up
      </button>
        <button className="close-btn" onClick={() => setSelectedLead(null)}>Close</button>
    </div>
  );
};

export default AdminLeadDetails;
