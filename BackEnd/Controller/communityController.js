const Forum = require("../Model/Forum");
const Poll = require("../Model/Poll");

// Forum Controllers
exports.createForum = async (req, res) => {
  try {
    const forum = await Forum.create(req.body);
    res.status(201).json(forum);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getForums = async (req, res) => {
  try {
    const forums = await Forum.find();
    res.status(200).json(forums);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateForum = async (req, res) => {
  try {
    const updated = await Forum.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteForum = async (req, res) => {
  try {
    await Forum.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Forum deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Poll Controllers
exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
  //   const poll = await Poll.create({ question, options: options.split(",").map(opt => opt.trim()) });
  //   res.status(201).json(poll);
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
  if (!question || !options || !Array.isArray(options) || options.length === 0) {
    return res.status(400).json({ message: "Invalid poll data" });
  }

  const newPoll = new Poll({ question, options });
  await newPoll.save();

  res.status(201).json(newPoll);
} catch (error) {
  console.error("Error creating poll:", error);
  res.status(500).json({ message: "Server error while creating poll" });
}
};

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.status(200).json(polls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    const updated = await Poll.findByIdAndUpdate(req.params.id, {
      question,
      options: options.split(",").map(opt => opt.trim())
    }, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePoll = async (req, res) => {
  try {
    await Poll.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Poll deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
