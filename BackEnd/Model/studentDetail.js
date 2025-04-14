import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  amount: Number,
  status: {
    type: String,
    enum: ["Paid", "Unpaid"],
    default: "Unpaid",
  },
});

const CertificateSchema = new mongoose.Schema({
  name: String,
  link: String,
});

const AttendanceSchema = new mongoose.Schema({
  date: String, // you can use Date type if needed
  status: {
    type: String,
    enum: ["Present", "Absent"],
  },
});

const StudentDetailSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
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

const StudentDetail = mongoose.model("StudentDetail", StudentDetailSchema);

export default StudentDetail;
