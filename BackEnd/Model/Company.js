// models/Company.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  logoUrl: String,
  description: String,
  website: String,
});

module.exports = mongoose.model("Company", companySchema);
