const express = require("express");
const router = express.Router();
const {
  createPayout,
  getAllPayouts,
  updatePayout,
  deletePayout,
} = require("../Controller/commissionPayoutController.js");

router.post("/commission-payouts", createPayout);
router.get("/commission-payouts", getAllPayouts);
router.put("/commission-payouts/:id", updatePayout);
router.delete("/commission-payouts/:id", deletePayout);

module.exports = router;
