const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  addAttendance,
  deleteStudent,
  addCertificate,
  getCertificates,
} = require("../Controller/studentController.js"); // Importing the controller functions

const router = express.Router();

router.get("/students", getStudents);
router.get("/students/:id", getStudentById);
router.post("/students", createStudent);
router.put("/students/:id", updateStudent); // Endpoint to update student details
router.post("/students/:id/attendance", addAttendance); // Endpoint to add attendance dynamically
router.delete("/students/:id", deleteStudent);
router.post("/students/:id/certificates", addCertificate);
router.get("/students/:id/certificates", getCertificates);
module.exports = router;
