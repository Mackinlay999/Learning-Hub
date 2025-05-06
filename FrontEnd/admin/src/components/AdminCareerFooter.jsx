import React from "react";
import "../style/AdminCareerFooter.css";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

const AdminCareerFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 - Trending Programs */}
        <div className="footer-column">
          <h3>Trending Programs</h3>
          <ul>


          



          <li>HR Leadership & Talent Management</li>
            <li>Strategic Sales & Marketing Excellence</li>
            <li>Finance & Business Analytics Mastery </li>
            <li>Corporate Leadership & Executive Education </li>
            <li>AI-Driven HR & Workforce Transformation</li>
            
          </ul>
        </div>

        {/* Column 2 - Browse Courses */}
        {/* <div className="footer-column">
          <h3>Browse Progarms</h3>
          <ul>
            <li>HR Leadership & Talent Management</li>
            <li>Strategic Sales & Marketing Excellence</li>
            <li>Corporate Leadership & Executive Education</li>
            
            <li>AI-Driven HR & Workforce Transformation</li>
            <li>Design Program</li>
            <li>Cyber Security Program</li>
            <li>Management Program</li>
          </ul>
        </div> */}

        {/* Column 3 - Degrees & Quick Links */}
        <div className="footer-column">
          <h3>Degrees</h3>
          <ul>
            <li>MBA Program</li>
            <li>Masters Program</li>
          </ul>

          <h3>Quick Links</h3>
          <ul>
            <li>About Us</li>
            <li>Careers at Mackinlay Learning Hub</li>
            <li>Grievance Redressal</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Column 4 - Contact & Social Media */}
        <div className="footer-column">
          <h3>Mackinlay Learning Hub</h3>
        
          <p>📧 harikrishg44@gmail.com</p>
          <p>📞 09363352660</p>

          {/* <p><strong>US and Other Countries:</strong></p>
          <p>📧 harikrishg44@gmail.com</p>
          <p>📞 09363352660</p> */}
          <p>Headquarters: Bangalore, Karnataka</p>

         

          {/* Social Media Links */}
          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaLinkedin />
            <FaYoutube />
            <FaInstagram />
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <hr className="footer-divider" />
    </footer>
  );
};

export default  AdminCareerFooter;
