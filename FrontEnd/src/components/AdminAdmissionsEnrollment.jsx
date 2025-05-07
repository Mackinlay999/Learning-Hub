import React from "react";
import "../style/AdminAdmissionsEnrollment.css";

const AdminAdmissionsEnrollment = () => {
  return (
    <section className="admin-admission-section">
      <div className="admin-admission-container">
        <div className="admin-admission-content">

          <div className="admin-admission-image">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.YtOi7kIDUpZiupFrTAZxJwHaDL&pid=Api&P=0&h=220"
              alt="Admissions & Enrollment"
            />
          </div>

          <div className="admin-admission-text">
            <h2 className="admin-admission-title">Admissions & Enrollment</h2>
            <p className="admin-admission-subtitle">Your Pathway to Elite Education</p>
            <p className="admin-admission-description">
              Admission to Mackinlay Learning Hub is highly selective, ensuring a cohort of 
              ambitious, high-achieving learners. Our merit-based enrollment process identifies 
              individuals with a passion for excellence and a drive for impactful leadership.
            </p>
            <p className="admin-admission-highlight">Join an elite community of future leaders.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdminAdmissionsEnrollment;
