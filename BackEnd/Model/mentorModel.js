const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  courses: { type: String, required: true },
  sessions: { type: String },
  feedback: { type: String },
});

const Mentor = mongoose.model('Mentor', mentorSchema);


module.exports = Mentor;
