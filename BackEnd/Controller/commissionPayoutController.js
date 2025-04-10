const CommissionPayout = require("../Model/commissionPayoutModel.js");

// Create new payout
exports.createPayout = async (req, res) => {
  try {
    const payout = await CommissionPayout.create(req.body);
    res.status(201).json(payout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all payouts
exports.getAllPayouts = async (req, res) => {
  try {
    const payouts = await CommissionPayout.find().sort({ createdAt: -1 });
    res.status(200).json(payouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a payout
exports.updatePayout = async (req, res) => {
  try {
    const updated = await CommissionPayout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a payout
exports.deletePayout = async (req, res) => {
  try {
    await CommissionPayout.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
