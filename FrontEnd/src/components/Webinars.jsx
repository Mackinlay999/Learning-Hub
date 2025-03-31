import React from "react";
import { motion } from "framer-motion";
import image3 from "../images/2.png";
import "../style/Webinars.css";
import video from "../images/s1.png";

const Webinars = () => {
  
    const webinars = [
        {
          id: 1,
          category: "Human Resources",
          title: "Future of HR: Adapting to Workforce Transformations",
          date: "28 March 2025 | 06:00PM IST",
          speaker: "Ms. Aisha Verma",
          role: "Senior HR Strategist at Global Talent Solutions",
          registerLink: "#",
          image: video,
        },
        {
          id: 2,
          category: "Marketing",
          title: "Mastering Digital Marketing: Strategies for 2025",
          date: "02 April 2025 | 06:00PM IST",
          speaker: "Mr. Rahul Kapoor",
          role: "Head of Digital Marketing Officer at BrandBoost",
          registerLink: "#",
          image: video,
        },
        {
          id: 3,
          category: "Finance",
          title: "Financial Planning & Investment Strategies for Professionals",
          date: "08 April 2025 | 02:00PM IST",
          speaker: "Dr. Neha Sharma",
          role: "Chief Investment Officer at WealthWise Advisors",
          registerLink: "#",
          image: video,
        },
      ];
      
  return (
    <>
      <section className="webinars-container">
        <motion.div
          className="webinars-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="webinars-title">
            Free Counselling{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              Webinars
            </motion.span>
          </h1>
          <p className="webinars-description">
            Gain insights from our top educators and industry leaders through
            our free webinars.
          </p>
          <p className="webinars-description">
            Designed to help you make informed decisions about your career,
            these sessions provide valuable knowledge on industry trends and
            professional growth strategies.
          </p>
          <motion.button
            className="webinars-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Register Now. Unlock Your Potential.
          </motion.button>
        </motion.div>

        <motion.div
          className="webinars-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={video} alt="Webinars" />
        </motion.div>
      </section>
      <section className="webinar-section2">
        <motion.div
          className="webinar-content2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="webinar-heading2">
            Find Answers to Your Questions on Upskilling with Our Webinar Series
          </h2>
          <p className="webinar-text2">
            What are the Latest Technologies? Which skills will drive the
            future? How will this Program help your career goals?
          </p>
          <p className="webinar-text2">
            Learn it all with Faculty MasterClasses, Success Stories of Past
            Learners, and Insights from Industry Experts.
          </p>
        </motion.div>
      </section>
      <section className="webinar-section333">
      <h2 className="webinar-heading333">Register for Upcoming Webinars</h2>
      <motion.div
        className="webinar-container333"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {webinars.map((webinar) => (
          <motion.div
            key={webinar.id}
            className="webinar-card333"
            whileHover={{ scale: 1.05 }}
          >
            <img src={webinar.image} alt={webinar.title} className="webinar-image333" />
            <div className="webinar-info333">
              <span className="webinar-badge333">UPCOMING</span>
              <h3 className="webinar-title333">{webinar.title}</h3>
              <p className="webinar-date333">{webinar.date}</p>
              <p className="webinar-speaker333">{webinar.speaker}</p>
              <p className="webinar-role333">{webinar.role}</p>
              <a href={webinar.registerLink} className="webinar-register333">REGISTER NOW</a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
    </>
  );
};

export default Webinars;
