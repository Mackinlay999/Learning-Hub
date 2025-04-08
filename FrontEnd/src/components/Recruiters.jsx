import React from "react";
import { motion } from "framer-motion";
import "../style/Recruiters.css"
import image2 from "../images/1.png"
import recruitersImage from "../images/recruiter.jpg"
import recruitersImage1 from "../images/why-hire-1.jpg"
import recruitersImage2 from "../images/why-hire-1.jpg"
import recruitersImage3 from "../images/why-hire-3.jpg"
const Recruiters = () => {
  return (
    <>
    <section className="recruiters-container">
      <motion.div
        className="recruiters-content"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="recruiters-title">
          Access{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Elite Talent
          </motion.span>
        </h1>
        <p className="recruiters-description">
          Our graduates are equipped with the skills, knowledge, and leadership 
          capabilities that global organizations seek.  
        </p>
        <p className="recruiters-description">
          Partner with us to recruit top-tier professionals who are ready to drive 
          impact from day one.
        </p>
        <motion.button
          className="recruiters-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Hire Excellence. Build the Future.
        </motion.button>
      </motion.div>

      <motion.div
        className="recruiters-image"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={image2} alt="Recruiters" />
      </motion.div>
    </section>
    <section className="recruiters-container1">
    {/* Left Content */}
    <motion.div
      className="recruiters-content1"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="recruiters-title1">
        Hire job-ready professionals, <motion.span>faster.</motion.span>
      </h1>
      <p className="recruiters-description1">
        Pick from our pool of qualified & pre-trained candidates. Increase your interview-to-offer ratio.
      </p>
      <p className="recruiters-highlight1">
        Lateral Hiring • Off-Campus Hiring • Campus Hiring
      </p>

      {/* Buttons */}
      <div className="recruiters-buttons1">
        <motion.button
          className="recruiters-callback-btn1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Request a Callback
        </motion.button>
        <motion.button
          className="recruiters-post-job-btn1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Post a Job for Free
        </motion.button>
      </div>

      {/* Stats */}
      <div className="recruiters-stats1">
        <div>
          <h2>1000+</h2>
          <p>Learners</p>
        </div>
        <div>
          <h2>Zero</h2>
          <p>Hiring Cost</p>
        </div>
        <div>
          <h2>1000+</h2>
          <p>Hiring Companies</p>
        </div>
      </div>
    </motion.div>

    {/* Right Image */}
    <motion.div
      className="recruiters-image1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <img src={recruitersImage} alt="Recruiters" />
    </motion.div>
  </section>
  <section className="recruiters-section2">
      {/* Image Section */}
      <motion.div
        className="recruiters-image2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={recruitersImage1} alt="Recruiters" />
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="recruiters-content2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="recruiters-heading2">Why hire from Mackinlay Learning Hub</h2>
        <h3 className="recruiters-subheading2">
          Immediately deployable candidates, <br /> all year round
        </h3>
        <p className="recruiters-text2">
          Hire candidates who’ve been trained in our industry-relevant programs, or
          with skills verified by industry experts.
        </p>
      </motion.div>
    </section>
    <section className="recruiters-section3">
      {/* Content Section */}
      <motion.div
        className="recruiters-content3"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="recruiters-heading3">A talent pool to meet all your needs</h2>
        <p className="recruiters-text3">
          Technology, data, and management – our candidates come with a wide
          range of experience and expertise, across skills and functions.
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="recruiters-image3"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={recruitersImage2} alt="Recruiters" />
      </motion.div>
    </section>
    <section className="recruiters-section4">
      {/* Left Side - Image */}
      <motion.div
        className="recruiters-image4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={recruitersImage3} alt="Recruitment Process" />
      </motion.div>

      {/* Right Side - Content */}
      <motion.div
        className="recruiters-content4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="recruiters-heading4">Customised Hiring Modes to meet your exact requirements</h2>
        <p className="recruiters-text4"><strong>Job Board:</strong> Post your requirements and attract a qualified & trained candidate pool.</p>
        <p className="recruiters-text4"><strong>GL eXcelerate Career Fair:</strong> Meet the best talent at our flagship career fairs organized in all metro cities.</p>
        <p className="recruiters-text4"><strong>Exclusive Hiring Drives:</strong> Conduct a recruitment drive exclusively for your organization.</p>
        <p className="recruiters-text4"><strong>Hackathons & Projects:</strong> Showcase your organization as an Employer of Choice and create a pipeline of hires.</p>
      </motion.div>
    </section>
    </>
  );
};

export default Recruiters;
