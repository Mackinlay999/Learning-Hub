const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../Controller/transactionController.js");

router.get("/transactions", getAllTransactions);
router.post("/transactions", createTransaction);
router.put("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;
