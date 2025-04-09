// models/Insight.js
const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema(
  {
    metric: { type: String, required: true },
    value: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Enrollment Trends", "Lead Conversion", "Revenue Projections", "Engagement Metrics"],
      default: "Enrollment Trends",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Insight", insightSchema);
