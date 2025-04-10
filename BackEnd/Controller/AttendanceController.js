const Attendance = require("../Model/AttendanceScheme");

const attendanceController = {
  // Create
  createRecord: async (req, res) => {
    console.log("create attentence");
    
    try {
      
      const {studentName,
  attendanceMethod,
  progress,
  certificationIssued} =req.body

  if( !studentName ||
    !attendanceMethod
   || !progress
   || !certificationIssued){
    return res.status(400).json({err:"fill the data"})
   }
      const newRecord = new Attendance( {studentName,
        attendanceMethod,
        progress,
        certificationIssued});
      await newRecord.save();
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(400).json({ message: "Error creating record", error });
    }
  },

  // Read all
  getRecords: async (req, res) => {
    console.log("get attentence");
    try {
      const records = await Attendance.find();
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch records", error });
    }
  },

  // Update
  updateRecord: async (req, res) => {
    console.log("update attentence");
    try {
      const updated = await Attendance.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ message: "Error updating record", error });
    }
  },

  // Delete
  deleteRecord: async (req, res) => {
    console.log("delete attentence");
    try {
      await Attendance.findByIdAndDelete(req.params.id);
      res.json({ message: "Record deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting record", error });
    }
  },
};

module.exports = attendanceController;
