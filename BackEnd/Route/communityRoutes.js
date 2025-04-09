const express = require("express");
const router = express.Router();
const {
  createForum,
  getForums,
  updateForum,
  deleteForum,
  createPoll,
  getPolls,
  updatePoll,
  deletePoll,
} = require("../Controller/communityController.js");

// Forum Routes
router.post("/community/forums", createForum);
router.get("/community/forums", getForums);
router.put("/community/forums/:id", updateForum);
router.delete("/community/forums/:id", deleteForum);

// Poll Routes
router.post("/community/polls", createPoll);
router.get("/community/polls", getPolls);
router.put("/community/polls/:id", updatePoll);
router.delete("/community/polls/:id", deletePoll);

module.exports = router;
