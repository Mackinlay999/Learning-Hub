const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getRecentApplications,
  getJobPerformance
} = require('../Controller/recruiterDashboardController');

const Auth = require('../Utils/Auth');

router.get('/recruiter/dashboard/stats', Auth.authverify, getDashboardStats);
router.get('/recruiter/dashboard/recent-applications', Auth.authverify, getRecentApplications);
router.get('/recruiter/dashboard/job-performance', Auth.authverify, getJobPerformance);

module.exports = router;
