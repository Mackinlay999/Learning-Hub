// routes/recruiterRoutes.js
const express = require("express");
const router = express.Router();
const recruiterController = require("../Controller/recruiterController");

// Partner companies
router.get("/recruiters/partners", recruiterController.getPartnerCompanies);
// Add a new partner company
router.post("/recruiters/partners", recruiterController.addPartnerCompany);

// Update an existing partner company
router.put("/recruiters/partners/:id", recruiterController.updatePartnerCompany);

// Delete a partner company
router.delete("/recruiters/partners/:id", recruiterController.deletePartnerCompany);
// Post job/internship
router.post("/recruiters/post", recruiterController.postJob);

// View applicants
router.get("/recruiters/applicants", recruiterController.getApplicants);
// route
router.post("/recruiters/schedule", recruiterController.scheduleInterview);
// Shortlist/Schedule
router.put("/recruiters/schedule/:id", recruiterController.updateInterview);
// POST new applicant
router.post('/recruiters/applicants', recruiterController.createApplicant);

router.put('/recruiters/applicants/:id', recruiterController.updateApplicant);
router.delete('/recruiters/applicants/:id', recruiterController.deleteApplicant);
router.put('/recruiters/applicants/:id/shortlist', recruiterController.shortlistApplicant);

module.exports = router;
