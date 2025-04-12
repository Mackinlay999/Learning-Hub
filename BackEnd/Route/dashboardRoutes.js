const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../Controller/DashboardController'); // Import the controller

// Define route for fetching dashboard data
router.get('/dashboard', getDashboardData);

module.exports = router;
