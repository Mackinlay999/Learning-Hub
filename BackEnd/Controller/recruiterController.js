// controllers/recruiterController.js
const Jobs = require("../Model/Job");
const Applicant = require("../Model/Applicant");
const Company = require("../Model/Company");

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

const updateApplicant = async (req, res) => {
  const { id } = req.params;
  const updated = await Applicant.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(updated);
};

module.exports = {
  getPartnerCompanies,
  postJob,
  getApplicants,
  updateApplicant,
  addPartnerCompany,
  updatePartnerCompany,
  deletePartnerCompany,
};
