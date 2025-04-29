const TraningProgram = require("../Model/TraningProgramScheme");

const TraningProgramController = {
  createProgram: async (req, res) => {
    try {
      const newTrainingProgram = new TraningProgram(req.body);
      await newTrainingProgram.save();
      res.status(201).json({ message: "Training Program created successfully", newTrainingProgram });
    } catch (error) {
      res.status(500).json({ message: "Error creating training program", error });
    }
  },

  updateProgram: async (req, res) => {
    try {
      const updatedProgram = await TraningProgram.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProgram) {
        return res.status(404).json({ message: "Training Program not found" });
      }
      res.status(200).json(updatedProgram);
    } catch (error) {
      res.status(500).json({ message: "Error updating the training program", error });
    }
  },

  getAllPrograms: getAllTrainingPrograms = async (req, res) => {
    try {
      const programs = await TraningProgram.find();
      res.status(200).json(programs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching training programs", error });
    }
  },

  deleteProgram: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await TraningProgram.findByIdAndDelete(id);

      if (!deleted) return res.status(404).json({ message: "Program not found." });

      res.json({ message: "Program deleted successfully." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getSingleProgram: async (req, res) => {
    try {
      const { id } = req.params;
      const program = await TraningProgram.findById(id);

      if (!program) return res.status(404).json({ message: "Program not found." });

      res.json(program);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = TraningProgramController;
