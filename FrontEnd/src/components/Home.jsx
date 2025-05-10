import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Program from "./Program";
import Footer from "./Footer";
import ChatBot from "./ChatBot";
import "../style/Home.css";
import slider1 from "../images/1.png";
import slider2 from "../images/2.png";
import slider3 from "../images/3.png";
import hrImg from "../images/p1.png";
import marketingImg from "../images/p2.png";
import SalesImg from "../images/p3.png";
import BusinessImg from "../images/p4.png";
import financeImg from "../images/p5.png";
import Explore from "../images/explore-banner.png";
import video from "../images/s1.png";
import video1 from "../images/s2.png";
import feature1 from "../images/f1.png";
import feature2 from "../images/f2.png";
import feature3 from "../images/f3.png";
import feature4 from "../images/f4.png";
const Home = () => {
  const programs = [
    { id: 1, title: "HR", image: hrImg },
    { id: 2, title: "Marketing", image: marketingImg },
    { id: 3, title: "Sales", image: SalesImg },
    { id: 4, title: "Business Analyst", image: BusinessImg },
    { id: 5, title: "Finance", image: financeImg },
  ];
  const features = [
    {
      title: "Renowned professors with proven track records",
      subtitle: "THE BEST-IN-CLASS INSTRUCTORS",
      description:
        "Interact with and learn from esteemed professors who’ve taught some of today’s greatest minds in the fields of technology, business, and beyond.",
      image: feature1,
    },
    {
      title: "Industry experts who already work in your desired field",
      subtitle: "EXPERIENCED INDUSTRY MENTORS",
      description:
        "Great Learning programs go beyond theory. Our network of professional mentors guide and support you, helping you to land the job and achieve remarkable success.",
      image: feature2,
    },
    {
      title: "Hands-on projects to showcase your new knowledge",
      subtitle: "THE PROJECTS & TEAMWORK",
      description:
        "Unlike self-learn online programs, Great Learning provides you with opportunities to collaborate with your peers and industry experts on portfolio-building projects.",
      image: feature3,
    },
    {
      title: "Resume Building & Interview Prep Sessions",
      subtitle: "DEDICATED CAREER SUPPORT",
      description:
        "Get access to job boards and experts who guide you with resumes, e-portfolios, LinkedIn reviews, and mock interviews.",
      image: feature4,
    },
  ];
  const testimonials = [
    {
      quote: "This HR program helped me elevate my career in human resources!",
      description:
        "The HR Leadership Program gave me the skills and confidence to manage people better, which led to a promotion at my company. The hands-on experience was invaluable for my growth as an HR professional.",
      name: "Samuel Richards",
      position: "HR Manager, ABC Corp",
      program: "HR Leadership Program",
      image: video, // Replace with actual image or video source
    },
    {
      quote: "The Marketing Strategy Program was a game-changer for me!",
      description:
        "I learned how to create effective marketing strategies that directly impacted sales. This program gave me the tools I needed to lead my team and develop innovative campaigns.",
      name: "Emily Taylor",
      position: "Marketing Manager, XYZ Inc.",
      program: "Marketing Strategy Program",
      image: video1, // Replace with actual image or video source
    },
  ];

  const [selectedProgram, setSelectedProgram] = useState(
    "Our training programs"
  );
  const [students, setStudents] = useState(1);
  const [companies, setCompanies] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const studentInterval = setInterval(() => {
      setStudents((prev) => (prev >= 100 ? 1 : prev + 1));
    }, 50);

    const companyInterval = setInterval(() => {
      setCompanies((prev) => (prev >= 1000 ? 1 : prev + 1));
    }, 10);

    return () => {
      clearInterval(studentInterval);
      clearInterval(companyInterval);
    };
  }, []);

  const [allprograms, setallPrograms] = useState([]); // State to hold program data
  const [selectednewProgram, setnewSelectedProgram] = useState(""); // State for selected program

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("/getAllPrograms"); // Replace with your API endpoint
        setallPrograms(response.data); // Assuming the response is an array of programs
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <>
      {/* Mackinlay */}
      <motion.div className="home-container1">
        <motion.div
          className="home-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="home-title">
            Mackinlay Learning Hub:{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              Transforming Ambition into Excellence
            </motion.span>
          </h1>
          <p className="home-description">
            At Mackinlay Learning Hub, we redefine the future of education by
            merging academic excellence with real-world expertise. Established
            in 2024, our institution is committed to shaping industry-ready
            professionals in HR, Sales, Marketing, Finance, and Business
            Analytics.
          </p>
          <p className="home-description">
            We don’t just educate—we elevate. Our programs integrate
            cutting-edge methodologies, expert-led instruction, and hands-on
            learning experiences that bridge the gap between ambition and
            achievement. With strong industry partnerships and placement
            support, Mackinlay Learning Hub is your gateway to unparalleled
            career success.
          </p>
          <motion.button
            className="home-learn-more-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Join Us. Lead the Future.
          </motion.button>
        </motion.div>

        <motion.div
          className="home-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={slider1} alt="Learning Hub" />
        </motion.div>
      </motion.div>
      {/* Mackinlay */}
      <motion.div className="home-mac-home-section">
        <motion.div
          className="home-mac-additional-content-container"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Left Content */}
          <div className="home-mac-content">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="home-mac-section-title"
            >
              Explore Our Programs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="home-mac-section-description"
            >
              Unlock your potential with our world-class financial services. Our
              programs are designed to help you achieve your goals efficiently.
            </motion.p>
            <ul className="home-mac-feature-list">
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                ✔ Expert financial advice
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                ✔ Tailored investment plans
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                ✔ Secure and transparent services
              </motion.li>
            </ul>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Button className="btn-primary home-mac-explore-btn">
                Discover More
              </Button>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="home-mac-image-container">
            <motion.img
              src={slider3}
              alt="Explore Programs"
              className="home-mac-additional-image"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
      {/* Heading */}
      {/* Carousel Section - Moved to Top */}
      {/* <motion.div
        className="carousel-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          <SwiperSlide>
            <div className="carousel-slide">
              <div className="carousel-content">
                <h3>Finance</h3>
                <p>Financial Analytics & Risk Management Techniques</p>
              </div>
              <img src={slider1} alt="Program 1" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-slide">
              <div className="carousel-content">
                <h3>Business Analyst</h3>
                <p>Become a Business Analyst with hands-on experience.</p>
              </div>
              <img src={slider2} alt="Program 2" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-slide">
              <div className="carousel-content">
                <h3>Human Resources Expert Program</h3>
                <p>Human Resources techniques.</p>
              </div>
              <img src={slider3} alt="Program 3" />
            </div>
          </SwiperSlide>
        </Swiper>
      </motion.div> */}
      {/* Program Section */}
      <motion.div
        className="home-container"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Row>
          <Col md={3} className="home-sidebar">
            <h6 className="home-sidebar-heading">FIND YOUR IDEAL</h6>
            <h2 className="home-sidebar-title">
              Programs from world’s best universities
            </h2>
            <motion.div
              className="home-sidebar-menu"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Button className="home-sidebar-button">
                Our training programs
              </Button>
              <ul className="home-menu-list">
                {programs.map((program) => (
                  <li
                    key={program.id}
                    onClick={() => setSelectedProgram(program.title)}
                    className="home-menu-item"
                  >
                    {/* <span className="home-menu-icon">{program.icon}</span> */}
                    <span className="home-menu-name">{program.title}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Col>

          {/* Popular programs Section */}
          <Col md={9}>
            <h3 className="home-popular-title">{selectedProgram}</h3>
            <hr />
            <Row>
              {programs.map((program) => (
                <Col md={4} key={program.id}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="home-program-course-card"
                  >
                    <div className="home-program-course-card-body1">
                      <img
                        src={program.image}
                        className="home-program-course-img"
                        alt={`${program.title} Program`}
                      />
                      <div className="home-program-course-text">
                        <h3 className="home-program-course-title">
                          {program.title} Program
                        </h3>
                        <p className="home-program-course-duration">
                          3 Months · Online
                        </p>
                        <button
                          className="home-program-view-program"
                          onClick={() => {
                            const lowerTitle = program.title.toLowerCase();

                            if (lowerTitle.includes("business analytics")) {
                              navigate("/program/business", { state: program });
                            } else if (lowerTitle.includes("hr")) {
                              navigate("/program/hr", { state: program });
                            } else if (lowerTitle.includes("marketing")) {
                              navigate("/program/marketing", {
                                state: program,
                              });
                            } else if (lowerTitle.includes("sales")) {
                              navigate("/program/sales", { state: program });
                            } else if (lowerTitle.includes("finance")) {
                              navigate("/program/finance", { state: program });
                            } else {
                              navigate(
                                `/program/${program.title.split(" ")[0]}`,
                                { state: program }
                              );
                            }
                          }}
                        >
                          View Program
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </motion.div>
      {/* Goal Section */}
      <div className="home-heading-container">
        <motion.p
          className="home-goal-subheading"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          YOUR GOALS ARE OUR GOALS
        </motion.p>

        <motion.h1
          className="home-main-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Invest in yourself today. Unlock <br />
          success for a lifetime.
        </motion.h1>
      </div>
      <div className="home-goal-statsContainer2">
        <motion.div
          className="home-goal-statBox2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="home-goal-statNumber2">{students}</h2>
          <p className="home-goal-statLabel2">STUDENTS AND ALUMNI</p>
        </motion.div>

        <motion.div
          className="home-goal-statBox2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 className="home-goal-statNumber2">4.6/5</h2>
          <p className="home-goal-statLabel2">END PROGRAM RATING</p>
        </motion.div>

        {/* <motion.div
        className="home-goal-statBox2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <h2 className="home-goal-statNumber2">50%</h2>
        <p className="home-goal-statLabel2">AVG. HIKE POST PROGRAM*</p>
      </motion.div> */}

        <motion.div
          className="home-goal-statBox2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <h2 className="home-goal-statNumber2">{companies}</h2>
          <p className="home-goal-statLabel2">HIRING COMPANIES*</p>
        </motion.div>
      </div>
      {/* Testimonial Section */}
      <div className="home-testimonial-slider2-wrapper">
        <div className="home-testimonial-slider2">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            className="home-swiper-container2"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="home-testimonial-card2"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <motion.div
                    className="home-testimonial-content2"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h2 className="home-testimonial-heading2">{item.quote}</h2>
                    <p className="home-testimonial-desc2">{item.description}</p>
                    <div className="home-testimonial-author2">
                      <strong>{item.name}</strong>
                      <span>{item.title}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="home-testimonial-image2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <img src={item.image} alt={item.name} />
                    {/* <motion.button
                    className="home-watch-story2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ▶ Watch Story
                  </motion.button> */}
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Feature Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="home-features-section"
      >
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="home-features-section-heading"
        >
          <h2>ONLINE LEARNING DONE BETTER</h2>
          <p>Discover what makes our programs unique</p>
        </motion.div>

        {/* Feature Cards */}
        <Row className="home-feature-row">
          {features.map((feature, index) => (
            <Col key={index} md={5} className="home-feature-card">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="home-feature-content"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="home-feature-image"
                />
                <h6 className="home-feature-subtitle">{feature.subtitle}</h6>
                <h3 className="home-feature-title">{feature.title}</h3>
                <p className="home-feature-description">
                  {feature.description}
                </p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
      {/* Skill Section */}
      {/* <motion.div className="skills-section">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="skills-content"
        >
          <Row className="align-items-center">
            <Col md={6} className="text-left">
              <motion.h6
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="section-subtitle"
              >
                MASTER SKILLS. BUILD A CAREER.
              </motion.h6>
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="section-title"
              >
                Modern skills for modern careers
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="section-description"
              >
                Stay at the top of your game with skills from the hottest
                domains. Explore topics that interest you most and see how the
                programs are relevant to you.
              </motion.p>
            </Col>
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="program-list"
              >
                {programs.map((program, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="program-card1"
                  >
                    <span className="program-icon">{program.icon}</span>
                    <span className="program-name">{program.name}</span>
                    <span className="program-arrow">→</span>
                  </motion.div>
                ))}
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </motion.div> */}
      {/* Contact Section */}
      <motion.div>
        {/* Section 1: Free Programs */}
        <motion.div className="home-program-section align-items-center">
          <Row className="align-items-center">
            <Col md={6}>
              <motion.img
                src={Explore}
                alt="Course"
                className="home-program-image"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
            </Col>
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="home-program-content"
              >
                <h6 className="home-program-subtitle">
                  MACKINLAY LEARNING HUB
                </h6>
                <h2 className="home-program-title">
                  Free short programs to gain industry-relevant skills.
                </h2>
                <p className="home-program-description">
                  Start your online learning journey at Mackinlay Learning Hub
                  for free with our short-term basic programs across various
                  in-demand domains.
                </p>
                <motion.button
                  className="home-program-explore-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore programs →
                </motion.button>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </motion.div>
      {/* Hero Section */}
      {/* <div className="hero-section">
        <div className="hero-overlay">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Empowering Leaders. Elevating Careers.
          </motion.h1>
          <p>Setting the Benchmark in Professional Education.</p>
          <div className="hero-buttons">
            <motion.button
              className="apply-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
            </motion.button>
            <motion.button
              className="explore-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Programs
            </motion.button>
          </div>
        </div>
      </div> */}
      {/* What Sets Us Apart */}
      {/* <Container className="mt-5">
        <Row>
          <Col md={6}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="section-title">What Sets Us Apart?</h2>
              <ul className="features-list">
                <li>
                  <FaCheckCircle className="icon" /> Industry-designed Curriculum
                </li>
                <li>
                  <FaCheckCircle className="icon" /> Elite Faculty & Industry Mentors
                </li>
                <li>
                  <FaCheckCircle className="icon" /> Guaranteed Placement Assistance
                </li>
                <li>
                  <FaCheckCircle className="icon" /> Global Business Case Studies
                </li>
              </ul>
            </motion.div>
          </Col>
        </Row>
      </Container> */}
      {/* Featured Programs */}
      {/* <Container className="mt-5">
        <h2 className="section-title">Featured Programs</h2>
        <Row>
          <Program />
        </Row>
      </Container> */}
      {/* Learning Experience */}
      {/* <Container className="mt-5 learning-experience">
        <h2 className="section-title">The Mackinlay Learning Experience</h2>
        <p>
          Interactive AI-driven dashboard to track progress, assessments & job placements.
        </p>
      </Container> */}
      {/* Call to Action */}
      <motion.div className="text-center home-questions-section">
        {/* Section: Got More Questions? */}
        <motion.div
          // className="questions-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Row className="home-questions-container">
            {/* <Col md={6}>
        <motion.img
          src={Explore} // Replace with relevant image
          alt="Questions"
          className="questions-image"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />
      </Col> */}
            <Col md={12}>
              <motion.div
                className="home-questions-box"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h3>Got more questions?</h3>
                <p>
                  Talk to our team, our program advisor will reach out to you.
                </p>
                <Link to="/contact">
                  <motion.button
                    className="home-contact-btn2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact us 📞
                  </motion.button>
                </Link>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          className="home-disclaimer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          *Career outcomes are subject to market conditions and learner
          performance
        </motion.p>

        {/* Get Started Section */}
        {/* <motion.div
          className="home-get-started-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="home-section-title1">
            Join Our Exclusive Community of Future Leaders
          </h2>
          <motion.button
            className="home-get-started-btn2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div> */}
      </motion.div>
      {/* ChatBot Floating Button */}
      <ChatBot />
    </>
  );
};

export default Home;
