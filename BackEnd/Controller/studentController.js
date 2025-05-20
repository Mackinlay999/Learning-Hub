const Student = require("../Model/student.js");

// Get all students

 const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// Get single student
 const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

// Create student
const createStudent = async (req, res) => {
  try {
    const { name, email, mobile, course, status } = req.body;
    const photoPath = req.file ? `/uploads/${req.file.filename}` : "";

    const newStudent = new Student({
      name,
      email,
      mobile,
      course,
      status,
      photo: photoPath, // Save file path to DB
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: "Error creating student", error });
  }
};


const updateStudent = async (req, res) => {
  try {
    const { name, email, mobile, course, status } = req.body;
    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

    const updateData = {
      name,
      email,
      mobile,
      course,
      status,
    };

    if (photoPath) {
      updateData.photo = photoPath;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: "Error updating student", error });
  }
};


// Add attendance record
const addAttendance = async (req, res) => {
  const { date, status } = req.body;
  if (!date || !status) {
    return res.status(400).json({ message: "Date and status are required" });
  }

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.attendance.push({ date, status });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error adding attendance", error });
  }
};



// Delete student

 const deleteStudent = async (req, res) => {

  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};
// Controller for adding a certificate
const addCertificate = async (req, res) => {
  const { name, link } = req.body;
  if (!name || !link) {
    return res.status(400).json({ message: "Certificate name and link are required" });
  }

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.certificates.push({ name, link });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error adding certificate", error });
  }
}


// Controller for fetching certificates
const getCertificates = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    
    res.status(200).json(student.certificates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching certificates", error });
  };
}

  const getActiveStudents = async (req, res) => {
    try {
      const activeStudents = await Student.find({ isActive: true });
      res.status(200).json(activeStudents);
    } catch (error) {
      res.status(500).json({ message: "Error fetching active students", error });
    }
  };
  


module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  addAttendance,
  deleteStudent,
  addCertificate,
  getCertificates,
  getActiveStudents

}
