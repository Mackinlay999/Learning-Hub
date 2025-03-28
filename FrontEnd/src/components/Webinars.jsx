import React from "react";
import { motion } from "framer-motion";
import image3 from "../images/2.png";
import "../style/Webinars.css";
const Webinars = () => {
  return (
    <section className="webinars-container">
      <motion.div
        className="webinars-content"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="webinars-title">
          Free Counselling{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Webinars
          </motion.span>
        </h1>
        <p className="webinars-description">
          Gain insights from our top educators and industry leaders through our 
          free webinars.  
        </p>
        <p className="webinars-description">
          Designed to help you make informed decisions about your career, these 
          sessions provide valuable knowledge on industry trends and professional 
          growth strategies.
        </p>
        <motion.button
          className="webinars-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Register Now. Unlock Your Potential.
        </motion.button>
      </motion.div>

      <motion.div
        className="webinars-image"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={image3} alt="Webinars" />
      </motion.div>
    </section>
  );
};

export default Webinars;
