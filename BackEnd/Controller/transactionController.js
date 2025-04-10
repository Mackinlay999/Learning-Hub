const Transaction = require("../Model/Transaction.js");

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { amount, paymentMode, status } = req.body;
    const transaction = new Transaction({ amount, paymentMode, status });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Transaction not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};
