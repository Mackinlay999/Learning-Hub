// controllers/recruiterController.js
const Jobs = require("../Model/Job");
const Applicant = require("../Model/Applicant");
const Company = require("../Model/Company");


const mongoose = require("mongoose");

const getPartnerCompanies = async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
};
// Add a new partner company
const addPartnerCompany = async (req, res) => {
  try {
    const newPartner = new Company(req.body);
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (err) {
    res.status(500).json({ message: "Error adding partner." });
  }
};

// Update an existing partner company
const updatePartnerCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPartner = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner not found." });
    }
    res.json(updatedPartner);
  } catch (err) {
    res.status(500).json({ message: "Error updating partner." });
  }
};

// Delete a partner company
const deletePartnerCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPartner = await Company.findByIdAndDelete(id);
    if (!deletedPartner) {
      return res.status(404).json({ message: "Partner not found." });
    }
    res.json({ message: "Partner deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting partner." });
  }
};
// JOBS
// POST job/internship
const postJob = async (req, res) => {
  const newJob = new Jobs(req.body);
  await newJob.save();
  res.status(201).json(newJob);
};
const getJob = async (req, res) => {
  try {
    const jobs = await Jobs.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};
// UPDATE job
const updateJob = async (req, res) => {
  try {
    const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Failed to update job" });
  }
};

// DELETE job
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Jobs.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job" });
  }
};

const getApplicants = async (req, res) => {
  const applicants = await Applicant.find().populate("user job");
  res.json(applicants);
};

// schedule interview
// Update interview details (e.g., reschedule)
const updateInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required." });
    }

    const updatedInterview = await Applicant.findOneAndUpdate(
      { _id: interviewId, status: "Interview Scheduled" },
      { interviewDate: new Date(`${date}T${time}`) },
      { new: true }
    );

    if (!updatedInterview) {
      return res.status(404).json({ message: "Interview not found or already completed." });
    }

    res.status(200).json({ message: "Interview updated successfully!" });
  } catch (error) {
    console.error("Error updating interview:", error);
    res.status(500).json({ message: "Server error while updating interview." });
  }
};

// Delete an interview
const deleteInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const deletedInterview = await Applicant.findOneAndUpdate(
      { _id: interviewId, status: "Interview Scheduled" },
      { status: "Applied", interviewDate: null },
      { new: true }
    );

    if (!deletedInterview) {
      return res.status(404).json({ message: "Interview not found or already cancelled." });
    }

    res.status(200).json({ message: "Interview deleted successfully!" });
  } catch (error) {
    console.error("Error deleting interview:", error);
    res.status(500).json({ message: "Server error while deleting interview." });
  }
};

// Schedule Interview

const scheduleInterview = async (req, res) => {
  try {
    const { applicantId, date, time } = req.body;

    if (!applicantId || !date || !time) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Update applicant status and interview date
    const updatedApplicant = await Applicant.findByIdAndUpdate(
      applicantId,
      {
        status: "Interview Scheduled",
        interviewDate: new Date(`${date}T${time}`),
      },
      { new: true }
    );

    if (!updatedApplicant) {
      return res.status(404).json({ message: "Applicant not found." });
    }

    res.status(201).json({ message: "Interview scheduled successfully!" });
  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ message: "Server error while scheduling interview." });
  }
};

// Get all scheduled interviews
const getScheduledInterviews = async (req, res) => {
  try {
    const interviews = await Applicant.find({ status: "Interview Scheduled" });
    res.status(200).json(interviews);
  } catch (error) {
    console.error("Error fetching scheduled interviews:", error);
    res.status(500).json({ message: "Server error while fetching interviews." });
  }
};

const createApplicant = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      highestQualification,
      institutionName,
      graduationYear,
      skills,
      resumeUrl,
      portfolioUrl,
      githubUrl,
      linkedinUrl,
      whyHire,
      preferredType,
      willingToRelocate,
      job,
      user
    } = req.body;

    const newApplicant = new Applicant({
      name,
      email,
      phone,
      location,
      highestQualification,
      institutionName,
      graduationYear,
      skills,
      resumeUrl,
      portfolioUrl,
      githubUrl,
      linkedinUrl,
      whyHire,
      preferredType,
      willingToRelocate,
      job,
      user,
      status: "Applied" // Default status
    });

    await newApplicant.save();
    res.status(201).json(newApplicant);
  } catch (error) {
    console.error("Error adding applicant:", error);
    res.status(400).json({ message: 'Error adding applicant', error });
  }
};

// PUT (edit) an applicant
const updateApplicant = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      location, 
      highestQualification, 
      institutionName, 
      graduationYear, 
      skills, 
      resumeUrl, 
      portfolioUrl, 
      githubUrl, 
      linkedinUrl, 
      whyHire, 
      preferredType, 
      willingToRelocate, 
      job, 
      user 
    } = req.body;

    const updatedApplicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        location,
        highestQualification,
        institutionName,
        graduationYear,
        skills,
        resumeUrl,
        portfolioUrl,
        githubUrl,
        linkedinUrl,
        whyHire,
        preferredType,
        willingToRelocate,
        job,
        user
      },
      { new: true }
    );

    res.json(updatedApplicant);
  } catch (error) {
    console.error("Error updating applicant:", error);
    res.status(400).json({ message: 'Error updating applicant', error });
  }
};


// DELETE an applicant
const deleteApplicant = async (req, res) => {
  try {
    await Applicant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Applicant deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting applicant', error });
  }
};

// PUT – Shortlist an applicant
const shortlistApplicant = async (req, res) => {
  try {
    const updated = await Applicant.findByIdAndUpdate(
      req.params.id,
      { status: 'Shortlisted' },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error shortlisting applicant', error });
  }
};




module.exports = {
  getPartnerCompanies,
  postJob,
  getJob,
  updateJob,
  deleteJob,
  getApplicants,
  updateInterview,
  addPartnerCompany,
  updatePartnerCompany,
  deletePartnerCompany,
  scheduleInterview,
  createApplicant,
  updateApplicant,
  deleteApplicant,
  shortlistApplicant,
  deleteInterview,
  getScheduledInterviews,
};
