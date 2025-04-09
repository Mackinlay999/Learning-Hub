const express = require("express");
const router = express.Router();
const {
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require("../Controller/feedbackController.js");

// Routes
router.get("/feedback", getFeedbacks);
router.post("/feedback", createFeedback);
router.put("/feedback/:id", updateFeedback);
router.delete("/feedback/:id", deleteFeedback);

module.exports = router;
