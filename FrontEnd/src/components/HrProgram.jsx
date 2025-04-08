import React, { useState } from "react";
import "../style/Hr.css"; // Create and style separately
// import brochure from "../assets/Human Resources (HR) Training Program.pdf";
// import PaymentButton from "../components/PaymentButton"; // Adjust path if needed

const HrProgram = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowFormModal(false);
    setShowPaymentModal(true);
  };

  return (
    <div className="hr-program-container">
      <section className="hr-program-header-section">
        <h1>Human Resources Training Program</h1>
        <p>
          <strong>Duration:</strong> 3 Months
        </p>
        <p>
          <strong>Fees:</strong> ₹99,999 (INR)
        </p>
        <p>
          <strong>Mode:</strong> Online
        </p>
        <p>
          <strong>Certification:</strong> Certified HR Professional
        </p>
        <div className="hr-program-cta-buttons">
          {/* <a href={brochure} download className="btn btn-primary">📄 Download Brochure</a> */}
          <button
            onClick={() => setShowFormModal(true)}
            className="hr-program-btn btn-success"
          >
            📝 Enroll Now
          </button>
        </div>
      </section>

      <section className="hr-program-program-overview">
        <h2>Program Overview</h2>
        <p>
          The Human Resources Training Program provides comprehensive training
          in recruitment, employee engagement, labor law compliance, payroll,
          performance management, and HR analytics. It's ideal for aspiring HR
          professionals looking to enter or grow in the HR field.
        </p>
      </section>

      <section className="hr-program-curriculum">
        <h2>Curriculum Overview</h2>

        <div className="hr-program-module">
          <h3>Module 1: Foundations of Human Resources</h3>
          <h4>Objective:</h4>
          <p>
            Understand HR’s role in organizational development, functions, and
            ethical practices.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>Evolution and role of HR</li>
            <li>Organizational structure and policies</li>
            <li>HR as a strategic business partner</li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Case study: HR transformation in organizations</li>
            <li>Assignment: Draft HR mission statement</li>
          </ul>
        </div>

        <div className="hr-program-module">
          <h3>Module 2: Recruitment & Onboarding</h3>
          <h4>Objective:</h4>
          <p>
            Learn strategies for talent acquisition and efficient onboarding
            processes.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>Job analysis and description writing</li>
            <li>Sourcing & screening techniques</li>
            <li>Interviewing and selection</li>
            <li>Employee onboarding checklist</li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Project: Create a recruitment pipeline</li>
            <li>Mock interview session</li>
          </ul>
        </div>

        <div className="hr-program-module">
          <h3>Module 3: HR Operations & Compliance</h3>
          <h4>Objective:</h4>
          <p>
            Master daily HR operations including payroll, leave, and compliance
            with labor laws.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>Payroll management and benefits</li>
            <li>Leaves, attendance, employee lifecycle</li>
            <li>Labor laws: PF, ESI, Gratuity, and more</li>
            <li>Handling grievances and disputes</li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Project: Payroll calculation assignment</li>
            <li>Quiz: Indian labor law basics</li>
          </ul>
        </div>

        <div className="hr-program-module">
          <h3>module 4: Performance & HR Analytics</h3>
          <h4>Objective:</h4>
          <p>
            Learn how to assess performance and make data-driven HR decisions.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>KPI setting & performance appraisal</li>
            <li>Employee engagement strategies</li>
            <li>Introduction to HR analytics tools (Excel, Power BI)</li>
            <li>Retention & exit interviews</li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Dashboard project using Excel</li>
            <li>Case study on performance appraisal methods</li>
          </ul>
        </div>
      </section>

      <section className="hr-program-benefits">
        <h2>Program Benefits</h2>
        <ul>
          <li>✅ Real-world HR tools training (Zoho People, Excel, etc.)</li>
          <li>✅ Placement assistance and resume workshops</li>
          <li>✅ Live case studies and capstone project</li>
          <li>✅ Certificate recognized by top HR professionals</li>
        </ul>
      </section>

      <section className="hr-program-placement-assistance">
        <h2>Placement Assistance Provided</h2>
        <p>
          We offer career support including mock interviews, job referrals, and
          personalized guidance to help you land your first or next HR role.
        </p>
      </section>

      <section className="hr-program-cta-section">
        <h3>Advance your HR career now!</h3>
        <p>
          Join our Human Resources Training Program and become a{" "}
          <strong>Certified HR Professional!</strong>
        </p>
        <button onClick={() => setShowFormModal(true)} className="hr-program-btn btn-info">
          Enroll Now
        </button>
      </section>

      {/* Modal - Enrollment Form */}
      {showFormModal && (
        <div className="hr-program-modal-overlay">
          <div className="hr-program-enroll-modal">
            <h2>Enroll in HR Training Program</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="hr-program-btn  btn-success">
                Proceed to Payment
              </button>
              <button
                type="button"
                className="hr-program-btn btn-secondary"
                onClick={() => setShowFormModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal - Payment */}
      {showPaymentModal && (
        <div className="hr-program-modal-overlay">
          <div className="hr-program-payment-modal">
            <h3>Confirm Payment</h3>
            <p>Proceed to pay ₹79,999 for the Sales Mastery Program</p>
            <a
              href="https://razorpay.me/@mackinlay?amount=NzSQ5U9nmvnRFvfnpmXM2A%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="hr-program-btn btn-success"
            >
              Pay Now
            </a>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="hr-program-btn btn-secondary mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrProgram;
