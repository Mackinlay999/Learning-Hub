import React, { useState } from "react";
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
import hrImg from "../images/hr.png";
import marketingImg from "../images/marketing.png";
import SalesImg from "../images/sales.png";
import BusinessImg from "../images/business.png";
import financeImg from "../images/finance.png";
import Explore from "../images/explore-banner.png";
import video from "../images/video.jpg";
const Home = () => {
  const programs = [
    { id: 1, name: "HR", icon: "👥", image: hrImg },
    { id: 2, name: "Marketing", icon: "📢", image: marketingImg },
    { id: 3, name: "Sales", icon: "💰", image: SalesImg },
    { id: 4, name: "Business Analyst", icon: "📊", image: BusinessImg },
    { id: 5, name: "Finance", icon: "💵", image: financeImg },
  ];
  const features = [
    {
      title: "Renowned professors with proven track records",
      subtitle: "THE BEST-IN-CLASS INSTRUCTORS",
      description:
        "Interact with and learn from esteemed professors who’ve taught some of today’s greatest minds in the fields of technology, business, and beyond.",
      image: video,
    },
    {
      title: "Industry experts who already work in your desired field",
      subtitle: "EXPERIENCED INDUSTRY MENTORS",
      description:
        "Great Learning programs go beyond theory. Our network of professional mentors guide and support you, helping you to land the job and achieve remarkable success.",
      image: video,
    },
    {
      title: "Hands-on projects to showcase your new knowledge",
      subtitle: "THE PROJECTS & TEAMWORK",
      description:
        "Unlike self-learn online programs, Great Learning provides you with opportunities to collaborate with your peers and industry experts on portfolio-building projects.",
      image: video,
    },
    {
      title: "Resume Building & Interview Prep Sessions",
      subtitle: "DEDICATED CAREER SUPPORT",
      description:
        "Get access to job boards and experts who guide you with resumes, e-portfolios, LinkedIn reviews, and mock interviews.",
      image: video,
    },
  ];
  const testimonials = [
    {
      quote:
        "I was able to restart my career with the Data Science and Engineering program",
      description:
        "Great Learning helped me put together an online portfolio of the projects I worked on. This came in handy during interviews. Within 1 month of completing the program, I cracked the role of ML Engineer at Aviso AI.",
      name: "Alfred Elver",
      position: "ML Engineer, Aviso AI",
      program: "Post Graduate Program in Data Science and Engineering",
      image: video,
    },
    {
      quote: "This program transformed my career!",
      description:
        "The structured curriculum and hands-on projects helped me land my dream job as a Software Engineer.",
      name: "Jane Doe",
      position: "Software Engineer, Google",
      program: "Post Graduate Program in Software Engineering",
      image: Explore,
    },
  ];
  const [selectedProgram, setSelectedProgram] = useState("Popular programs");
  return (
    <>
      {/* Mackinlay */}
      <motion.div fluid className="mac-home-section">
      <Row className="align-items-center mac-additional-content-container">
        {/* Left Content */}
        <Col md={6} className="mac-text-content">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mac-section-title"
          >
            Explore Our Programs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mac-section-description"
          >
            Unlock your potential with our world-class financial services. Our programs are designed to help you achieve your goals efficiently.
          </motion.p>
          <ul className="mac-feature-list">
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
            <Button className="btn-primary mac-explore-btn">Discover More</Button>
          </motion.div>
        </Col>

        {/* Right Image */}
        <Col md={6} className="text-center">
          <motion.img
            src={Explore}
            alt="Explore Programs"
            className="mac-additional-image"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </Col>
      </Row>
    </motion.div>
    {/* Heading */}
    <div className="heading-container">
      <motion.p
        className="subheading"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        YOUR GOALS ARE OUR GOALS
      </motion.p>

      <motion.h1
        className="main-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        Invest in yourself today. Unlock <br />
        success for a lifetime.
      </motion.h1>
    </div>
      {/* Carousel Section - Moved to Top */}
      <motion.div
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
      </motion.div>
      {/* Program Section */}
      {/* Program Section */}
      <motion.div
        className="home-container"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Row>
          <Col md={3} className="sidebar">
            <h6 className="sidebar-heading">FIND YOUR IDEAL</h6>
            <h2 className="sidebar-title">
              Programs from world’s best universities
            </h2>
            <motion.div
              className="sidebar-menu"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Button className="sidebar-button">Popular programs</Button>
              <ul className="menu-list">
                {programs.map((program) => (
                  <li
                    key={program.id}
                    onClick={() => setSelectedProgram(program.name)}
                    className="menu-item"
                  >
                    <span className="menu-icon">{program.icon}</span>
                    <span className="menu-name">{program.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Col>

          {/* Popular programs Section */}
          <Col md={9}>
            <h3 className="popular-title">{selectedProgram}</h3>
            <hr />
            <Row>
              {programs.map((program) => (
                <Col md={4} key={program.id}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="course-card"
                  >
                    <Card className="course-card-body">
                      <Card.Img
                        variant="top"
                        src={program.image}
                        className="course-img"
                        alt={`${program.name} Program`}
                      />
                      <Card.Body>
                        <Card.Title className="course-title">
                          {program.name} Program
                        </Card.Title>
                        <Card.Text className="course-duration">
                          6 Months · Online
                        </Card.Text>
                        <Button variant="link" className="view-program">
                          View Program
                        </Button>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </motion.div>
      {/* Testimonial Section */}
      <motion.div
        className="testimonial-container"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          spaceBetween={30} // Ensures spacing between slides
          slidesPerView={1} // Only one slide at a time
          centeredSlides={true} // Centers slides
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="testimonial-slider"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="testimonial-card"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Testimonial Text Section */}
                <motion.div
                  className="testimonial-text"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="testimonial-quote"
                  >
                    "{testimonial.quote}"
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="testimonial-description"
                  >
                    {testimonial.description}
                  </motion.p>
                  <motion.h5
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="testimonial-name"
                  >
                    {testimonial.name}
                  </motion.h5>
                  <p className="testimonial-program">{testimonial.program}</p>
                </motion.div>

                {/* Testimonial Image Section */}
                <motion.div
                  className="testimonial-image"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="testimonial-img-wrapper"
                  >
                    <img src={testimonial.image} alt={testimonial.name} />
                    <Button className="watch-story-btn" variant="light">
                      ▶ Watch Story
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
      {/* Feature Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="features-section"
      >
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-heading"
        >
          <h2>ONLINE LEARNING DONE BETTER</h2>
          <p>Discover what makes our programs unique</p>
        </motion.div>

        {/* Feature Cards */}
        <Row className="feature-row">
          {features.map((feature, index) => (
            <Col key={index} md={5} className="feature-card">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="feature-content"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="feature-image"
                />
                <h6 className="feature-subtitle">{feature.subtitle}</h6>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
      {/* Skill Section */}
      <motion.div className="skills-section">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="skills-content"
        >
          <Row className="align-items-center">
            {/* Left Section */}
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

            {/* Right Section - Program List */}
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
                    className="program-card"
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
      </motion.div>
      {/* Contact Section */}
        <motion.div>
      {/* Section 1: Free Programs */}
      <motion.div
        className="course-section align-items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Row className="align-items-center">
          <Col md={6}>
            <motion.img
              src={Explore}
              alt="Course"
              className="course-image"
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
              className="course-content"
            >
              <h6 className="course-subtitle">MACKINLAY LEARNING HUB</h6>
              <h2 className="course-title">
                Free short programs to gain industry-relevant skills.
              </h2>
              <p className="course-description">
                Start your online learning journey at Mackinlay Learning Hub for
                free with our short-term basic programs across various in-demand
                domains.
              </p>
              <motion.button
                className="explore-btn"
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
      <motion.div className="text-center questions-section">
  {/* Section: Got More Questions? */}
  <motion.div
    // className="questions-section"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7 }}
  >
    <Row className="questions-container">
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
          className="questions-box"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3>Got more questions?</h3>
          <p>Talk to our team, our program advisor will reach out to you.</p>
          <motion.button
            className="contact-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact us 📞
          </motion.button>
        </motion.div>
      </Col>
    </Row>
  </motion.div>

  {/* Disclaimer */}
  <motion.p
    className="disclaimer"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    *Career outcomes are subject to market conditions and learner performance
  </motion.p>

  {/* Get Started Section */}
  <motion.div
    className="get-started-section"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7 }}
  >
    <h2 className="section-title">
      Join Our Exclusive Community of Future Leaders
    </h2>
    <motion.button
      className="get-started-btn"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      Get Started
    </motion.button>
  </motion.div>
</motion.div>

      {/* ChatBot Floating Button */}
      <ChatBot />
    </>
  );
};

export default Home;
