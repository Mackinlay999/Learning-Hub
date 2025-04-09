const mongoose = require("mongoose");

const AlumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  industry: { type: String, required: true },
  testimonial: { type: String, required: true },
});

module.exports = mongoose.model("Alumni", AlumniSchema);