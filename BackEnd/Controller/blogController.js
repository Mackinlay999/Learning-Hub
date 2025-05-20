const Blog = require("../Model/blogModel");

// Create a blog
const createBlog = async (req, res) => {
  try {
    const { title, content, publish } = req.body;

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const publishBool = publish === "true" || publish === true;

    const newBlog = new Blog({
      title,
      content,
      blogImage: imageUrl,
      publish: publishBool,
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: {
        blogTitle: newBlog.title,
        blogContent: newBlog.content,
        blogImage: newBlog.blogImage,
        publish: newBlog.publish,
        _id: newBlog._id,
        createdAt: newBlog.createdAt,
        updatedAt: newBlog.updatedAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating blog",
      error: error.message,
    });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    const formattedBlogs = blogs.map((blog) => ({
      blogTitle: blog.title,
      blogContent: blog.content,
      blogImage: blog.blogImage,
      publish: blog.publish,
      _id: blog._id,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));

    res.status(200).json({ blogs: formattedBlogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
};


module.exports = { createBlog, getAllBlogs };
