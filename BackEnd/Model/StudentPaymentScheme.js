const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["Paid", "Pending", "Overdue", "EMI"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("StudentPayment", studentSchema);

