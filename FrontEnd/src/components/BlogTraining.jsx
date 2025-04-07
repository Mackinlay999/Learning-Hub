import React from "react";
import { motion } from "framer-motion";
import image1 from "../images/3.png"
import image2 from "../images/1.png"
import "../style/BlogTraining.css"
const BlogTraining = () => {
  return (
    <>
        <motion.div className="blog-container">
      <motion.div
        className="blog-content"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="blog-title">
          Blog & <motion.span>Insights</motion.span>
        </h1>
        <p className="blog-description">
          Stay ahead with in-depth articles, research-backed insights, and expert 
          perspectives on education, business, and technology.
        </p>
        <p className="blog-description">
          Our blog is a resource hub for professionals seeking to enhance their 
          knowledge and career trajectory.
        </p>
        <motion.button
          className="blog-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Stay Informed. Stay Inspired.
        </motion.button>
      </motion.div>

      <motion.div
        className="blog-image"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={image1} alt="Blog & Insights" />
      </motion.div>
    </motion.div>
    <motion.div className="blog-training-container">
    <motion.div
      className="blog-training-content"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="blog-training-title">
        Free Online <motion.span>Program</motion.span>
      </h1>
      <p className="blog-training-description">
        Access high-quality, industry-relevant Program at no cost.  
      </p>
      <p className="blog-training-description">
        Expand your skill set with our free online learning modules, designed to 
        enhance your expertise and career prospects.
      </p>
      <motion.button
        className="blog-training-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Start Learning Today.
      </motion.button>
    </motion.div>

    <motion.div
      className="blog-training-image"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <img src={image2} alt="Free Online Courses" />
    </motion.div>
  </motion.div>
    </>
  );
};

export default BlogTraining;
