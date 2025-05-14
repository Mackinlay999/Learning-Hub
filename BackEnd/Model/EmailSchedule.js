// models/EmailSchedule.js
const mongoose = require('mongoose');

const emailScheduleSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  email: String,
  subject: String,
  content: String,
  sendAt: Date,
  sent: { type: Boolean, default: false },
});

module.exports = mongoose.model('EmailSchedule', emailScheduleSchema);
