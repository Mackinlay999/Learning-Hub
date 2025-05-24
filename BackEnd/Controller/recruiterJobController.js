const RecruiterJob = require('../Model/RecruiterJob');

// Create Recruiter Job
const createRecruiterJob = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const {jobTitle, companyName, location } = req.body;
    if (!jobTitle || !companyName || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const job = new RecruiterJob({ ...req.body });
    await job.save();
    res.status(201).json({ message: 'Job posted successfully', job });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: error.message });
  }
};


// Get All Jobs
const getAllRecruiterJobs = async (req, res) => {
  try {
    const jobs = await RecruiterJob.find().sort({ postedAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Job
const getRecruiterJobById = async (req, res) => {
  try {
    const job = await RecruiterJob.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Job
const updateRecruiterJob = async (req, res) => {
  try {
    const job = await RecruiterJob.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Job updated successfully', job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Job
const deleteRecruiterJob = async (req, res) => {
  try {
    await RecruiterJob.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// In your controller, add this:

const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await RecruiterJob.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (!job.applicationLink) {
      return res.status(400).json({ message: 'No application link available for this job.' });
    }

    // Redirect the user to the application link
    return res.redirect(job.applicationLink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createRecruiterJob,
  getAllRecruiterJobs,
  getRecruiterJobById,
  updateRecruiterJob,
  deleteRecruiterJob,
  applyToJob
};