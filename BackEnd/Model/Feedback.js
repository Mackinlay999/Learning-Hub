const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    course: { type: String, required: true },
    mentor: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    sentiment: { type: String, enum: ["Positive", "Neutral", "Negative"], default: "Positive" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
