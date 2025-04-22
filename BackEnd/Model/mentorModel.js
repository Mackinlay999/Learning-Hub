const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive", "Retired"], default: "Active" },
  photo: { type: String },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  sessions: { type: String },
  feedback: { type: String },
}, { timestamps: true });

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
