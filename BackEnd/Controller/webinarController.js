const Webinar = require("../Model/webinarModel");

// Create a new webinar
const createWebinar = async (req, res) => {
  try {
    const { title, dateTime, description } = req.body;
    const newWebinar = new Webinar({ title, dateTime, description });
    await newWebinar.save();
    res.status(201).json({ message: "Webinar created successfully", webinar: newWebinar });
  } catch (error) {
    res.status(400).json({ message: "Error creating webinar", error: error.message });
  }
};

// Get all webinars
const getAllWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find();
    res.status(200).json(webinars);
  } catch (error) {
    res.status(400).json({ message: "Error fetching webinars", error: error.message });
  }
};

module.exports = { createWebinar, getAllWebinars };
