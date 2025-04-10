const mongoose = require("mongoose");

const commissionPayoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["Instructor Payout", "Affiliate Commission"],
    default: "Instructor Payout",
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Paid"],
    default: "Pending",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("CommissionPayout", commissionPayoutSchema);
