import { useState } from "react";
import "../style/EmailCampaigns.css";

const EmailCampaigns = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Welcome Series",
      status: "Active",
      emailsSent: 120,
      emails: [{ id: 1, subject: "Welcome to our platform!", content: "Hello, we are excited to have you!" }],
    },
    {
      id: 2,
      name: "Course Follow-Up",
      status: "Draft",
      emailsSent: 50,
      emails: [{ id: 1, subject: "Your course has started!", content: "Check your dashboard for new lessons." }],
    },
  ]);

  const [newCampaign, setNewCampaign] = useState({ name: "", status: "Draft" });
  const [editCampaign, setEditCampaign] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [newEmail, setNewEmail] = useState({ subject: "", content: "" });

  // Handle input for new campaign
  const handleCampaignInputChange = (e) => {
    setNewCampaign({ ...newCampaign, [e.target.name]: e.target.value });
  };

  // Add new campaign
  const addCampaign = () => {
    if (!newCampaign.name) return;
    setCampaigns([...campaigns, { id: campaigns.length + 1, ...newCampaign, emailsSent: 0, emails: [] }]);
    setNewCampaign({ name: "", status: "Draft" });
  };

  // Delete campaign
  const deleteCampaign = (id) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  // Start editing campaign
  const startEditCampaign = (campaign) => {
    setEditCampaign(campaign);
  };

  // Save campaign edits
  const saveCampaignEdit = () => {
    setCampaigns(campaigns.map((c) => (c.id === editCampaign.id ? editCampaign : c)));
    setEditCampaign(null);
  };

  // Select campaign to manage emails
  const openCampaignEmails = (campaign) => {
    setSelectedCampaign(campaign);
    setNewEmail({ subject: "", content: "" });
  };

  // Handle input for new email
  const handleEmailInputChange = (e) => {
    setNewEmail({ ...newEmail, [e.target.name]: e.target.value });
  };

  // Add new email to selected campaign
  const addEmail = () => {
    if (!newEmail.subject || !newEmail.content) return;
    setCampaigns(
      campaigns.map((c) =>
        c.id === selectedCampaign.id
          ? { ...c, emails: [...c.emails, { id: c.emails.length + 1, ...newEmail }] }
          : c
      )
    );
    setNewEmail({ subject: "", content: "" });
  };

  // Delete an email from the campaign
  const deleteEmail = (emailId) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === selectedCampaign.id ? { ...c, emails: c.emails.filter((e) => e.id !== emailId) } : c
      )
    );
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
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Emails Sent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td>{campaign.id}</td>
              <td>
                {editCampaign && editCampaign.id === campaign.id ? (
                  <input type="text" value={editCampaign.name} onChange={(e) => setEditCampaign({ ...editCampaign, name: e.target.value })} />
                ) : (
                  campaign.name
                )}
              </td>
              <td>{campaign.status}</td>
              <td>{campaign.emailsSent}</td>
              <td>
                {editCampaign && editCampaign.id === campaign.id ? (
                  <button className="save" onClick={saveCampaignEdit}>Save</button>
                ) : (
                  <>
                    <button className="edit" onClick={() => startEditCampaign(campaign)}>Edit</button>
                    <button className="delete" onClick={() => deleteCampaign(campaign.id)}>Delete</button>
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
                <th>ID</th>
                <th>Subject</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedCampaign.emails.map((email) => (
                <tr key={email.id}>
                  <td>{email.id}</td>
                  <td>{email.subject}</td>
                  <td>{email.content}</td>
                  <td>
                    <button className="delete" onClick={() => deleteEmail(email.id)}>Delete</button>
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
