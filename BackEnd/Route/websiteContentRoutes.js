const express = require("express");
const router = express.Router();
const { saveContent, getContent } = require("../Controller/websiteContentController.js");

// GET content
router.get("/website-content", getContent);

// POST/PUT content
router.post("/website-content", saveContent);

module.exports = router;
