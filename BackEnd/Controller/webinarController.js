

const Webinar = require('../Model/webinarModel');

const WebinarController = {
createWebinar: async (req, res) => {
// console.log("webinar created")
  try {
    // Optional: Explicit validation (you can enhance this as needed)
    const { webinarTitle, webinarDateTime, webinarDescription, webinarLink, typeOfProgram } = req.body;
    
    if (!webinarTitle || !webinarDateTime || !webinarDescription || !webinarLink || !typeOfProgram) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new Webinar document
    const webinar = new Webinar({
      webinarTitle,
      webinarDateTime,
      webinarDescription,
      webinarLink,
      typeOfProgram
    });

    // Save to database
    const savedWebinar = await webinar.save();

    // Respond with saved document
    res.status(201).json(savedWebinar);

  } catch (error) {
    
    res.status(400).json({ message: error.message });
  }
},


  // Get all webinars
  getAllWebinars: async (req, res) => {
    // console.log(" all webinar")
    try {
      const webinars = await Webinar.find().sort({ webinarDateTime: -1 });
      res.json(webinars);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get webinar by ID
  getWebinarById: async (req, res) => {
    try {
      const webinar = await Webinar.findById(req.params.id);
      if (!webinar) return res.status(404).json({ message: 'Webinar not found' });
      res.json(webinar);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update webinar by ID
  updateWebinar: async (req, res) => {
    try {
      const updatedWebinar = await Webinar.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedWebinar) return res.status(404).json({ message: 'Webinar not found' });
      res.json(updatedWebinar);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete webinar by ID
  deleteWebinar: async (req, res) => {
    try {
      const deletedWebinar = await Webinar.findByIdAndDelete(req.params.id);
      if (!deletedWebinar) return res.status(404).json({ message: 'Webinar not found' });
      res.json({ message: 'Webinar deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = WebinarController;
