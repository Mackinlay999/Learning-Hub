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

const postJob = async (req, res) => {
  const newJob = new Jobs(req.body);
  await newJob.save();
  res.status(201).json(newJob);
};

const getApplicants = async (req, res) => {
  const applicants = await Applicant.find().populate("user job");
  res.json(applicants);
};

// schedule interview
const updateInterview = async (req, res) => {
  const { id } = req.params;
  const updated = await Applicant.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updated);
};

// controller

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


// POST a new applicant
const createApplicant = async (req, res) => {
  try {
    const { name, email, resumeUrl } = req.body;
    const newApplicant = new Applicant({
      resume: resumeUrl,
      status: 'Applied',
    });

    // Temporarily attach name & email for frontend display
    newApplicant.name = name;
    newApplicant.email = email;

    await newApplicant.save();
    res.status(201).json(newApplicant);
  } catch (error) {
    res.status(400).json({ message: 'Error adding applicant', error });
  }
};

// PUT (edit) an applicant
const updateApplicant = async (req, res) => {
  try {
    const { name, email, resumeUrl } = req.body;
    const updated = await Applicant.findByIdAndUpdate(
      req.params.id,
      {
        resume: resumeUrl,
        name,
        email,
      },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
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

};
