const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive", "Completed"], default: "Active" },
    photo: { type: String, default: "https://via.placeholder.com/40" },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
