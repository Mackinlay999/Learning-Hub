const Student = require("../Model/student.js");

// Get all students
<<<<<<< HEAD
const getStudents = async (req, res) => {
=======
 const getStudents = async (req, res) => {
>>>>>>> 75e8fcd44766eda5d9e2eba7466368f20885cb04
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// Get single student
<<<<<<< HEAD
const getStudentById = async (req, res) => {
=======
 const getStudentById = async (req, res) => {
>>>>>>> 75e8fcd44766eda5d9e2eba7466368f20885cb04
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

// Create student
<<<<<<< HEAD
const createStudent = async (req, res) => {
=======
 const createStudent = async (req, res) => {
>>>>>>> 75e8fcd44766eda5d9e2eba7466368f20885cb04
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: "Error creating student", error });
  }
};

// Update student details
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: "Error updating student", error });
  }
};

// Add attendance record
const addAttendance = async (req, res) => {
  const { date, status } = req.body;
  if (!date || !status) {
    return res.status(400).json({ message: "Date and status are required" });
  }

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.attendance.push({ date, status });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error adding attendance", error });
  }
};

<<<<<<< HEAD
// Delete student
const deleteStudent = async (req, res) => {
=======

 const deleteStudent = async (req, res) => {
>>>>>>> 75e8fcd44766eda5d9e2eba7466368f20885cb04
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  addAttendance,
  deleteStudent
};
