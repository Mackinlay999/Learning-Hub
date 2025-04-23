const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    highestQualification: {
      type: String,
    },
    institutionName: {
      type: String,
    },
    graduationYear: {
      type: Number,
    },
    experienceYears: {
      type: Number,
    },
    previousJobTitle: {
      type: String,
    },
    previousCompany: {
      type: String,
    },
    workDescription: {
      type: String,
    },
    skills: {
      type: [String], // Array of skills
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    portfolioUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    whyHire: {
      type: String,
    },
    preferredType: {
      type: String,
      enum: ["Full-time", "Internship"],
    },
    willingToRelocate: {
      type: Boolean,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Applicant", applicantSchema);
