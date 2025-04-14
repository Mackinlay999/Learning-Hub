const express = require("express");
const router = express.Router();
const {
  getAllMentors,
  addMentor,
  updateMentor,
  deleteMentor,
} = require("../Controller/mentorController.js");

// Get all mentors
router.get("/mentors", getAllMentors);

// Add a new mentor
router.post("/mentors", addMentor);

// Update an existing mentor
router.put("/mentors/:id", updateMentor);

// Delete a mentor
router.delete("/mentors/:id", deleteMentor);

module.exports = router;
