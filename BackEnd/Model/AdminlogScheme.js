const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: String,
  email: { type: String,  },
  password: String,
  
  role: {
    type: String,
    enum: ["Super Admin", "Admin", "Analyst", "Recruiter","Mentors"],
    default: "Recruiter"
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model('Adminlogin', AdminSchema);
