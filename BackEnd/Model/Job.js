// models/Job.js
const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: { type: String, enum: ['Internship', 'Full-time'], required: true },
  company: String,
  location: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Jobs", jobsSchema);
