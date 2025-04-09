const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Excel", "CSV", "PDF"],
    default: "Excel",
  },
  prediction: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
