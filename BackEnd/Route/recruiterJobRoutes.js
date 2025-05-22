const express = require('express');
const {
  createRecruiterJob,
  getAllRecruiterJobs,
  getRecruiterJobById,
  updateRecruiterJob,
  deleteRecruiterJob,
  applyToJob,
} = require ('../Controller/recruiterJobController.js');

const router = express.Router();

router.post('/recruiter/jobs', createRecruiterJob);        // POST /api/recruiters/jobs
router.get('/recruiter/jobs', getAllRecruiterJobs);        // GET /api/recruiters/jobs
router.get('/recruiter/jobs/:id', getRecruiterJobById);     // GET /api/recruiters/jobs/:id
router.put('/recruiter/jobs/:id', updateRecruiterJob);      // PUT /api/recruiters/jobs/:id
router.delete('/recruiter/jobs/:id', deleteRecruiterJob);   // DELETE /api/recruiters/jobs/:id
router.get('/apply/:id', applyToJob);

module.exports = router;
