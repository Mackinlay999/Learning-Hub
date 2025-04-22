const mongoose = require("mongoose")
const StudentDetailSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: {
    type: String,
    required: true,
  },  
  course: String,
  photo: String,
  status: {
    type: String,
    enum: ["Active", "Inactive", "Pending"],
    default: "Pending",
  },
  progress: {
    type: Number,
    default: 0,
  },
  payments: [PaymentSchema],
  certificates: [CertificateSchema],
  attendance: [AttendanceSchema],
  recruiterNote: String,
});

module.exports= mongoose.model("StudentDetail", StudentDetailSchema);


