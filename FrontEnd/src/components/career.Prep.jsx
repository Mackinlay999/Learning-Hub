import React from "react";
import "../style/CareerPrep.css";

const CareerPrep = () => {
  return (
   <div>

 
{/*     
    <div className="career-prep-container">
      <div className="career-text">
        <h2>Career Prep</h2>
        <p>
          Learn from leading academicians in the field of data science and
          business analytics and several experienced industry practitioners from
          top organizations.
        </p>
        <button className="counseling-button">Get Counseling Call</button>
      </div>
      <div className="career-cards">
        <div className="card yellow-card">
          <h3>4.7/5</h3>
          <p>Avg Mentorship Rating</p>
        </div>
        <div className="card pink-card">
          <h3>1:1</h3>
          <p>Program Support</p>
        </div>
      </div>
      </div> */}



<section className="career-section">
      <div className="container">
        <h2 className="title">Career Support</h2>
        <p className="subtitle">Unrivaled Career Acceleration</p>
        <p className="description">
          At Mackinlay Learning Hub, career success is not just a possibility—it’s a guarantee.
          Our dedicated career services team provides:
        </p>
        <ul className="career-list">
          <li>Personalized career coaching</li>
          <li>Exclusive access to top-tier job opportunities</li>
          <li>Industry networking with global leaders</li>
        </ul>
        <p className="description">
          Our graduates secure positions in leading multinational corporations,
          redefining their career trajectories with confidence and impact.
        </p>
        <p className="highlight">Your Career. Our Commitment.</p>
      </div>
    </section>


      <div className="career-container">
      <div className="service">
        <img src="./img/Career mentoring.png" alt="Career Mentoring" className="service-img" />
        <div className="service-content">
          <h2>1 : 1 Career mentoring</h2>
          <ul>
            <li>1:1 LIVE online sessions with experienced industry professionals</li>
            <li> Expert mentors guide you on the career path that’s right for you</li>
            <li> Suggestions on setting your short-term and long-term career goals</li>
            <li> Mentors from various domains help you gain valuable industry insights</li>
          </ul>
        </div>
      </div>




      <div className="service">
        <img src="./img/CVLinkedIn Review.png" alt="CV/LinkedIn Review" className="service-img" />
        <div className="service-content">
          <h2>CV/LinkedIn Review</h2>
          <ul>
            <li> Feedback from experts to make your resume and LinkedIn profiles stand out</li>
            <li> Personalized and detailed suggestions to improve your CV</li>
            <li> Tips on customizing your resume for the job profile you are applying to</li>
          </ul>
        </div>
      </div>

      <div className="service">
        <img src="./img/InterviewPreparationSession.png" alt="CV/LinkedIn Review" className="service-img" />
        <div className="service-content">
          <h2>Interview Preparation Session</h2>
          <ul>
            <li> 1:1 mock interviews with industry experts to help you land your dream job</li>
            <li>Guidance from our alumni currently in roles you aspire for</li>
            <li> Develop industry context with case studies and learn answers to common technical and HR questions</li>
          </ul>
        </div>
      </div>





      
    </div>


    </div>

    
  );
};

export default CareerPrep;
