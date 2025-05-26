const RecruiterJob = require("../Model/RecruiterJob");

// Create Recruiter Job
const createRecruiterJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      employmentType,
      workplaceType,
      industry,
      experienceLevel,
      salaryRange,
      jobDescription,
      skillsRequired,
      applicationDeadline,
      applicationLink,
      recruiterId,
      companyLogo, // ✅
      companyWebsite, // ✅
      jobBenefits, // ✅
      contactEmail, // ✅
      educationRequirements, // ✅
      vacancies
    } = req.body;
    console.log("Job data received:", req.body);

    // Validate required fields
    if (
      !jobTitle ||
      !companyName ||
      !location ||
      !employmentType ||
      !workplaceType ||
      !jobDescription ||
      !recruiterId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newJob = new RecruiterJob({
      jobTitle,
      companyName,
      location,
      employmentType,
      workplaceType,
      industry,
      experienceLevel,
      salaryRange,
      jobDescription,
      skillsRequired,
      applicationDeadline,
      applicationLink,
      recruiterId,
      companyLogo, // ✅
      companyWebsite, // ✅
      jobBenefits, // ✅
      contactEmail, // ✅
      educationRequirements, // ✅
      vacancies
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Jobs
const getAllRecruiterJobs = async (req, res) => {
  try {
    const jobs = await RecruiterJob.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Job
const getRecruiterJobById = async (req, res) => {
  try {
    const job = await RecruiterJob.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Job
const updateRecruiterJob = async (req, res) => {
  try {
    const job = await RecruiterJob.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Job
const deleteRecruiterJob = async (req, res) => {
  try {
    await RecruiterJob.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Application Link (apply to job)
const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await RecruiterJob.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (!job.applicationLink) {
      return res
        .status(400)
        .json({ message: "No application link available for this job." });
    }

    // Send application link URL to frontend
    res.status(200).json({ applicationLink: job.applicationLink });
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
  applyToJob,
};
