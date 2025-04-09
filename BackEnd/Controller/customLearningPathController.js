const CustomLearningPath = require("../Model/CustomLearningPath.js");

// Create new path
exports.createPath = async (req, res) => {
  try {
    const newPath = new CustomLearningPath(req.body);
    const savedPath = await newPath.save();
    res.status(201).json(savedPath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all paths
exports.getPaths = async (req, res) => {
  try {
    const paths = await CustomLearningPath.find();
    res.status(200).json(paths);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a path
exports.updatePath = async (req, res) => {
  try {
    const updated = await CustomLearningPath.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a path
exports.deletePath = async (req, res) => {
  try {
    await CustomLearningPath.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Path deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
