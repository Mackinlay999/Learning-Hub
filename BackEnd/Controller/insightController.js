// controllers/insightController.js
const Insight = require("../Model/Insight.js");

const createInsight = async (req, res) => {
  try {
    const { metric, value, category } = req.body;
    const newInsight = new Insight({ metric, value, category });
    await newInsight.save();
    res.status(201).json(newInsight);
  } catch (err) {
    res.status(500).json({ message: "Error creating insight", error: err });
  }
};

const getInsights = async (req, res) => {
  try {
    const insights = await Insight.find();
    res.status(200).json(insights);
  } catch (err) {
    res.status(500).json({ message: "Error fetching insights", error: err });
  }
};

const updateInsight = async (req, res) => {
  const { id } = req.params;
  const { metric, value, category } = req.body;
  try {
    const updatedInsight = await Insight.findByIdAndUpdate(
      id,
      { metric, value, category },
      { new: true }
    );
    if (!updatedInsight) {
      return res.status(404).json({ message: "Insight not found" });
    }
    res.status(200).json(updatedInsight);
  } catch (err) {
    res.status(500).json({ message: "Error updating insight", error: err });
  }
};

const deleteInsight = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInsight = await Insight.findByIdAndDelete(id);
    if (!deletedInsight) {
      return res.status(404).json({ message: "Insight not found" });
    }
    res.status(200).json({ message: "Insight deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting insight", error: err });
  }
};

module.exports = {
  createInsight,
  getInsights,
  updateInsight,
  deleteInsight,
};
