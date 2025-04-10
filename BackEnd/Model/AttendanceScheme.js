const mongoose = require("mongoose");

const attendanceProgressSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  attendanceMethod: {
    type: String,
    enum: ["Login", "Biometric", "Manual"],
    default: "Login",
  },
  progress: { type: Number, min: 0, max: 100, required: true },
  certificationIssued: {
    type: String,
    enum: ["Yes", "No"],
    default: "No",
  },
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceProgressSchema);
