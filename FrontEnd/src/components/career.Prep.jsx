import React from "react";
import "../style/CareerPrep.css";

const CareerPrep = () => {
  return (
    <div className="career-prep-container">
      <div className="career-text">
        <h2>Career Prep</h2>
        <p>
          Learn from leading academicians in the field of data science and
          business analytics and several experienced industry practitioners from
          top organizations.
        </p>
        <button className="counseling-button">Get Counseling Call</button>
      </div>
      <div className="career-cards">
        <div className="card yellow-card">
          <h3>4.7/5</h3>
          <p>Avg Mentorship Rating</p>
        </div>
        <div className="card pink-card">
          <h3>1:1</h3>
          <p>Program Support</p>
        </div>
      </div>
    </div>
  );
};

export default CareerPrep;
