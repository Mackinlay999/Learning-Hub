const express = require("express");
const router = express.Router();
const upload = require("../Utils/Multer");
const {
  getAllMentors,
  createMentor,
  updateMentor,
  deleteMentor,
  getMentorById,
} = require("../Controller/mentorController.js");

// Get all mentors
router.get("/mentors", getAllMentors);
router.get("/mentors/:id", getMentorById);
// Add a new mentor
router.post("/mentors", upload.single("photo") , createMentor);

// Update an existing mentor
router.put("/mentors/:id", upload.single("photo"), updateMentor);

// Delete a mentor
router.delete("/mentors/:id", deleteMentor);

module.exports = router;
