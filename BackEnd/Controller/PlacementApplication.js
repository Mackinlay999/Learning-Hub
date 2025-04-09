const PlacementApplication = require("../Model/PlacementScheme");

const placementController = {
  createApplication: async (req, res) => {
    try {
        console.log("create placement");
        const{studentName,jobTitle,company,interviewStatus,placementStatus} =req.body
      const newApp = new PlacementApplication({studentName,jobTitle,company,interviewStatus,placementStatus});
      await newApp.save();
      res.status(201).json(newApp);
    } catch (err) {
      res.status(500).json({ message: "Error creating application", error: err.message });
    }
  },

  getAllApplications: async (req, res) => {
    console.log("get all placement");
    try {
      const apps = await PlacementApplication.find();
      res.status(200).json(apps);
    } catch (err) {
      res.status(500).json({ message: "Error fetching applications", error: err.message });
    }
  },

  updateApplication: async (req, res) => {
    console.log("update placement");
    try {
      const updatedApp = await PlacementApplication.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedApp);
    } catch (err) {
      res.status(500).json({ message: "Error updating application", error: err.message });
    }
  },

  deleteApplication: async (req, res) => {
    console.log("delete placement");
    try {
      await PlacementApplication.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Application deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting application", error: err.message });
    }
  }
};

module.exports =  placementController;
