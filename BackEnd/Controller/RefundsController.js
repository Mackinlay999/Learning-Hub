// controllers/StudentRefundController.js
const StudentRefund = require('../Model/RefundScheme');

const RefundController ={
getAllStudentRefunds : async (req, res) => {
  try {
    const StudentRefunds = await StudentRefund.find();
    res.json(StudentRefunds);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching StudentRefunds', error: err });
  }
},

// Create a new StudentRefund
 createStudentRefund : async (req, res) => {
  const { username, email, amount, reason, status } = req.body;
  try {
    const newStudentRefund = new StudentRefund({ username, email, amount, reason, status });
    await newStudentRefund.save();
    res.status(201).json(newStudentRefund);
  } catch (err) {
    res.status(500).json({ message: 'Error creating StudentRefund', error: err });
  }
},

// Update a StudentRefund
 updateStudentRefund : async (req, res) => {
  const { id } = req.params;
  const { username, email, amount, reason, status } = req.body;
  try {
    const updatedStudentRefund = await StudentRefund.findByIdAndUpdate(
      id,
      { username, email, amount, reason, status },
      { new: true }
    );
    if (!updatedStudentRefund) {
      return res.status(404).json({ message: 'StudentRefund not found' });
    }
    res.json(updatedStudentRefund);
  } catch (err) {
    res.status(500).json({ message: 'Error updating StudentRefund', error: err });
  }
},

// Delete a StudentRefund
deleteStudentRefund : async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudentRefund = await StudentRefund.findByIdAndDelete(id);
    if (!deletedStudentRefund) {
      return res.status(404).json({ message: 'StudentRefund not found' });
    }
    res.json({ message: 'StudentRefund deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting StudentRefund', error: err });
  }
}

}
module.exports = RefundController;
