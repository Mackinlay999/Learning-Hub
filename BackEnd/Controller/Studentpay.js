
const StudentPayment = require("../Model/StudentPaymentScheme");

const studentController = {
  // Create
  createStudent: async (req, res) => {
    try {
      const newStudent = new StudentPayment(req.body);
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (err) {
      res.status(400).json({ message: "Error creating student", error: err });
    }
  },

  // Read all
  getStudents: async (req, res) => {
    try {
      const students = await StudentPayment.find();
      res.json(students);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch students" });
    }
  },

  // Update
  updateStudent: async (req, res) => {
    try {
      const updated = await StudentPayment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: "Error updating student" });
    }
  },

  // Delete
  deleteStudent: async (req, res) => {
    try {
      await StudentPayment.findByIdAndDelete(req.params.id);
      res.json({ message: "Student deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting student" });
    }
  }
};

module.exports = studentController;
