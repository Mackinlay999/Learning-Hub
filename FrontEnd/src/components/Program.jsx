import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../style/Program.css";

const programCategories = [
  { name: "HR"  },
  { name: "Marketing" },
  { name: "Sales" },
  { name: "Business Analyst" },
  { name: "Finance"},
];

const programs = {
  HR: [{ title: "Human Resource (HR) Training Program", duration: "3 months", mode: "Online" }],
  Marketing: [{ title: "Marketing Training Program", duration: "3 months", mode: "Online" }],
  Sales: [{ title: "Professional Sales Specialist Certification Program", duration: "3 months", mode: "Online" }],
  "Business Analyst": [{ title: "Business  Analytics Training Program", duration: "3 months", mode: "Online" }],
  Finance: [{ title: "Finance Training Program", duration: "3 months", mode: "Online" }],
};

const quickLinks = [
  { title: "Salary Builder", desc: "Compare your salary v/s peers" },
  { title: "Career Growth", desc: "Enhance your career path" },
  { title: "On-Demand Webinars", desc: "Watch recorded webinars" },
];

const Program = ({ showDropdown, setShowDropdown }) => {
  const [selectedCategory, setSelectedCategory] = useState("Our Training Program");
  const navigate = useNavigate();

  const programList = useMemo(() => {
    return selectedCategory === "Our Training Program"
      ? Object.values(programs).flat()
      : programs[selectedCategory] || [];
  }, [selectedCategory]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const closeDropdown = () => setShowDropdown(false);

  return (
    <div
      className="program-dropdown-container"
      onMouseLeave={closeDropdown}
      onMouseEnter={() => setShowDropdown(true)}
    >
      <button
        className="program-dropdown-explore-program-btn"
        aria-haspopup="true"
        aria-expanded={showDropdown}
      >
        Explore Program
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className="program-dropdown-menu-container"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="program-dropdown-content">
              <aside className="program-dropdown-sidebar" aria-label="Program Categories">
                <strong className="program-dropdown-sidebar-title">Programs</strong>
                <div
                  className={`program-dropdown-sidebar-item ${selectedCategory === "Our Training Program" ? "active" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCategoryChange("Our Training Program")}
                >
                  ⭐ <span>Our Training Program</span>
                </div>
                {programCategories.map(({ name }) => (
                  <div
                    key={name}
                    className={`program-dropdown-sidebar-item ${selectedCategory === name ? "active" : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleCategoryChange(name)}
                    aria-label={`Select ${name} category`}
                  >
                     <span>{name}</span>
                  </div>
                ))}
              </aside>

              <section className="program-dropdown-2" aria-label="Programs List">
                <strong>{selectedCategory} Programs</strong>
                <div className="program-dropdown-grid2">
                  {programList.map((program, index) => (
                    <div
                      key={index}
                      className="program-dropdown-card2"
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${program.title}`}
                      onClick={() => {
                        closeDropdown();
                        const lowerTitle = program.title.toLowerCase();
                      
                        if (lowerTitle.includes("business analytics")) {
                          navigate("/program/business", { state: program });
                        } else if (lowerTitle.includes("hr")) {
                          navigate("/program/hr", { state: program });
                        } else if (lowerTitle.includes("marketing")) {
                          navigate("/program/marketing", { state: program });
                        } else if (lowerTitle.includes("sales")) {
                          navigate("/program/sales", { state: program });
                        } else if (lowerTitle.includes("finance")) {
                          navigate("/program/finance", { state: program });
                        } else {
                          navigate(`/program/${program.title.split(" ")[0]}`, { state: program });
                        }
                      }}
                    >
                      <strong>{program.title}</strong>
                      <p>{program.duration} • {program.mode}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="program-dropdown-quick-links" aria-label="Quick Links">
                <h5>Quick Links</h5>
                {quickLinks.map((link, index) => (
                  <div key={index} className="program-dropdown-quick-link-item">
                    <strong>{link.title}</strong>
                    <p>{link.desc}</p>
                  </div>
                ))}
                <button
                  className="program-dropdown-close-btn1"
                  onClick={closeDropdown}
                  aria-label="Close dropdown"
                >
                  ✖
                </button>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Program;
