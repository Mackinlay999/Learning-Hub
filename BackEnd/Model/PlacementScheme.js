const mongoose = require('mongoose');

const placementApplicationSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    interviewStatus: {
      type: String,
      enum: ["Pending", "Scheduled", "Cleared", "Rejected"],
      default: "Pending"
    },
    placementStatus: {
      type: String,
      enum: ["Not Placed", "Placed"],
      default: "Not Placed"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PlacementApplication', placementApplicationSchema);
