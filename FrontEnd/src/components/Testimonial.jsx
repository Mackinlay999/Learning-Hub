import React from "react";
import "../style/Testimonial.css";
// import huaweiLogo from "./huawei-logo.png"; // Replace with actual path
// import testimonialVideo from "./testimonial-thumbnail.jpg"; // Replace with actual video thumbnail image

const Testimonial = () => {
  return (
    <div className="testimonial-container">
      {/* <div>
      <h2>Learner Testimonials</h2>
      </div> */}
      

      <div className="testimonial-card">
        {/* Left Section - Video Thumbnail */}
        <div className="testimonial-video">
          <img src="https://ds393qgzrxwzn.cloudfront.net/resize/c500x500/cat1/img/images/0/52ooj4559c.jpg" alt="Testimonial Video" />
          

        </div>

        {/* Right Section - Testimonial Content */}
        <div className="testimonial-content">
          <p>
            <span className="quote-mark">❝</span>
            Great Lakes has designed this program in a perfect way, where you
            learn all the concepts in the session and the subsequent weekends
            are dedicated for doing assignments and reading prerequisites for
            the next residency. The capstone project gave me an opportunity to
            optimize and automate the best practices used in the industry.
            <span className="quote-mark">❞</span>
          </p>

          <h3>Shiva Rama Krishna Reddy</h3>
          <p className="job-title">Senior System Architect</p>
          {/* <img src={huaweiLogo} alt="Huawei Logo" className="company-logo" /> */}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
