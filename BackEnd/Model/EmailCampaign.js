// models/EmailCampaign.js
const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  content: { type: String, required: true },
});

const emailCampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["Draft", "Active", "Completed"],
    default: "Draft",
  },
  emailsSent: { type: Number, default: 0 },
  emails: [emailSchema],
});

module.exports = mongoose.model("EmailCampaign", emailCampaignSchema);
