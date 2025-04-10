const FunnelEntry = require("../Model/FunnelEntry.js");

// Create new entry
exports.createEntry = async (req, res) => {
  try {
    const { name, stage } = req.body;
    const entry = new FunnelEntry({ name, stage });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all entries
exports.getEntries = async (req, res) => {
  try {
    const entries = await FunnelEntry.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update stage
exports.updateStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { stage } = req.body;
    const entry = await FunnelEntry.findByIdAndUpdate(id, { stage }, { new: true });
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete entry
exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    await FunnelEntry.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
