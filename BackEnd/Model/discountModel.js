const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  percentage: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  usage: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Discount", discountSchema);
