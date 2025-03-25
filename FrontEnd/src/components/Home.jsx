import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Program from './Program';
import Footer from './Footer';
import ChatBot from './ChatBot';
import '../style/Home.css';

const Home = () => {
  const programs = [
    { name: "HR", icon: "👥" },
    { name: "Marketing", icon: "📢" },
    { name: "Sales", icon: "💰" },
    { name: "Business Analyst", icon: "📊" },
    { name: "Finance", icon: "💵" },
  ];
  const features = [
    {
      title: "Renowned professors with proven track records",
      subtitle: "THE BEST-IN-CLASS INSTRUCTORS",
      description:
        "Interact with and learn from esteemed professors who’ve taught some of today’s greatest minds in the fields of technology, business, and beyond.",
      image: "/images/professor.jpg",
    },
    {
      title: "Industry experts who already work in your desired field",
      subtitle: "EXPERIENCED INDUSTRY MENTORS",
      description:
        "Great Learning programs go beyond theory. Our network of professional mentors guide and support you, helping you to land the job and achieve remarkable success.",
      image: "/images/mentors.jpg",
    },
    {
      title: "Hands-on projects to showcase your new knowledge",
      subtitle: "THE PROJECTS & TEAMWORK",
      description:
        "Unlike self-learn online courses, Great Learning provides you with opportunities to collaborate with your peers and industry experts on portfolio-building projects.",
      image: "/images/projects.jpg",
    },
    {
      title: "Resume Building & Interview Prep Sessions",
      subtitle: "DEDICATED CAREER SUPPORT",
      description:
        "Get access to job boards and experts who guide you with resumes, e-portfolios, LinkedIn reviews, and mock interviews.",
      image: "/images/career.jpg",
    },
  ];
  const testimonials = [
    {
      quote: "I was able to restart my career with the Data Science and Engineering course",
      description:
        "Great Learning helped me put together an online portfolio of the projects I worked on. This came in handy during interviews. Within 1 month of completing the course, I cracked the role of ML Engineer at Aviso AI.",
      name: "Alfred Elver",
      position: "ML Engineer, Aviso AI",
      program: "Post Graduate Program in Data Science and Engineering",
      image: "/images/testimonial1.jpg",
    },
    {
      quote: "This course transformed my career!",
      description:
        "The structured curriculum and hands-on projects helped me land my dream job as a Software Engineer.",
      name: "Jane Doe",
      position: "Software Engineer, Google",
      program: "Post Graduate Program in Software Engineering",
      image: "/images/testimonial2.jpg",
    },
  ];
  return (
    <>
      {/* Carousel Section - Moved to Top */}
      <Container className="carousel-container">
        <h2 className="section-title">Explore Our Programs</h2>
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
              <img src="your-image-1.jpg" alt="Program 1" />
              <h3>Artificial Intelligence Masterclass</h3>
              <p>Learn AI and machine learning from industry leaders.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-slide">
              <img src="your-image-2.jpg" alt="Program 2" />
              <h3>Data Science Bootcamp</h3>
              <p>Become a data scientist with hands-on projects.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-slide">
              <img src="your-image-3.jpg" alt="Program 3" />
              <h3>Cybersecurity Expert Program</h3>
              <p>Master ethical hacking and cybersecurity techniques.</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </Container>
      {/* Testimonial Section */}
      <Container className="testimonial-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="testimonial-slider"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Row className="testimonial-card">
              <Col md={7} className="testimonial-text">
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
              </Col>
              <Col md={5} className="testimonial-image">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="testimonial-img-wrapper"
                >
                  <img src={testimonial.image} alt={testimonial.name} />
                  <Button className="watch-story-btn" variant="light">
                    ▶ Watch Story
                  </Button>
                </motion.div>
              </Col>
            </Row>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
    {/* Feature Section */}
    <Container className="features-section">
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
      <Row className="justify-content-center">
        {features.map((feature, index) => (
          <Col key={index} md={5} className="feature-card">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="feature-content"
            >
              <img src={feature.image} alt={feature.title} className="feature-image" />
              <h6 className="feature-subtitle">{feature.subtitle}</h6>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
    {/* Skill Section */}
    <Container className="skills-section">
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
            Stay at the top of your game with skills from the hottest domains.
            Explore topics that interest you most and see how the programs are
            relevant to you.
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
    </Container>
    {/* Contact Section */}
    (
    <Container>
      {/* Section 1: Free Courses */}
      <Row className="course-section align-items-center">
        <Col md={6}>
          <motion.img
            src="https://via.placeholder.com/250"
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
            <h6 className="course-subtitle">GREAT LEARNING ACADEMY</h6>
            <h2 className="course-title">
              Free short courses to gain industry-relevant skills.
            </h2>
            <p className="course-description">
              Start your online learning journey at Great Learning Academy for
              free with our short-term basic courses across various in-demand
              domains.
            </p>
            <motion.button
              className="explore-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore courses →
            </motion.button>
          </motion.div>
        </Col>
      </Row>

      {/* Section 2: Got More Questions? */}
      <Row className="questions-section">
        <Col md={12}>
          <motion.div
            className="questions-box"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
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

      {/* Disclaimer */}
      <p className="disclaimer">
        *Career outcomes are subject to market conditions and learner
        performance
      </p>
    </Container>

      {/* Hero Section */}
      <div className="hero-section">
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
      </div>

      {/* What Sets Us Apart */}
      <Container className="mt-5">
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
      </Container>

      {/* Featured Programs */}
      <Container className="mt-5">
        <h2 className="section-title">Featured Programs</h2>
        <Row>
          <Program />
        </Row>
      </Container>

      {/* Learning Experience */}
      <Container className="mt-5 learning-experience">
        <h2 className="section-title">The Mackinlay Learning Experience</h2>
        <p>
          Interactive AI-driven dashboard to track progress, assessments & job placements.
        </p>
      </Container>

      {/* Call to Action */}
      <Container className="mt-5 text-center">
        <h2 className="section-title">Join Our Exclusive Community of Future Leaders</h2>
        <motion.button
          className="get-started-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </Container>

      {/* ChatBot Floating Button */}
      <ChatBot />
    </>
  );
};

export default Home;
