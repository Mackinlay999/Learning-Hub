const AppliedJob = require('../Model/AppliedJob');
const SavedJob = require('../Model/SavedJob');

const getDashboardData = async (req, res) => {
  const studentId = req.user.id; // assuming auth middleware adds user to req

  try {
    const appliedJobs = await AppliedJob.find({ studentId }).sort({ appliedDate: -1 });
    const savedJobs = await SavedJob.find({ studentId }).sort({ savedAt: -1 });

    const overviewStats = {
      appliedJobs: appliedJobs.length,
      savedJobs: savedJobs.length,
      profileViews: Math.floor(Math.random() * 150 + 20), // simulate or track elsewhere
    };

    res.json({ overviewStats, appliedJobs, savedJobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
    getDashboardData,
}