const Blog = require("../Model/blogModel");

// Create a new blog
const createBlog = async (req, res) => {
  try {
    const { title, content, image, publish } = req.body;
    const newBlog = new Blog({ title, content, image, publish });
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(400).json({ message: "Error creating blog", error: error.message });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: "Error fetching blogs", error: error.message });
  }
};

module.exports = { createBlog, getAllBlogs };
