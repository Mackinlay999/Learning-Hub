const express = require("express");
const { createWebinar, getAllWebinars } = require("../Controller/webinarController");

const router = express.Router();

// Route for creating a new webinar
router.post("/webinars", createWebinar);

// Route for getting all webinars
router.get("/webinars", getAllWebinars);

module.exports = router;
