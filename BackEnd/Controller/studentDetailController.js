const StudentDetail = require("../Model/studentDetail");
// const { getStudentById } = require("../Controller/studentDetailController");

const StudentDetailController = { 
  getStudentById: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await StudentDetail.findById(id);
      if (!student) return res.status(404).json({ message: "Student not found" });
      res.json(student);
    } catch (err) {
      console.error("Error fetching student:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = StudentDetailController;
