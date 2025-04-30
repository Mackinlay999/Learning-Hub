const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }, // ← Add this
    issue: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Escalated", "Resolved"],
      default: "Open",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Ticket", ticketSchema);
