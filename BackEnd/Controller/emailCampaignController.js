// controllers/emailCampaignController.js
const EmailCampaign = require("../Model/EmailCampaign.js");

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await EmailCampaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new campaign
exports.createCampaign = async (req, res) => {
  const { name, status } = req.body;
  try {
    const newCampaign = new EmailCampaign({ name, status });
    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update campaign
exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  try {
    const updated = await EmailCampaign.findByIdAndUpdate(
      id,
      { name, status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete campaign
exports.deleteCampaign = async (req, res) => {
  try {
    await EmailCampaign.findByIdAndDelete(req.params.id);
    res.json({ message: "Campaign deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add email to campaign
exports.addEmailToCampaign = async (req, res) => {
  const { id } = req.params;
  const { subject, content } = req.body;
  try {
    const campaign = await EmailCampaign.findById(id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    campaign.emails.push({ subject, content });
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete email from campaign
exports.deleteEmailFromCampaign = async (req, res) => {
  const { campaignId, emailId } = req.params;
  try {
    const campaign = await EmailCampaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    campaign.emails = campaign.emails.filter((e) => e._id.toString() !== emailId);
    await campaign.save();
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
