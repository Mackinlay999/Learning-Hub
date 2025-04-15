const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: Number,
  status: { type: String, enum: ["Paid", "Unpaid"] },
});

const certificateSchema = new mongoose.Schema({
  name: String,
  link: String,
});

const attendanceSchema = new mongoose.Schema({
  date: String,
  status: { type: String, enum: ["Present", "Absent"] },
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  photo: String,
  course: String,
  status: { type: String, enum: ["Active", "Inactive", "Completed"], default: "Active" },
  progress: { type: Number, default: 0 },
  payments: [paymentSchema],
  certificates: [certificateSchema],
  attendance: [attendanceSchema],
  recruiterNote: String,
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
