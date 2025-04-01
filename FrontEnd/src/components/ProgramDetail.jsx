import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPhone, FaStar } from "react-icons/fa";
import "../style/ProgramDetail.css";
import hr from "../images/hr.png";

// Program Details Page
const ProgramDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const program = location.state;

  if (!program) {
    return <p>No program details found.</p>;
  }

  return (
    <motion.div 
      className="program-detail-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Content Wrapper */}
      <div className="program-content">
        {/* Image Section */}
        <motion.div 
          className="program-banner"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={program.image || hr}
            alt={program.title}
          />
        </motion.div>

        {/* Details Section */}
        <motion.div 
          className="program-info"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2>{program.title}</h2>
          <p className="program-description">
            Build a successful career in {program.title}. Gain expertise in cutting-edge technologies and earn certifications from leading institutions.
          </p>

          <div className="program-features">
            <div><strong>📚 Duration:</strong> {program.duration}</div>
            <div><strong>⭐ Rating:</strong> 4.72 <FaStar /> (9,245 ratings)</div>
            <div><strong>🧠 Hands-On Learning:</strong> Real-world case studies</div>
            <div><strong>🎓 Live Mentorship:</strong> From industry professionals</div>
          </div>

          <div className="program-application-deadline">
            <FaPhone /> <strong>Application closes on:</strong> 5th Apr 2025
          </div>

          {/* Buttons */}
          <div className="program-buttons">
            <motion.button 
              className="download-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              📄 Download Brochure
            </motion.button>
            <motion.button 
              className="apply-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              🚀 Apply Now
            </motion.button>
          </div>

          {/* Contact Section */}
          <div className="program-contact">
            <FaPhone /> <span>Speak with our expert: </span>
            <a href="tel:08047189252">080-4718-9252</a>
          </div>

          {/* Back Button */}
          <motion.button 
            className="back-btn"
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ⬅ Back
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProgramDetail;

