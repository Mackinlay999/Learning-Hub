const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  recipients: [{ type: String, required: true }]
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
