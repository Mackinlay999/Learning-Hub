const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Lead = mongoose.model('LeadEmail', leadSchema);

module.exports = Lead;
