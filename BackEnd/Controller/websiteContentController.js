const WebsiteContent = require("../Model/WebsiteContent.js");

// Create or Update Website Content
exports.saveContent = async (req, res) => {
  try {
    const existing = await WebsiteContent.findOne();
    if (existing) {
      const updated = await WebsiteContent.findByIdAndUpdate(existing._id, req.body, { new: true });
      return res.status(200).json(updated);
    } else {
      const created = await WebsiteContent.create(req.body);
      return res.status(201).json(created);
    }
  } catch (error) {
    res.status(500).json({ message: "Error saving content", error });
  }
};

// Get Website Content
exports.getContent = async (req, res) => {
  try {
    const content = await WebsiteContent.findOne();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving content", error });
  }
};
