import { useState, useEffect, useRef } from "react";
import axios from "./axios";
import "../style/AdminLeadList.css";

const AdminLeadList = () => {
  const formRef = useRef(null);
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    number: "",
    program: "",
    Joiningtime: "",
    status: "",
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("/getLeads");
      setLeads(res.data);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    }
  };

  const handleChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const res = await axios.put(`/updateLead/${editingLead._id}`, leadData);
        setLeads(
          leads.map((lead) => (lead._id === editingLead._id ? res.data : lead))
        );
        setIsEditing(false);
        setEditingLead(null);
      } else {
        const res = await axios.post("/createLead", leadData);
        setLeads([...leads, res.data]);
      }
      setLeadData({
        name: "",
        email: "",
        number: "",
        program: "",
        Joiningtime :"",
        status: "",
      });
    } catch (err) {
      console.error("Failed to save lead", err);
    }
  };

  const deleteLead = async (id) => {
    try {
      await axios.delete(`/deleteLead/${id}`);
      setLeads(leads.filter((lead) => lead._id !== id));
    } catch (err) {
      console.error("Failed to delete lead", err);
    }
  };

  const startEdit = (lead) => {
    setEditingLead(lead);
    setIsEditing(true);
    setLeadData(lead);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredLeads =
    filter === "All"
      ? leads
      : leads.filter((lead) => lead.status === filter);

  return (
    <div className="LL-container">
      <h2>Lead Management</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} ref={formRef}>
        <input
          name="name"
          placeholder="Name"
          value={leadData.name}
          onChange={handleChange}
          required
          className="L-input"
        />
        <input
          name="email"
          placeholder="Email"
          value={leadData.email}
          onChange={handleChange}
          required
          className="L-input"
        />
        <input
          name="number"
          placeholder="Phone Number"
          value={leadData.number}
          onChange={handleChange}
          required
          maxLength={10}
          className="L-input"
        />
        <select name="program" value={leadData.program} onChange={handleChange} className="L-section" required>
  <option value="">What Training Program Do You Need?</option>
  <option value="HR">HR</option>
  <option value="Marketing">Marketing</option>
  <option value="Sales">Sales</option>
  <option value="Business Analyst">Business Analyst</option>
  <option value="Finance">Finance</option>
</select>



<select name="Joiningtime" value={leadData.Joiningtime} className="L-section" onChange={handleChange} required>
  <option value="">Preferred Joining Time</option>
  <option value="This month">This month</option>
  <option value="Next month">Next month</option>
  <option value="After 3 months">After 3 months</option>
  <option value="After 6 months">After 6 months</option>
</select>

        
        <select name="status" value={leadData.status} onChange={handleChange} className="L-section">
        <option value="Status">Status</option>
          <option value="Interested">Interest</option>
          <option value="not interest">Not Interest</option>
          
        </select>
        <button className="d-btn" type="submit">
          {isEditing ? "Update Lead" : "Add Lead"}
        </button>
      </form>

      {/* FILTER */}
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Interested">Interest</option>
        <option value="not interest">Not Interest</option>
      </select>

      {/* TABLE */}
      <table>
        <thead>
          <tr className="LL-tr">
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Program</th>
            <th>Action</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.number}</td>
              <td>{lead.program}</td>
              <td>{lead.Joiningtime}</td>
              <td>{lead.status}</td>
              <td>
                <button className="ld-bnt" onClick={() => setSelectedLead(lead)}>
                  View
                </button>
                <button className="ld-bnt" onClick={() => startEdit(lead)}>
                  Edit
                </button>
                <button className="ld-bnt" onClick={() => deleteLead(lead._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {selectedLead && (
        <div className="modal-container">
          <div className="modal-content">
            <h3>Lead Details</h3>
            <p><strong>Name:</strong> {selectedLead.name}</p>
            <p><strong>Email:</strong> {selectedLead.email}</p>
            <p><strong>Number:</strong> {selectedLead.number}</p>
            <p><strong>Program</strong> {selectedLead.program}</p>
            <p><strong>Joining Time</strong> {selectedLead.Joiningtime}</p>
            <p><strong>Status:</strong> {selectedLead.status}</p>
            <button onClick={() => setSelectedLead(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeadList;
