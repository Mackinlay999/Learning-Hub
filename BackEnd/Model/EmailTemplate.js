// models/EmailTemplate.js
const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  subject: String,
  content: String,
  delayInMinutes: Number, // e.g. 10 for 10min, 1440 for 1 day
});

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);
