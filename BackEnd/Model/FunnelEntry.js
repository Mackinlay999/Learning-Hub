const mongoose = require("mongoose");

const funnelEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    enum: ["Lead", "Nurturing", "Conversion", "Enrollment"],
    default: "Lead",
  },
}, { timestamps: true });

module.exports = mongoose.model("FunnelEntry", funnelEntrySchema);
