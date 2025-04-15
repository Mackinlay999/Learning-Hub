// models/Refund.js
const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports  = mongoose.model('StudentRefund', refundSchema);

