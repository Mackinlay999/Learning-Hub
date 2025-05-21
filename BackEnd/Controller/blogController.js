const Blog = require("../Model/blogModel");
const createBlog = async (req, res) => {
  try {
    const { title, content, publish } = req.body;

    // Save relative path for image
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    // Convert publish to Boolean
    const publishBool = publish === "true" || publish === true;

    const newBlog = new Blog({ title, content, image: imagePath, publish: publishBool });
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