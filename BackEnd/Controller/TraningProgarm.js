
const TraningProgram = require("../Model/TraningProgramScheme");

const TraningProgramController = {
  createProgram: async (req, res) => {
    try {
      const {
        name,
        mode,
        duration,
        price,
        ProgramOverview = "",
        Curriculumtitle = "",
        objective = [],
        topics = "",
        assessments = "",
        Programbenefits = "",
        placementAssistance = "",
        enrollkeytitle = "",
        enrollkeycontent = "",
      } = req.body;
      

      if (!name || !mode || !duration || !price) {
        return res.status(400).json({ error: "Please fill all required fields." });
      }

      const newProgram = new TraningProgram({
        name,
        mode,
        duration,
        price,
        ProgramOverview,
        Curriculumtitle,
        objective,
        topics,
        assessments,
        Programbenefits,
        placementAssistance,
        enrollkeytitle,
        enrollkeycontent,
      });

      await newProgram.save();
      res.status(201).json({ message: "Program created successfully." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateProgram: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedProgram = await TraningProgram.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedProgram)
        return res.status(404).json({ message: "Program not found." });

      res.json(updatedProgram);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllPrograms: async (req, res) => {
    try {
      const programs = await TraningProgram.find();
      res.json(programs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteProgram: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await TraningProgram.findByIdAndDelete(id);

      if (!deleted)
        return res.status(404).json({ message: "Program not found." });

      res.json({ message: "Program deleted successfully." });
    } catch (err) {
      console.error("Create Program Error:", err);  
      res.status(500).json({ error: err.message });
    }
  },

  getSingleProgram: async (req, res) => {
    try {
      const { id } = req.params;
      const program = await TraningProgram.findById(id);

      if (!program) return res.status(404).json({ message: "Not found" });

      res.json(program);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
 

};

module.exports = TraningProgramController;

    
      