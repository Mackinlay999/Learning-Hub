const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Applicant",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Interview", interviewSchema);
