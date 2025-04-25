// models/Admin.js
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['Super Admin', 'Admin', 'Analyst', 'Recruiter'],
    default :"Analyst",
    required: true,
  },
  permissions: {
    type: [String],
    enum: ['View Users', 'Edit Users', 'Delete Users', 'Manage Roles', 'Approve Actions'],
    default: [],
  },
  approvalRequired: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Admin", AdminSchema);
