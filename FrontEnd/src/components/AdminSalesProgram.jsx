import React, { useState } from "react";
import "../style/AdminSales.css"; // Style separately

const AdminSalesProgram = () => {
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
    <div className="sales-container">
      <section className="sales-header">
        <h1 className="sales-title">Sales Mastery Program</h1>
        <div className="sales-info">
          <p><strong>Duration:</strong> 3 Months</p>
          <p><strong>Fees:</strong> ₹79,999 (INR)</p>
          <p><strong>Mode:</strong> Online</p>
          <p><strong>Certification:</strong> Certified Sales Strategist</p>
        </div>
        <div className="sales-cta-buttons">
          {/* <a href={brochure} download className="btn btn-primary">
            📄 Download Brochure
          </a> */}
          <button
            onClick={() => setShowFormModal(true)}
            className="sales-btn btn-success"
          >
            📝 Enroll Now
          </button>
        </div>
      </section>

      <section className="sales-overview">
        <h2>Program Overview</h2>
        <p>
          The Sales Mastery Program equips professionals with cutting-edge
          strategies in sales, customer psychology, funnel building, and CRM
          optimization. Learn from real-world case studies and interactive
          sessions to close more deals confidently.
        </p>
      </section>

      <section className="sales-curriculum">
        <h2>Curriculum Overview</h2>

        <div className="sales-module">
          <h3>Module 1: Fundamentals of Sales</h3>
          <p><strong>Objective:</strong> Understand the sales lifecycle and modern buyer behavior.</p>
          <ul>
            <li>Sales Psychology & Funnel Thinking</li>
            <li>Understanding B2B vs B2C Sales</li>
            <li>Building Customer Trust & Rapport</li>
          </ul>
        </div>

        <div className="sales-module">
          <h3>Module 2: Prospecting & Lead Generation</h3>
          <p><strong>Objective:</strong> Learn how to generate, qualify, and nurture leads effectively.</p>
          <ul>
            <li>Cold Calling & Email Outreach</li>
            <li>Lead Qualification Strategies</li>
            <li>CRM Tools: HubSpot, Zoho, Salesforce</li>
          </ul>
        </div>

        <div className="sales-module">
          <h3>Module 3: Pitching & Objection Handling</h3>
          <p><strong>Objective:</strong> Master techniques to pitch persuasively and address objections.</p>
          <ul>
            <li>Crafting Value-Based Pitches</li>
            <li>Handling Price, Timing, and Competitor Objections</li>
            <li>Role-Playing and Live Practice</li>
          </ul>
        </div>

        <div className="sales-module">
          <h3>Module 4: Closing & Follow-up</h3>
          <p><strong>Objective:</strong> Focus on deal closure and maintaining long-term relationships.</p>
          <ul>
            <li>Sales Closing Frameworks</li>
            <li>Negotiation & Offer Structuring</li>
            <li>Post-Sale Engagement Techniques</li>
          </ul>
        </div>
      </section>

      <section className="sales-benefits">
        <h2>Program Benefits</h2>
        <ul>
          <li>✅ Learn from Top Sales Mentors</li>
          <li>✅ Practice-Based Learning & Real-Time Projects</li>
          <li>✅ Access to CRM Tools like Salesforce & HubSpot</li>
          <li>✅ Job Assistance & Interview Preparation</li>
          <li>✅ Certification by Mackinlay Learning Hub</li>
        </ul>
      </section>

      <section className="sales-placement">
        <h2>Placement Assistance Provided</h2>
        <p>
          We support you with resume reviews, mock interviews, and job
          opportunities in B2B/B2C sales, SaaS sales, and client acquisition
          roles.
        </p>
      </section>

      <section className="sales-cta-final">
        <h3>Take the next step in your career!</h3>
        <p>
          Join our Sales Mastery Program and become a{" "}
          <strong>Certified Sales Strategist!</strong>
        </p>
        <button onClick={() => setShowFormModal(true)} className="sales-btn btn-info">
          Enroll Now
        </button>
      </section>

      {/* Enrollment Modal */}
      {showFormModal && (
        <div className="sales-modal-overlay">
          <div className="sales-form-modal">
            <h2>Enroll in Sales Mastery Program</h2>
            <form onSubmit={handleFormSubmit} className="sales-form">
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
              <div className="sales-form-buttons">
                <button type="submit" className="sales-btn btn-success">
                  Proceed to Payment
                </button>
                <button
                  type="button"
                  className="sales-btn-secondary"
                  onClick={() => setShowFormModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="sales-modal-overlay">
          <div className="sales-payment-modal">
            <h3>Confirm Payment</h3>
            <p>Proceed to pay ₹79,999 for the Sales Mastery Program</p>
            <a
              href="https://razorpay.me/@mackinlay?amount=NzSQ5U9nmvnRFvfnpmXM2A%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="sales-btn btn-success"
            >
              Pay Now
            </a>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="sales-btn sales-btn-secondary mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSalesProgram;
