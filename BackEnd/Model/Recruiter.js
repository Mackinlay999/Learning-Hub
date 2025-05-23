const mongoose = require("mongoose");

const Recruiterlogin = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Recruiter"], // only Recruiter allowed
    default: "Recruiter",
  },
  resetpassword: String,
  resetpasswordExpried: Date,
});

module.exports = mongoose.model("Recruiter", Recruiterlogin);
