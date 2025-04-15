const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../Controller/studentController.js");

// Route to get all students
router.get("/students", getAllStudents);

// Route to create a new student
router.post("/students", createStudent);

// Route to get a single student by ID
router.get("/students/:id", getStudentById);

// Route to update a student
router.put("/students/:id", updateStudent);

// Route to delete a student
router.delete("/students/:id", deleteStudent);

module.exports = router;
