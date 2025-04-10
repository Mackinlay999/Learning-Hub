const express = require("express");
const router = express.Router();
const {
  createEntry,
  getEntries,
  updateStage,
  deleteEntry,
} = require("../Controller/funnelEntryController.js");

router.post("/funnel-entries", createEntry);
router.get("/funnel-entries", getEntries);
router.put("/funnel-entries/:id", updateStage);
router.delete("/funnel-entries/:id", deleteEntry);

module.exports = router;
