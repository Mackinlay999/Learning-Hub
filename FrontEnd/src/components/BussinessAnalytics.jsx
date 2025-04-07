import React, { useState } from "react";
import "../style/businessAnalytics.css"; // (create and style separately)
// import brochure from "../assets/Business Analytics Training Program.pdf";
import PaymentButton from "../components/PaymentButton"; // adjust path if needed

const BusinessAnalytics = () => {
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
    <div className="business-analytics-container">
      <section className="business-analytics-header-section">
        <h1>Business Analytics Training Program</h1>
        <p>
          <strong>Duration:</strong> 3 Months
        </p>
        <p>
          <strong>Fees:</strong> ₹1,29,999 (INR)
        </p>
        <p>
          <strong>Mode:</strong> Online
        </p>
        <p>
          <strong>Certification:</strong> Certified Business Analytics
          Professional
        </p>
        <div className="business-analytics-cta-buttons">
          {/* <a href={brochure} download className="btn btn-primary">
            📄 Download Brochure
          </a> */}
          <button
            onClick={() => setShowFormModal(true)}
            className="business-analytics-btn1 btn-success"
          >
            📝 Enroll Now
          </button>
          {/* {showModal && (
            <div className="payment-modal">
              <div className="payment-modal-content">
                <h3>Confirm Payment</h3>
                <p>
                  Proceed to pay ₹1,29,999 for the Business Analytics Training
                  Program
                </p>
                <PaymentButton amount={12999900} user={user} />
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary mt-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )} */}
        </div>
      </section>

      <section className="business-analytics-program-overview">
        <h2>Program Overview</h2>
        <p>
          The Business Analytics Training Program is designed to equip students
          with essential skills in data analysis, visualization, predictive
          modeling, and big data applications. This comprehensive course offers
          hands-on experience with real-world datasets, industry-relevant tools,
          and case studies to prepare students for data-driven decision-making
          roles.
        </p>
      </section>

      <section className="business-analytics-curriculum">
        <h2>Curriculum Overview</h2>

        {/* Module 1 */}
        <div className="bussiness-module">
          <h3>Module 1: Introduction to Business Analytics</h3>
          <h4>Objective:</h4>
          <p>
            To introduce students to the fundamental concepts of business
            analytics, its role in decision-making, and various data types and
            tools used in analytics.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>
              Role of Analytics in Business
              <ul>
                <li>Importance of data-driven decision-making</li>
                <li>Applications in finance, marketing, HR, healthcare</li>
                <li>Evolution of business intelligence and data science</li>
              </ul>
            </li>
            <li>
              Understanding Data Types and Sources
              <ul>
                <li>Structured vs. unstructured data</li>
                <li>Internal vs. external data sources</li>
                <li>
                  Data collection methods (surveys, web scraping, IoT, etc.)
                </li>
              </ul>
            </li>
            <li>
              Overview of Analytical Tools
              <ul>
                <li>Excel, SQL, Python, R</li>
                <li>Tableau, Power BI</li>
                <li>Cloud tools: Google Analytics, AWS, Azure</li>
              </ul>
            </li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Case study on the impact of analytics on decision-making</li>
            <li>Project: Collect and clean dataset using SQL</li>
            <li>Presentation on analytics tools</li>
          </ul>
        </div>

        {/* Module 2 */}
        <div className="bussiness-module">
          <h3>Module 2: Data Visualization and Reporting</h3>
          <h4>Objective:</h4>
          <p>
            To teach students how to represent data effectively using
            visualization techniques, build dashboards, and create meaningful
            business reports.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>
              Visualization Techniques
              <ul>
                <li>Bar charts, histograms, scatter plots, heatmaps</li>
                <li>Data storytelling best practices</li>
                <li>Color, labels, scaling in visualizations</li>
              </ul>
            </li>
            <li>
              Dashboard Creation
              <ul>
                <li>Interactive dashboards using Tableau and Power BI</li>
                <li>Data source connection and transformations</li>
                <li>Project: Build a sales dashboard</li>
              </ul>
            </li>
            <li>
              Reporting Standards
              <ul>
                <li>Executive reports</li>
                <li>KPI tracking and benchmarking</li>
                <li>
                  Automating reports with Google Data Studio and Excel Macros
                </li>
              </ul>
            </li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Project: Dashboard using business data</li>
            <li>Exercise: Automate financial report in Excel</li>
            <li>Case study on visualization for decision-making</li>
          </ul>
        </div>

        {/* Module 3 */}
        <div className="bussiness-module">
          <h3>Module 3: Predictive Analytics</h3>
          <h4>Objective:</h4>
          <p>
            To introduce students to predictive modeling techniques, statistical
            analysis, and machine learning basics to forecast business trends.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>
              Statistical Modeling
              <ul>
                <li>Probability, statistics</li>
                <li>Linear/logistic regression</li>
                <li>Hypothesis testing, A/B testing</li>
              </ul>
            </li>
            <li>
              Forecasting
              <ul>
                <li>Time series: ARIMA, smoothing</li>
                <li>Demand forecasting</li>
                <li>Sentiment analysis</li>
              </ul>
            </li>
            <li>
              Machine Learning Basics
              <ul>
                <li>Supervised vs. unsupervised learning</li>
                <li>Classification and clustering</li>
                <li>Python for ML (scikit-learn, TensorFlow basics)</li>
              </ul>
            </li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Project: Predictive model for churn</li>
            <li>Statistical report on market trends</li>
            <li>Sales forecasting project</li>
          </ul>
        </div>

        {/* Module 4 */}
        <div className="bussiness-module">
          <h3>Module 4: Big Data Applications</h3>
          <h4>Objective:</h4>
          <p>
            To introduce students to big data technologies, data mining
            techniques, and real-world applications of big data in business.
          </p>
          <h4>Topics Covered:</h4>
          <ul>
            <li>
              Big Data Technologies
              <ul>
                <li>Hadoop, Spark, NoSQL</li>
                <li>Cloud big data: AWS, Google Cloud, Azure</li>
                <li>Industry applications</li>
              </ul>
            </li>
            <li>
              Data Mining
              <ul>
                <li>Classification, clustering, association rules</li>
                <li>Text mining, sentiment analysis</li>
                <li>Customer segmentation</li>
              </ul>
            </li>
            <li>
              Case Studies
              <ul>
                <li>Retail: Amazon, Walmart</li>
                <li>Healthcare: Predictive disease detection</li>
                <li>Finance: Fraud detection</li>
              </ul>
            </li>
          </ul>
          <h4>Assessments:</h4>
          <ul>
            <li>Case study: Big data in e-commerce</li>
            <li>Project: Analyze dataset with Hadoop/Spark</li>
            <li>Presentation: Big data and AI trends</li>
          </ul>
        </div>
      </section>

      <section className="bussiness-program-benefits">
        <h2>Program Benefits</h2>
        <ul>
          <li>
            ✅ Global Industry Alignment – Training aligned with data science
            and analytics industry standards
          </li>
          <li>✅ Hands-on Learning – Work on real-world business problems</li>
          <li>
            ✅ Practical Skills – Excel, SQL, Python, Tableau, Power BI, cloud
            tools
          </li>
          <li>
            ✅ Placement Assistance – Career guidance, resume building, job
            referrals
          </li>
          <li>
            ✅ Industry Certification – Certified by Mackinlay Learning Hub
          </li>
        </ul>
      </section>

      <section className="business-analytics-placement-assistance">
        <h2>Placement Assistance Provided</h2>
        <p>
          We are committed to helping students secure roles in business
          analytics, data science, and related fields. Our support includes
          career guidance, resume building, interview preparation, and job
          referrals.
        </p>
      </section>

      <section className="business-analytics-cta-section">
        <h3>Take the next step in your career!</h3>
        <p>
          Join our Business Analytics Training Program and become a{" "}
          <strong>Certified Business Analytics Professional!</strong>
        </p>
      </section>
      {/* Call to Action */}
      <section className="business-analytics-cta-section">
        <h3>Take the next step in your career!</h3>
        <p>
          Join our Business Analytics Training Program and become a{" "}
          <strong>Certified Business Analytics Professional!</strong>
        </p>
        <button onClick={() => setShowFormModal(true)} className="business-analytics-btn2 btn-info">
          Enroll Now
        </button>
      </section>

      {/* Modal - Enrollment Form */}
      {showFormModal && (
        <div className="bussiness-modal-overlay">
          <div className="bussiness-enroll-modal">
            <h2>Enroll in Business Analytics Program</h2>
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
              <button type="submit" className="business-analytics-btn3 btn-success">
                Proceed to Payment
              </button>
              <button
                type="button"
                className="business-analytics-btn3 btn-secondary"
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
        <div className="bussiness-modal-overlay">
          <div className="bussiness-payment-modal">
            <h3>Confirm Payment</h3>
            <p>Proceed to pay ₹79,999 for the Sales Mastery Program</p>
            <a
              href="https://razorpay.me/@mackinlay?amount=NzSQ5U9nmvnRFvfnpmXM2A%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="business-analytics-btn btn-success"
            >
              Pay Now
            </a>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="business-analytics-btn3 btn-secondary mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessAnalytics;
