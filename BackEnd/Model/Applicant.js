// models/Applicant.js
const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Applicant", // replace with actual model name
    required: true,
  },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resume: String,
  status: { type: String, enum: ["Applied", "Shortlisted", "Rejected", "Interview Scheduled"], default: "Applied" },
  interviewDate: Date,
});

module.exports = mongoose.model("Applicant", applicantSchema);
