const Campaign = require('../Model/CampaignScheme');
const sendEmail = require('../Utils/Mailer');

// CREATE Campaign and send mail
const compainsController ={
    createCampaign: async (req, res) => {
      console.log("create companis")
        try {
          let { subject, body, recipients } = req.body;
      
          // If recipients is a single string, convert to array
          if (typeof recipients === 'string') {
            recipients = [recipients];
          }
      
          if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
            return res.status(400).json({ message: 'No recipients defined' });
          }
      
          const campaign = await Campaign.create({ subject, body, recipients });
      
          // Send emails to each recipient
          for (const email of recipients) {
            await sendEmail(email, subject, body);
          }
      
          res.status(201).json({ message: '✅ Campaign created and emails sent', campaign });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      },
      

// GET all campaigns
getCampaigns : async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},
updateCampaign: async (req, res) => {
    try {
      const { id } = req.params; // Get the campaign ID from the request parameters
      const { subject, body, recipients } = req.body;

      // If recipients is a single string, convert to array
      if (typeof recipients === 'string') {
        recipients = [recipients];
      }

      if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({ message: 'No recipients defined' });
      }

      // Find the campaign by ID and update it
      const campaign = await Campaign.findByIdAndUpdate(
        id,
        { subject, body, recipients },
        { new: true } // Returns the updated campaign document
      );

      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }

      // Optionally, send emails to updated recipients (only if needed)
      for (const email of recipients) {
        await sendEmail(email, subject, body);
      }

      res.status(200).json({ message: '✅ Campaign updated and emails sent', campaign });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // DELETE Campaign
  deleteCampaign: async (req, res) => {
    try {
      const { id } = req.params; // Get the campaign ID from the request parameters

      // Find the campaign by ID and delete it
      const campaign = await Campaign.findByIdAndDelete(id);

      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }

      res.status(200).json({ message: '✅ Campaign deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  createLeademail :async (req, res) => {
    try {
      const { name, email } = req.body;
      const newLead = new Lead({ name, email });
      await newLead.save();
      res.status(201).json(newLead);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}
module.exports = compainsController
