const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  // applicantId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Applicant",
  //   required: true,
  // },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Applied", "Shortlisted", "Rejected", "Interview Scheduled"],
    default: "Applied",
  },
  interviewDate: Date,
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

module.exports = mongoose.model("Applicant", applicantSchema);
