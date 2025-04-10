const Refund = require("../Model/Refund.js");

// Get all refunds
const getRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find().sort({ createdAt: -1 });
    res.status(200).json(refunds);
  } catch (error) {
    res.status(500).json({ message: "Error fetching refunds", error });
  }
};

// Add a new refund
const createRefund = async (req, res) => {
  const { amount, reason, status } = req.body;
  try {
    const refund = new Refund({ amount, reason, status });
    await refund.save();
    res.status(201).json(refund);
  } catch (error) {
    res.status(400).json({ message: "Error creating refund", error });
  }
};

// Update a refund
const updateRefund = async (req, res) => {
  const { id } = req.params;
  const { amount, reason, status } = req.body;
  try {
    const refund = await Refund.findByIdAndUpdate(
      id,
      { amount, reason, status },
      { new: true }
    );
    if (!refund) return res.status(404).json({ message: "Refund not found" });
    res.json(refund);
  } catch (error) {
    res.status(400).json({ message: "Error updating refund", error });
  }
};

// Delete a refund
const deleteRefund = async (req, res) => {
  const { id } = req.params;
  try {
    const refund = await Refund.findByIdAndDelete(id);
    if (!refund) return res.status(404).json({ message: "Refund not found" });
    res.json({ message: "Refund deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting refund", error });
  }
};

module.exports = {
  getRefunds,
  createRefund,
  updateRefund,
  deleteRefund,
};
