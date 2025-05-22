const express = require('express');
const router = express.Router();
const studentDashboardController = require('../Controller/studentDashboardController');
const { authverify } = require('../Utils/Auth'); // <- destructure from Auth object

// Route for student dashboard data
router.get('/student/dashboard', authverify, studentDashboardController.getDashboardData);

module.exports = router;
