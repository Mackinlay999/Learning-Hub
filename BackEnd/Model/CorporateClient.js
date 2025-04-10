const mongoose = require("mongoose");

const corporateClientSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  contractStartDate: { type: Date, required: true },
  contractEndDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "Active", "Expired"],
    default: "Pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("CorporateClient", corporateClientSchema);
