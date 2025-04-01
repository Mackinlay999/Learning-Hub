import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaChartLine,
  FaShoppingCart,
  FaBusinessTime,
  FaMoneyBillWave,
} from "react-icons/fa";
import "../style/Program.css";

const programCategories = [
  { name: "HR", icon: <FaUserTie /> },
  { name: "Marketing", icon: <FaChartLine /> },
  { name: "Sales", icon: <FaShoppingCart /> },
  { name: "Business Analyst", icon: <FaBusinessTime /> },
  { name: "Finance", icon: <FaMoneyBillWave /> },
];

const programs = {
  HR: [
    { title: "HR Leadership Program", duration: "3 months", mode: "Online" },
  ],
  Marketing: [
    {
      title: "Marketing Strategy Program",
      duration: "3 months",
      mode: "Online",
    },
  ],
  Sales: [
    {
      title: "Sales Mastery Certification",
      duration: "3 months",
      mode: "Online",
    },
  ],
  "Business Analyst": [
    {
      title: "Business Analytics Program",
      duration: "3 months",
      mode: "Online",
    },
  ],
  Finance: [
    {
      title: "Finance Management Program",
      duration: "3 months",
      mode: "Online",
    },
  ],
};

const quickLinks = [
  { title: "Salary Builder", desc: "Compare your salary v/s peers" },
  { title: "Career Growth", desc: "Enhance your career path" },
  { title: "On-Demand Webinars", desc: "Watch recorded webinars" },
];

const Program = ({ showDropdown, setShowDropdown }) => {
  const [selectedCategory, setSelectedCategory] = useState("Our Training Program");
  const navigate = useNavigate();

  // Memoizing program list for better performance
  const programList = useMemo(() => {
    return selectedCategory === "Our Training Program"
      ? Object.values(programs).flat()
      : programs[selectedCategory] || [];
  }, [selectedCategory]);

  // Click handler optimization
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  // Close dropdown
  const closeDropdown = () => setShowDropdown(false);

  return (
    <div className="program-container">
      {/* Explore Program Button */}
      <button
        className="explore-program-btn"
        onMouseEnter={() => setShowDropdown(true)} // Show dropdown on hover
        onMouseLeave={() => setShowDropdown(false)} // Hide dropdown when not hovering
      >
        Explore Program
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <motion.div
          className="program-dropdown-menu-container"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="program-dropdown-content">
            {/* Sidebar */}
            <div className="program-sidebar">
              <h5 className="program-sidebar-title">Programs</h5>
              <div
                className="program-sidebar-item"
                role="button"
                tabIndex="0"
                onClick={() => handleCategoryChange("Our Training Program")}
                aria-label="Select Our Training Program"
              >
                ⭐ <span>Our Training Program</span>
              </div>
              {programCategories.map((category, index) => (
                <div
                  key={index}
                  className="program-sidebar-item"
                  role="button"
                  tabIndex="0"
                  onClick={() => handleCategoryChange(category.name)}
                  aria-label={`Select ${category.name} program`}
                >
                  {category.icon} <span>{category.name}</span>
                </div>
              ))}
            </div>

            {/* Programs */}
            <div className="programs2">
              <strong>{selectedCategory} Programs</strong>
              <div className="program-grid2">
                {programList.map((program, index) => (
                  <div
                    key={index}
                    className="program-card2"
                    onClick={() =>
                      navigate(`/program/${program.title.split(" ")[0]}`, {
                        state: program,
                      })
                    }
                    role="button"
                    tabIndex="0"
                    aria-label={`View details for ${program.title}`}
                  >
                    <strong>{program.title}</strong>
                    <p>
                      {program.duration} • {program.mode}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="program-quick-links">
              <h5>Quick Links</h5>
              {quickLinks.map((link, index) => (
                <div key={index} className="program-quick-link-item">
                  <strong>{link.title}</strong>
                  <p>{link.desc}</p>
                </div>
              ))}
              <button
                className="program-close-btn1"
                onClick={closeDropdown} // Close dropdown when X is clicked
                aria-label="Close dropdown"
              >
                ✖
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Program;
