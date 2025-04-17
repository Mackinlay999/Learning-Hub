const express = require("express");
const { createBlog, getAllBlogs } = require("../Controller/blogController");

const router = express.Router();

// Route for creating a new blog
router.post("/blog", createBlog);

// Route for getting all blogs
router.get("/blog", getAllBlogs);

module.exports = router;
