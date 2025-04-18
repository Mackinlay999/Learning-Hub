// models/Applicant.js
const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resume: String,
  status: { type: String, enum: ["Applied", "Shortlisted", "Rejected", "Interview Scheduled"], default: "Applied" },
  interviewDate: Date,
});

module.exports = mongoose.model("Applicant", applicantSchema);
