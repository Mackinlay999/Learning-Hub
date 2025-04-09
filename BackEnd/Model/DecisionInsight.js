const mongoose = require("mongoose");

const decisionInsightSchema = new mongoose.Schema({
  customerSegment: {
    type: String,
    required: true,
  },
  churnPrediction: {
    type: Number,
    required: true,
  },
  retentionStrategy: {
    type: String,
    required: true,
  },
  leadPriority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("DecisionInsight", decisionInsightSchema);
