// models/Company.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String },
  description: { type: String },
  about: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  linkedin: { type: String },
  website: { type: String }
});

module.exports = mongoose.model("Company", companySchema);
