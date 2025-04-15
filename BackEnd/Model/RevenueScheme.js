const mongoose = require("mongoose")

const RevenueScheme = new mongoose.Schema({
  username : {type :String, required : true},
  email:{type :String, required : true},
  amount: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  reason: { type: String,  },
  refundstatus: { type: String},
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports  = mongoose.model("Revenue", RevenueScheme);

