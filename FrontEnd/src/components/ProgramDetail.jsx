import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPhone, FaStar } from "react-icons/fa";
import PaymentButton from "./PaymentButton";
import "../style/ProgramDetail.css";
import hr from "../images/hr.png";

// Program Details Page
const ProgramDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const program = location.state;

  // Handle missing program data
  if (!program) {
    return (
      <motion.div
        className="error-message"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>⚠ No program details found. Please go back and try again.</p>
        <motion.button
          className="back-btn"
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ⬅ Back
        </motion.button>
      </motion.div>
    );
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
          <img src={program.image || hr} alt={program.title || "Program Image"} />
        </motion.div>

        {/* Details Section */}
        <motion.div
          className="program-info"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2>{program.title || "Untitled Program"}</h2>
          <p className="program-description">
            {program.description ||
              `Build a successful career in ${program.title}. Gain expertise in cutting-edge technologies and earn certifications from leading institutions.`}
          </p>

          {/* Features Section */}
          <div className="program-features">
            <div>
              <strong>📚 Duration:</strong> {program.duration || "N/A"}
            </div>
            <div>
              <strong>⭐ Rating:</strong> {program.rating || "4.72"} <FaStar /> (9,245 ratings)
            </div>
            <div>
              <strong>🧠 Hands-On Learning:</strong> Real-world case studies
            </div>
            <div>
              <strong>🎓 Live Mentorship:</strong> From industry professionals
            </div>
          </div>

          {/* Application Deadline */}
          <div className="program-application-deadline">
            <FaPhone /> <strong>Application closes on:</strong> {program.deadline || "5th Apr 2025"}
          </div>

          {/* Payment Section */}
          <motion.div
            className="program-payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3>💰 Program Fee: ₹{program.price || "TBA"}</h3>
            {program.price ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <PaymentButton amount={program.price} />
              </motion.div>
            ) : (
              <p>Contact us for pricing details.</p>
            )}
          </motion.div>

          {/* Contact Section */}
          <div className="program-contact">
            <FaPhone /> <span>Speak with our expert: </span>
            <a href="tel:+91 9363352660">+91 9363352660</a>
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
