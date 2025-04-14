const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: String,
  email: { type: String,  },
  password: String,
  
  role: {
    type: String,
    enum: ["Super Admin", "Admin", "Analyst", "Recruiter"],
    default: "Recruiter"
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model('Adminlogin', AdminSchema);
