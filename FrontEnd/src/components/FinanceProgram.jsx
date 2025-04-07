import React, { useState } from "react";
import "../style/Finance.css"; // Create this stylesheet separately
// import brochure from "../assets/Finance Training Program.pdf";
// import PaymentButton from "../components/PaymentButton"; // Adjust path if needed

const FinanceProgram = () => {
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
    <div className="finance-program-container">
      <section className="finance-program-header-section">
        <h1>Finance Training Program</h1>
        <p>
          <strong>Duration:</strong> 3 Months
        </p>
        <p>
          <strong>Fees:</strong> ₹65,999(INR)
        </p>
        <p>
          <strong>Mode:</strong> Online
        </p>
        <p>
          <strong>Certification:</strong> Certified Finance Professional
        </p>
        <div className="finance-program-cta-buttons">
          {/* <a href={brochure} download className="btn btn-primary">
            📄 Download Brochure
          </a> */}
          <button
            onClick={() => setShowFormModal(true)}
            className="finance-program-btn1 btn-success"
          >
            📝 Enroll Now
          </button>
        </div>
      </section>

      <section className="finance-program-overview">
        <h2>Program Overview</h2>
        <p>
          The Finance Training Program is crafted to provide students with
          essential knowledge in financial accounting, corporate finance,
          investment analysis, and fintech innovations. The course includes case
          studies, real-world simulations, and tools used in financial
          institutions globally.
        </p>
      </section>

      <section className="finance-program-curriculum">
        <h2>Curriculum Overview</h2>

        {/* Module 1 */}
        <div className="finance-program-module">
          <h3>Module 1: Fundamentals of Financial Accounting</h3>
          <h4>Objective:</h4>
          <p>
            Introduce learners to basic financial statements, accounting
            principles, and interpretation of balance sheets, income, and cash
            flow statements.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>Double-entry bookkeeping</li>
            <li>Understanding financial statements</li>
            <li>Accounting standards and compliance</li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Balance sheet case study</li>
            <li>Statement analysis quiz</li>
          </ul>
        </div>

        {/* Module 2 */}
        <div className="finance-program-module">
          <h3>Module 2: Corporate Finance & Budgeting</h3>
          <h4>Objective:</h4>
          <p>
            Provide insights into capital structure, risk management, and
            budgeting techniques used by financial managers.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>Time value of money</li>
            <li>Capital budgeting & cost of capital</li>
            <li>Risk-return analysis</li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Capital budgeting project</li>
            <li>Budget preparation assignment</li>
          </ul>
        </div>

        {/* Module 3 */}
        <div className="finance-program-module">
          <h3>Module 3: Investment Analysis</h3>
          <h4>Objective:</h4>
          <p>
            Teach students portfolio management, stock and bond valuation, and
            tools for investment decision making.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>Fundamental & technical analysis</li>
            <li>Valuation models</li>
            <li>Portfolio theory</li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Stock pitch presentation</li>
            <li>Investment portfolio simulation</li>
          </ul>
        </div>

        {/* Module 4 */}
        <div className="finance-program-module">
          <h3>Module 4: FinTech and Innovations</h3>
          <h4>Objective:</h4>
          <p>
            Explore modern financial technologies including digital payments,
            blockchain, and robo-advisors.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>Digital banking systems</li>
            <li>Cryptocurrencies & blockchain fundamentals</li>
            <li>AI in finance</li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Case study: Blockchain in finance</li>
            <li>Digital finance tool presentation</li>
          </ul>
        </div>
      </section>

      <section className="finance-program-benefits">
        <h2>Program Benefits</h2>
        <ul>
          <li>✅ Real-world finance case studies and simulations</li>
          <li>✅ Practical exposure to financial tools & platforms</li>
          <li>✅ Certification from Mackinlay Learning Hub</li>
          <li>✅ Job assistance and interview support</li>
          <li>✅ Learn from certified finance professionals</li>
        </ul>
      </section>

      <section className="finance-program-placement-assistance">
        <h2>Placement Assistance</h2>
        <p>
          We provide personalized career support including resume reviews,
          interview prep, and direct connections to hiring partners in finance.
        </p>
      </section>

      <section className="finance-program-cta-section">
        <h3>Ready to Transform Your Finance Career?</h3>
        <p>
          Join the Finance Training Program and become a{" "}
          <strong>Certified Finance Professional!</strong>
        </p>
        <button onClick={() => setShowFormModal(true)} className="finance-program-btn2 btn-info">
          Enroll Now
        </button>
      </section>

      {/* Modal - Enrollment Form */}
      {showFormModal && (
        <div className="finance-program-module-modal-overlay">
          <div className="finance-program-enroll-modal">
            <h2>Enroll in Finance Program</h2>
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
              <button type="submit" className="finance-program-btn btn-success">
                Proceed to Payment
              </button>
              <button
                type="button"
                className="finance-program-btn btn-secondary"
                onClick={() => setShowFormModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal - Payment Confirmation */}
      {showPaymentModal && (
        <div className="finance-program-module-modal-overlay">
          <div className="finance-program-module-payment-modal">
            <h3>Confirm Payment</h3>
            <p>Proceed to pay ₹79,999 for the Sales Mastery Program</p>
            <a
              href="https://razorpay.me/@mackinlay?amount=NzSQ5U9nmvnRFvfnpmXM2A%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="finance-btn btn-success"
            >
              Pay Now
            </a>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="finance-program-btn btn-secondary mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceProgram;
