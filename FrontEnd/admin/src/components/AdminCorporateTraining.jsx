import React from "react";
import "../style/AdminCorporateTraining.css";

const AdminCorporateTraining = () => {
  return (
    <section className="corporate-section">
      <div className="container">
        <div className="corporate-content">
        <div className="corporate-image">
            <img
              src="https://e4p6s2a8.rocketcdn.me/wp-content/uploads/2022/03/corporate-trainer-min-scaled-e1647028590169.jpeg"
              alt="Corporate Training & Executive Education"
            />
          </div>

          <div className="corporate-text">
            <h2 className="corporate-title">Corporate Training & Executive Education</h2>
            <p className="subtitle">Empowering Organizations. Transforming Leadership.</p>
            <p className="description">
              Our custom corporate training programs are designed for Fortune 500 companies 
              and global enterprises. We specialize in executive education, leadership 
              development, and AI-driven workforce transformation, equipping professionals 
              with the skills to navigate the complexities of the modern business world.
            </p>
            <p className="highlight">Future-Ready Leaders Start Here.</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AdminCorporateTraining;
