const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["Full-time", "Part-time", "Internship", "Remote"], required: true },
  description: String,
  requirements: String,
  duration: String,
  startDate: Date,
  endDate: Date,
  stipend: String,
  deadline: Date,
  openings: Number,
  location: String,
  skills: [String],
  experience: String,
  applyLink: String,
  company: {
    name: String,
    logoUrl: String,
    website: String,
    email: String
  }
});

module.exports = mongoose.model("Jobs", jobsSchema);
