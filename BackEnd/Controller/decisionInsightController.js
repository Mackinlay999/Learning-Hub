const DecisionInsight = require("../Model/DecisionInsight.js");

// CREATE
exports.createDecisionInsight = async (req, res) => {
  try {
    const insight = new DecisionInsight(req.body);
    await insight.save();
    res.status(201).json(insight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL
exports.getAllDecisionInsights = async (req, res) => {
  try {
    const insights = await DecisionInsight.find().sort({ createdAt: -1 });
    res.status(200).json(insights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateDecisionInsight = async (req, res) => {
  try {
    const insight = await DecisionInsight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!insight) return res.status(404).json({ error: "Insight not found" });
    res.status(200).json(insight);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
exports.deleteDecisionInsight = async (req, res) => {
  try {
    const insight = await DecisionInsight.findByIdAndDelete(req.params.id);
    if (!insight) return res.status(404).json({ error: "Insight not found" });
    res.status(200).json({ message: "Insight deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
