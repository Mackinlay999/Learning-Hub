import React from "react";
import "../style/ProgramTraning.css";

const ProgramsTraning = () => {
  return (
    <section className="programs-section">
      <div className="container">
        <div className="programs-content">

        <div className="programs-image">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.MVVzBWS4CY3GYyfE2sMwogHaEK&pid=Api&P=0&h=220"
              alt="Programs & Courses"
            />
          </div> 
          
          <div className="programs-text">
            <h2 className="program-title">Programs & Courses</h2>
            <p className="subtitle">Elevate Your Learning, Redefine Your Career</p>
            <p className="description">
              Mackinlay Learning Hub offers a suite of elite programs that embody 
              academic prestige and industry relevance. Each course is designed to 
              deliver unparalleled intellectual growth, real-world applicability, 
              and career transformation.
            </p>
            <ul className="programs-list">
              <li>HR Leadership & Talent Management</li>
              <li>Strategic Sales & Marketing Excellence</li>
              <li>Finance & Business Analytics Mastery</li>
              <li>Corporate Leadership & Executive Education</li>
              <li>AI-Driven HR & Workforce Transformation</li>
            </ul>
            <p className="description">
              Our courses integrate case studies, AI-driven learning, and interactive 
              modules, ensuring a world-class education that positions you at the 
              forefront of industry evolution.
            </p>
            <p className="highlight">Transform Knowledge into Impact.</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ProgramsTraning ;
