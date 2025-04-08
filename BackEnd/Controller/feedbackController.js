const Feedback = require("../Model/Feedback.js");

// Get all feedback
exports.getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    next(error);
  }
};

// Create new feedback
exports.createFeedback = async (req, res, next) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    next(error);
  }
};

// Update feedback
exports.updateFeedback = async (req, res, next) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Feedback not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res, next) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Feedback not found" });
    res.json({ message: "Feedback deleted" });
  } catch (error) {
    next(error);
  }
};
