const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: ["Very interested", "Interested", " Inactive"],
      default: "Inactive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
