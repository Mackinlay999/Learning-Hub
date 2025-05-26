const mongoose = require("mongoose");

const RecruiterJobSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recruiter',
    required: true
  },
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { type: String, required: true },
  workplaceType: { type: String, required: true },
  industry: { type: String },
  experienceLevel: { type: String },
  salaryRange: { type: String },
  jobDescription: { type: String, required: true },
  skillsRequired: { type: String },
  applicationDeadline: { type: Date },
  applicationLink: { type: String }, // new field for apply link
  contactEmail: { type: String, required: true },
  jobBenefits: { type: String },
  vacancies: { type: Number, default: 1 },
  educationRequirements: { type: String },
  companyLogo: { type: String },              
  companyWebsite: { type: String },       
  postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RecruiterJob', RecruiterJobSchema);
