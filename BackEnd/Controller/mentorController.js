const Mentor = require("../Model/mentorModel.js");

// Get all mentors
const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching mentors", error: err });
  }
};

const addMentor = async (req, res) => {
  try {
    const { name, email, courses, sessions, feedback } = req.body;

    const newMentor = new Mentor({
      name,
      email,
      courses,
      sessions,
      feedback,
    });

    await newMentor.save();
    res.status(201).json(newMentor);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Mentor with this email already exists." });
    }
    console.error("Error saving mentor:", err);
    res.status(500).json({ message: "Error saving mentor" });
  }
};


// Update an existing mentor
const updateMentor = async (req, res) => {
  const { id } = req.params;
  const { name, email, courses, sessions, feedback } = req.body;

  try {
    const mentor = await Mentor.findByIdAndUpdate(
      id,
      { name, email, courses, sessions, feedback },
      { new: true }
    );
    res.status(200).json(mentor);
  } catch (err) {
    res.status(500).json({ message: "Error updating mentor", error: err });
  }
};

// Delete a mentor
const deleteMentor = async (req, res) => {
  const { id } = req.params;

  try {
    await Mentor.findByIdAndDelete(id);
    res.status(200).json({ message: "Mentor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting mentor", error: err });
  }
};

module.exports = {
  getAllMentors,
  addMentor,
  updateMentor,
  deleteMentor,
};
