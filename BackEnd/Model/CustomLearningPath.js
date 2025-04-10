const mongoose = require("mongoose");

const CustomLearningPathSchema = new mongoose.Schema({
  company: { type: String, required: true },
  courseList: { type: String, required: true },
  objective: { type: String, required: true },
  duration: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("CustomLearningPath", CustomLearningPathSchema);
