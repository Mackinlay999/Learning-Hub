import React, { useState } from "react";
import "../style/Marketing.css"; // create this CSS file separately
// import brochure from "../assets/Marketing Training Program.pdf"; // update path if needed
// import PaymentButton from "../components/PaymentButton"; // adjust path if needed

const MarketingProgram = () => {
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
    <div className="marketing-program-container">
      <section className="market-header-section">
        <h1>Digital Marketing Training Program</h1>
        <p>
          <strong>Duration:</strong> 3 Months
        </p>
        <p>
          <strong>Fees:</strong> ₹89,999 (INR)
        </p>
        <p>
          <strong>Mode:</strong> Online
        </p>
        <p>
          <strong>Certification:</strong> Certified Digital Marketing
          Professional
        </p>
        <div className="cta-buttons">
          {/* <a href={brochure} download className="btn btn-primary">📄 Download Brochure</a> */}
          <button
            onClick={() => setShowFormModal(true)}
            className="marketing-btn btn-success"
          >
            📝 Enroll Now
          </button>
        </div>
      </section>

      <section className="program-overview">
        <h2>Program Overview</h2>
        <p>
          This comprehensive Digital Marketing Training Program prepares
          students for the fast-paced world of online marketing. It covers SEO,
          SEM, social media marketing, email campaigns, content creation,
          analytics, and strategy building.
        </p>
      </section>

      <section className="curriculum">
        <h2>Curriculum Overview</h2>

        <div className="market-module">
          <h3>Module 1: Digital Marketing Fundamentals</h3>
          <h4>Objective:</h4>
          <p>
            Understand the core concepts and components of digital marketing.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>Introduction to Digital Marketing</li>
            <li>Customer Journey and Digital Funnels</li>
            <li>Branding and Online Presence</li>
            <li>Competitive Analysis</li>
          </ul>
        </div>

        <div className="market-module">
          <h3>Module 2: SEO and SEM</h3>
          <h4>Objective:</h4>
          <p>Optimize websites and run search engine marketing campaigns.</p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>On-page and Off-page SEO</li>
            <li>Google Ads and Pay-Per-Click</li>
            <li>Keyword Research Tools</li>
            <li>Performance Monitoring</li>
          </ul>
        </div>

        <div className="market-module">
          <h3>Module 3: Social Media & Content Marketing</h3>
          <h4>Objective:</h4>
          <p>
            Use platforms like Facebook, Instagram, LinkedIn for content and
            engagement.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>Social Media Strategies</li>
            <li>Content Calendars</li>
            <li>Hashtag & Trend Analysis</li>
            <li>Video and Graphic Content Creation</li>
          </ul>
        </div>

        <div className="market-module">
          <h3>Module 4: Analytics and Email Campaigns</h3>
          <h4>Objective:</h4>
          <p>
            Learn to track performance and run personalized email campaigns.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>Google Analytics & Tag Manager</li>
            <li>Conversion Tracking</li>
            <li>Email Tools: Mailchimp, SendinBlue</li>
            <li>Drip Campaigns & A/B Testing</li>
          </ul>
        </div>
      </section>

      <section className="market-program-benefits">
        <h2>Program Benefits</h2>
        <ul>
          <li>✅ Learn from industry experts</li>
          <li>✅ Real-world campaigns and projects</li>
          <li>✅ Tools covered: Google Ads, Canva, Mailchimp, GA4, HubSpot</li>
          <li>✅ Resume building and LinkedIn optimization</li>
          <li>✅ Industry-recognized certification</li>
        </ul>
      </section>

      <section className="placement-assistance">
        <h2>Placement Assistance Provided</h2>
        <p>
          Our career services include mock interviews, resume reviews, and
          connections with recruiters in top digital marketing firms and
          startups.
        </p>
      </section>

      <section className="cta-section">
        <h3>Launch Your Career in Digital Marketing!</h3>
        <p>
          Enroll today and become a{" "}
          <strong>Certified Digital Marketing Professional</strong>!
        </p>
        <button onClick={() => setShowFormModal(true)} className="marketing-btn btn-info">
          Enroll Now
        </button>
      </section>

      {/* Modal - Enrollment Form */}
      {showFormModal && (
        <div className="market-modal-overlay">
          <div className="market-enroll-modal">
            <h2>Enroll in Marketing Program</h2>
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
              <button type="submit" className="marketing-btn btn-success">
                Proceed to Payment
              </button>
              <button
                type="button"
                className="marketing-btn btn-secondary"
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
        <div className="market-modal-overlay">
          <div className="market-payment-modal">
            <h3>Confirm Payment</h3>
            <p>Proceed to pay ₹79,999 for the Sales Mastery Program</p>
            <a
              href="https://razorpay.me/@mackinlay?amount=NzSQ5U9nmvnRFvfnpmXM2A%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="marketing-btn btn-success"
            >
              Pay Now
            </a>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="marketing-btn btn-secondary mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingProgram;
