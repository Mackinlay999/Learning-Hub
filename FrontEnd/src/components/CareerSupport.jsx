import React from "react";
import "../style/CareerSupport.css";

const CareerSupport = () => {
  return (
    <section className="career-section">
      <div className="container">
        <div className="career-content">
          <div className="career-image">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.Fz6aSVlQBw1PbpYEUUiqdAHaFj&pid=Api&P=0&h=220"
              alt="Career Support"
            />
          </div>
          <div className="career-text">
            <h2 className="title">Career Support</h2>
            <p className="subtitle">Unrivaled Career Acceleration</p>
            <p className="description">
              At Mackinlay Learning Hub, career success is not just a
              possibility—it’s a guarantee. Our dedicated career services team
              provides:
            </p>
            <ul className="career-list">
              <li>Personalized career coaching</li>
              <li>Exclusive access to top-tier job opportunities</li>
              <li>Industry networking with global leaders</li>
            </ul>
            <p className="description">
              Our graduates secure positions in leading multinational
              corporations, redefining their career trajectories with confidence
              and impact.
            </p>
            <p className="highlight">Your Career. Our Commitment.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerSupport;
