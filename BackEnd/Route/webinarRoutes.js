const express = require("express");
const { createWebinar, getAllWebinars, getRegistrants,exportAttendance } = require("../Controller/webinarController");

const router = express.Router();

// Route for creating a new webinar
router.post("/webinars", createWebinar);

// Route for getting all webinars
router.get("/webinars", getAllWebinars);
router.get("/webinars/registrants", getRegistrants);
router.get("/webinars/export", exportAttendance);

module.exports = router;
