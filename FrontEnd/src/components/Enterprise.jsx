import React from "react";
import { motion } from "framer-motion";
import image1 from "../images/3.png"
import "../style/Enterprise.css"
const Enterprise = () => {
  return (
    <section className="enterprise-container">
      <motion.div
        className="enterprise-content"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="enterprise-title">
          Building the Workforce of the{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Future
          </motion.span>
        </h1>
        <p className="enterprise-description">
          Mackinlay Learning Hub partners with leading corporations to deliver 
          tailored learning solutions that drive business growth and employee 
          excellence. 
        </p>
        <p className="enterprise-description">
          Our strategic collaborations with Fortune 500 companies ensure that our 
          learners gain exposure to the highest echelons of industry leadership.
        </p>
        <motion.button
          className="enterprise-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Let’s shape the future together.
        </motion.button>
      </motion.div>

      <motion.div
        className="enterprise-image"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={image1} alt="Enterprise" />
      </motion.div>
    </section>
  );
};

export default Enterprise;
