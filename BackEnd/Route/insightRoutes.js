// routes/insightRoutes.js
const express = require("express");
const router = express.Router();
const {
  createInsight,
  getInsights,
  updateInsight,
  deleteInsight,
} = require("../Controller/insightController.js");

router.post("/insights", createInsight); // Create a new insight
router.get("/insights", getInsights); // Get all insights
router.put("/insights/:id", updateInsight); // Update an existing insight
router.delete("/insights/:id", deleteInsight); // Delete an insight

module.exports = router;
