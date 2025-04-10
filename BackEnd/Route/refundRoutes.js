const express = require("express");
const {
  getRefunds,
  createRefund,
  updateRefund,
  deleteRefund,
} = require("../Controller/refundController.js");

const router = express.Router();

router.get("/refunds", getRefunds);
router.post("/refunds", createRefund);
router.put("/refunds/:id", updateRefund);
router.delete("/refunds/:id", deleteRefund);

module.exports = router;
