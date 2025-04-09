const express = require("express");
const router = express.Router();
const controller = require("../Controller/decisionInsightController.js");

// GET all
router.get("/decision-insights", controller.getAllDecisionInsights);

// POST new
router.post("/decision-insights", controller.createDecisionInsight);

// PUT update
router.put("/decision-insights/:id", controller.updateDecisionInsight);

// DELETE
router.delete("/decision-insights/:id", controller.deleteDecisionInsight);

module.exports = router;
