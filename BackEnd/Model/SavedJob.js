const mongoose = require('mongoose');

const savedJobSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  company: String,
  location: String,
  type: String,
  savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SavedJob', savedJobSchema);
