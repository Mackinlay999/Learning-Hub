const express = require("express");
const router = express.Router();
const {
  createPath,
  getPaths,
  updatePath,
  deletePath
} = require("../Controller/customLearningPathController.js");

router.post("/custom-learning-paths", createPath);
router.get("/custom-learning-paths", getPaths);
router.put("/custom-learning-paths/:id", updatePath);
router.delete("/custom-learning-paths/:id", deletePath);

module.exports = router;
