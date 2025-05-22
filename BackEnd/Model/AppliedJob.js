const mongoose = require('mongoose');

const appliedJobSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  company: String,
  location: String,
  status: { type: String, enum: ['Under Review', 'Interview Scheduled', 'Rejected', 'Accepted'], default: 'Under Review' },
  appliedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AppliedJob', appliedJobSchema);
