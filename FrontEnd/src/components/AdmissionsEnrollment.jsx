import React from "react";
import "../style/AdmissionsEnrollment.css";

const AdmissionsEnrollment = () => {
  return (
    <section className="admissions-section">
      <div className="container">
        <div className="admissions-content">

        <div className="admissions-image">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.YtOi7kIDUpZiupFrTAZxJwHaDL&pid=Api&P=0&h=220"
              alt="Admissions & Enrollment"
            />
          </div>

          <div className="admissions-text">
            <h2 className="admission-title">Admissions & Enrollment</h2>
            <p className="subtitle">Your Pathway to Elite Education</p>
            <p className="description">
              Admission to Mackinlay Learning Hub is highly selective, ensuring a cohort of 
              ambitious, high-achieving learners. Our merit-based enrollment process identifies 
              individuals with a passion for excellence and a drive for impactful leadership.
            </p>
            <p className="highlight">Join an elite community of future leaders.</p>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default AdmissionsEnrollment;
