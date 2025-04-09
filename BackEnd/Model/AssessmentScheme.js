const mongoose = require("mongoose")

const AssessmentScheme= new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ["Quiz", "Assignment", "Exam"], default: "Quiz" },
    status: { type: String, enum: ["Pending", "Active", "Completed"], default: "Pending" },
    issuedCertificate: { type: Boolean, default: false },
  }, { timestamps: true }
);
module.exports = mongoose.model("Assessment" , AssessmentScheme)