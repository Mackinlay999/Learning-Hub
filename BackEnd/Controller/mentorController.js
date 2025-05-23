

const Mentor = require("../Model/mentorModel.js");

// Get all mentors
const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get mentor by ID
const getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });
    res.status(200).json(mentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create mentor
const createMentor = async (req, res) => {
  try {
    const uploadedPhoto = req.file ? `/uploads/${req.file.filename}` : null;
    const { name, expertise, email, mobile, status, sessions, feedback } = req.body;

    const newMentor = new Mentor({
      name,
      expertise,
      email,
      mobile,
      status,
      sessions,
      feedback,
      photo: uploadedPhoto
    });

    const savedMentor = await newMentor.save();
    res.status(201).json(savedMentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update mentor
const updateMentor = async (req, res) => {
  try {
    const { name, expertise, email, mobile, LinkedInUrl, sessions, feedback, status } = req.body;
    const updatedFields = { name, expertise, email, mobile, LinkedInUrl, sessions, feedback, status };

    if (req.file) {
      updatedFields.photo = `/uploads/${req.file.filename}`;
    }

    const updatedMentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!updatedMentor)
      return res.status(404).json({ message: "Mentor not found" });

    res.status(200).json(updatedMentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete mentor
const deleteMentor = async (req, res) => {
  try {
    const deletedMentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!deletedMentor)
      return res.status(404).json({ message: "Mentor not found" });

    res.status(200).json({ message: "Mentor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor,
};


