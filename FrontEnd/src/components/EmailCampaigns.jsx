import { useEffect, useState } from "react";
import axios from "axios";
import "../style/EmailCampaigns.css";

const EmailCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({ name: "", status: "Draft" });
  const [editCampaign, setEditCampaign] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [newEmail, setNewEmail] = useState({ subject: "", content: "" });

  const API_BASE = "http://localhost:3000/api/email-campaigns"; // Change if hosted elsewhere

  // Fetch all campaigns
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCampaigns(res.data);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Handle campaign form change
  const handleCampaignInputChange = (e) => {
    setNewCampaign({ ...newCampaign, [e.target.name]: e.target.value });
  };

  // Add campaign
  const addCampaign = async () => {
    try {
      const res = await axios.post(API_BASE, newCampaign);
      setCampaigns([...campaigns, res.data]);
      setNewCampaign({ name: "", status: "Draft" });
    } catch (err) {
      console.error("Error adding campaign:", err);
    }
  };

  // Delete campaign
  const deleteCampaign = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      setCampaigns(campaigns.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting campaign:", err);
    }
  };

  // Start editing
  const startEditCampaign = (campaign) => {
    setEditCampaign(campaign);
  };

  // Save edited campaign
  const saveCampaignEdit = async () => {
    try {
      const res = await axios.put(`${API_BASE}/${editCampaign._id}`, editCampaign);
      setCampaigns(campaigns.map((c) => (c._id === editCampaign._id ? res.data : c)));
      setEditCampaign(null);
    } catch (err) {
      console.error("Error updating campaign:", err);
    }
  };

  // Select campaign to manage emails
  const openCampaignEmails = (campaign) => {
    setSelectedCampaign(campaign);
    setNewEmail({ subject: "", content: "" });
  };

  // Handle email input
  const handleEmailInputChange = (e) => {
    setNewEmail({ ...newEmail, [e.target.name]: e.target.value });
  };

  // Add new email to selected campaign
  const addEmail = async () => {
    try {
      const res = await axios.post(`${API_BASE}/${selectedCampaign._id}/emails`, newEmail);
      const updatedCampaign = campaigns.map((c) =>
        c._id === selectedCampaign._id ? res.data : c
      );
      setCampaigns(updatedCampaign);
      setSelectedCampaign(res.data); // Update selected campaign with new data
      setNewEmail({ subject: "", content: "" });
    } catch (err) {
      console.error("Error adding email:", err);
    }
  };

  // Delete an email from campaign
  const deleteEmail = async (emailId) => {
    try {
      const res = await axios.delete(`${API_BASE}/${selectedCampaign._id}/emails/${emailId}`);
      const updatedCampaign = campaigns.map((c) =>
        c._id === selectedCampaign._id ? res.data : c
      );
      setCampaigns(updatedCampaign);
      setSelectedCampaign(res.data); // Update selected campaign with new data
    } catch (err) {
      console.error("Error deleting email:", err);
    }
  };

  return (
    <div className="email-campaigns">
      <h2 className="title">Automated Email Campaigns</h2>

      {/* Campaign Form */}
      <div className="campaign-form">
        <input type="text" name="name" placeholder="Campaign Name" value={newCampaign.name} onChange={handleCampaignInputChange} />
        <select name="status" value={newCampaign.status} onChange={handleCampaignInputChange}>
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        <button className="add-campaign" onClick={addCampaign}>Add Campaign</button>
      </div>

      {/* Campaigns Table */}
      <table className="campaign-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Emails Sent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id}>
              <td>
                {editCampaign && editCampaign._id === campaign._id ? (
                  <input
                    type="text"
                    value={editCampaign.name}
                    onChange={(e) => setEditCampaign({ ...editCampaign, name: e.target.value })}
                  />
                ) : (
                  campaign.name
                )}
              </td>
              <td>{campaign.status}</td>
              <td>{campaign.emailsSent}</td>
              <td>
                {editCampaign && editCampaign._id === campaign._id ? (
                  <button className="save" onClick={saveCampaignEdit}>Save</button>
                ) : (
                  <>
                    <button className="edit" onClick={() => startEditCampaign(campaign)}>Edit</button>
                    <button className="delete" onClick={() => deleteCampaign(campaign._id)}>Delete</button>
                    <button className="manage-emails" onClick={() => openCampaignEmails(campaign)}>Manage Emails</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Email Management */}
      {selectedCampaign && (
        <div className="email-management">
          <h3>Manage Emails for "{selectedCampaign.name}"</h3>

          {/* Add New Email Form */}
          <div className="email-form">
            <input type="text" name="subject" placeholder="Email Subject" value={newEmail.subject} onChange={handleEmailInputChange} />
            <textarea name="content" placeholder="Email Content" value={newEmail.content} onChange={handleEmailInputChange}></textarea>
            <button onClick={addEmail}>Add Email</button>
          </div>

          {/* Emails Table */}
          <table className="email-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedCampaign.emails.map((email) => (
                <tr key={email._id}>
                  <td>{email.subject}</td>
                  <td>{email.content}</td>
                  <td>
                    <button className="delete" onClick={() => deleteEmail(email._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="close-emails" onClick={() => setSelectedCampaign(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default EmailCampaigns;
