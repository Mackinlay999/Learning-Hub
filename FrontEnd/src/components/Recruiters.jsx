import React from "react";
import { motion } from "framer-motion";
import "../style/Recruiters.css"
import image2 from "../images/1.png"
const Recruiters = () => {
  return (
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
  );
};

export default Recruiters;
