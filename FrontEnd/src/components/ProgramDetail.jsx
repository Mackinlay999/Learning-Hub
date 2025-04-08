import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPhone, FaStar } from "react-icons/fa";
import PaymentButton from "./PaymentButton";
import "../style/ProgramDetail.css";
import hr from "../images/hr.png";

// Program-specific detail components
import HRProgram from "../components/HrProgram";
import FinanceProgram from "../components/FinanceProgram";
import SalesProgram from "../components/SalesProgram";
import MarketingProgram from "../components/MarketingProgram";
import BusinessAnalytics from "../components/BussinessAnalytics";

const ProgramDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const program = location.state;
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  // Render the appropriate program detail component
  const renderProgramComponent = () => {
    const title = program?.title?.toLowerCase();

    if (title.includes("hr")) {
      return <HRProgram />;
    } else if (title.includes("finance")) {
      return <FinanceProgram />;
    } else if (title.includes("sales")) {
      return <SalesProgram />;
    } else if (title.includes("marketing")) {
      return <MarketingProgram />;
    } else if (title.includes("business analytics")) {
      return <BusinessAnalytics />;
    } else {
      return null;
    }
  };

  // Handle missing program data
  if (!program) {
    return (
      <motion.div
        className="program-detail-error-message"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>⚠ No program details found. Please go back and try again.</p>
        <motion.button
          className="program-detail-back-btn"
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
      <div className="program-detail-content">
        <motion.div
          className="program-detail-banner"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={program.image || hr}
            alt={program.title || "Program Image"}
            className="program-detail-responsive-img"
          />
        </motion.div>

        <motion.div
          className="program-detail-program-info"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="program-detail-title">{program.title || "Untitled Program"}</h2>
          <p className="program-detail-description">
            {program.description ||
              `Build a successful career in ${program.title}. Gain expertise in cutting-edge technologies and earn certifications from leading institutions.`}
          </p>

          <div className="program-detail-features">
            <div><strong>📚 Duration:</strong> {program.duration || "N/A"}</div>
            <div><strong>⭐ Rating:</strong> {program.rating || "4.72"} <FaStar /> (9,245 ratings)</div>
            <div><strong>🧠 Hands-On Learning:</strong> Real-world case studies</div>
            <div><strong>🎓 Live Mentorship:</strong> From industry professionals</div>
          </div>

          <div className="program-detail-application-deadline">
            <FaPhone /> <strong>Application closes on:</strong> {program.deadline || "5th Apr 2025"}
          </div>

          <motion.div
            className="program-detail-payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3>💰 Program Fee: ₹{program.price || "TBA"}</h3>
            {program.price ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <PaymentButton amount={program.price} user={storedUser} />
              </motion.div>
            ) : (
              <p>Contact us for pricing details.</p>
            )}
          </motion.div>

          <div className="program-detail-contact">
            <FaPhone /> <span>Speak with our expert: </span>
            <a href="tel:+91 9363352660">+91 9363352660</a>
          </div>

          {/* Dynamic Section for Program-Specific Content */}
          {renderProgramComponent()}

          <motion.button
            className="program-detail-back-btn"
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
