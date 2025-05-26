import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaRegShareSquare, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // ✅ Import this
import '../style/SuccessStory.css';
import video from '../images/s1.png';
import video1 from '../images/s2.png';
import success from '../images/2.png';
import demoimg1 from '../images/demoimg1.png';
import demoimg2 from '../images/demoimg2.png';
import demoimg3 from '../images/demoimg3.png';
import demoimg4 from '../images/demoimg4.png';
import demoimg5 from '../images/demoimg5.png';
import demoimg6 from '../images/demoimg6.png';
import demoimg7 from '../images/demoimg7.png';
import demoimg8 from '../images/demoimg8.png';
import demoimg9 from '../images/demoimg9.png';
import demoimg10 from '../images/demoimg10.png';
import demoimg11 from '../images/demoimg11.png';
import demoimg12 from '../images/demoimg12.png';
import demoimg13 from '../images/demoimg13.png';
import demoimg14 from '../images/demoimg14.png';
import img1 from '../images/f1.png';
import img2 from '../images/f2.png';
import img3 from '../images/f3.png';
import img4 from '../images/f4.png';
// import img5 from '../images/demoimg1';
import img6 from '../images/p2.png';
const imageList = [img1, img2, img3, img4, demoimg4, demoimg10];
{
  /* Right Images */
}
const successStories = [
  {
    name: 'Surajith Nath',
    title: 'Human Resource (HR) Training Program',
    image: demoimg6,
  },
  {
    name: 'Swati Kumari',
    title: 'Marketing Training Program',
    image: demoimg7,
  },
  {
    name: 'Smitha Seethapathi',
    title: 'Finance Training Program',
    image: demoimg8,
  },
  {
    name: 'Zulfiqaar Ahmed',
    title: 'Business Analytics Training Program',
    image: demoimg9,
  },
];

const stories = [
  {
    name: 'Ajay Kini',
    image: video,
    program: 'Human Resource (HR) Training Program',
    feedback:
      'This program helped me develop essential HR skills and gave me the confidence to handle real workplace scenarios effectively.',
  },
  {
    name: 'Jeffrey Jones M',
    image: demoimg1,
    program: 'Marketing Training Program',
    feedback:
      'The marketing program was insightful, hands-on, and industry-relevant. I gained a solid understanding of digital strategies.',
  },
  {
    name: 'Ravi Kumar Tangellapalli',
    image: demoimg2,
    program: 'Professional Sales Specialist Certification Program',
    feedback:
      'I loved the practical sessions and the live case studies. This certification helped me land a new role in sales!',
  },
  {
    name: 'Sarah Lee',
    image: demoimg3,
    program: 'Business Analytics Training Program',
    feedback:
      'A well-structured and practical program! I now feel confident analyzing data to support business decisions.',
  },
  {
    name: 'Michael Brown',
    image: demoimg4,
    program: 'Finance Training Program',
    feedback:
      'This training provided a clear picture of financial planning and analysis. Great for beginners and professionals alike!',
  },
  {
    name: 'Emma Watson',
    image: demoimg5,
    program: 'Marketing Training Program',
    feedback:
      'The instructors were top-notch and the case studies were very relevant. I would recommend this program to anyone in marketing.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Success Story Component
const SuccessStory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === successStories.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? successStories.length - 1 : prevIndex - 1,
    );
  };
  return (
    <>
      <motion.div className="success-story-container">
        <motion.div
          className="success-story-content1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="success-story-title1">
            Transforming Lives,{' '}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              Defining Futures
            </motion.span>
          </h1>
          <p className="success-story-description1">
            Hear from our alumni who have achieved exceptional career milestones
            through our programs. Their journeys of transformation stand as a
            testament to the unparalleled education and mentorship at Mackinlay
            Learning Hub.
          </p>
          <motion.button
            className="success-story-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Real Stories. Real Success.
          </motion.button>
        </motion.div>

        <motion.div
          className="success-story-image1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={success} alt="Success Stories" />
        </motion.div>
      </motion.div>
      {/* First Section */}
      <motion.div className="success-story1">
        <Row className="align-items-center">
          {/* Left Content */}
          <Col lg={6} className="success-story-text-section">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="success-story-stats">
                <span>4000+ Hiring Companies</span>
                <span>50% Avg Salary Hike*</span>
              </div>
              <h1 className="success-story-h1">
                Inspiring stories of success from our learners
              </h1>
              <motion.div
                className="success-story-button-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Button className="success-story-btn-custom-1">
                  Explore Career Transitions
                </Button>
                <Button className="success-story-btn-custom-2">
                  View Testimonials
                </Button>
              </motion.div>
              <p className="success-story-trusted-text">
                Trusted by 12.4 Million+ learners from over 170 countries <br />
                *Across all Great Learning programs
              </p>
            </motion.div>
          </Col>

          {/* Right Images */}
          <Col lg={6} className="success-story-image-grid">
            {imageList.map((img, index) => (
              <motion.div
                key={index}
                className="success-story-image-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <img src={img} alt={`Success Story ${index + 1}`} />
              </motion.div>
            ))}
          </Col>
        </Row>
      </motion.div>

      {/* Second Section */}
      <motion.div className="success-story-2">
        <Row className="justify-content-center">
          <Col lg={10} className="success-story-card">
            <Row className="align-items-center">
              {/* Left Side - Photo Section */}
              <Col lg={5} className="success-story-photo-section">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <img
                    src={video1}
                    alt="Success Story"
                    className="success-story-profile-photo"
                  />
                </motion.div>
                <div className="success-story-user-info">
                  <h4>Arpit Mishra</h4>
                  <p>SCM Director at a Professional Services Firm</p>
                </div>
              </Col>

              {/* Right Side - Story Details */}
              <Col lg={7} className="success-story-content">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="success-story-badge">FEATURED STORY</div>
                  <h6 className="success-story-category">
                    Human Resource (HR)
                  </h6>
                  <h2 className="success-story-title">
                    I am now able to talk to clients with more confidence
                  </h2>
                  <div className="success-story-testimonial-info">
                    <div className="success-story-testimonial-user">
                      <div className="success-story-user-icon">👤</div>
                      <div>
                        <h5>Arpit Mishra</h5>
                        <p>Human Resource (HR) Training Program</p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="success-story-share-icon"
                    >
                      <FaRegShareSquare />
                      <span>Share URL</span>
                    </motion.div>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Col>
        </Row>
      </motion.div>
      <motion.div className="success-story-3">
        <Row>
          <Col>
            <motion.h2
              className="success-story-section-title-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Watch stories of success of our learners
            </motion.h2>
          </Col>
        </Row>

        <Row className="success-story-slider-container-2 align-items-center">
          <Col xs={1} className="success-story-arrow-container-2">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="success-story-arrow-left-2"
              onClick={prevSlide}
            >
              <FaArrowLeft />
            </motion.div>
          </Col>

          <Col xs={10} className="success-story-slider-2">
            <motion.div
              className="success-story-slide-2"
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="success-story-image-container-2">
                <img src={successStories[currentIndex].image} alt="Story" />
              </div>
              <h4 className="success-story-name-2">
                {successStories[currentIndex].name}
              </h4>
              <p className="success-story-title-2">
                {successStories[currentIndex].title}
              </p>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="success-story-share-icon-2"
              >
                <FaRegShareSquare />
              </motion.div>
            </motion.div>
          </Col>

          <Col xs={1} className="success-story-arrow-container-2">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="success-story-arrow-right-2"
              onClick={nextSlide}
            >
              <FaArrowRight />
            </motion.div>
          </Col>
        </Row>
      </motion.div>
      <motion.div className="success-story-container-1">
        <h2>Stories of learners like you</h2>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <Row className="mt-4">
            {stories.slice(0, 3).map((story, index) => (
              <Col key={index} md={4}>
                <motion.div variants={cardVariants}>
                  <Card className="success-story-card-1">
                    <div className="success-story-header-1">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="success-story-profile-1"
                      />
                      <div>
                        <h5 className="success-story-name-1">{story.name}</h5>
                        <p className="success-story-program-1">
                          {story.program}
                        </p>
                      </div>
                    </div>
                    <p className="success-story-feedback-1">{story.feedback}</p>
                    <Button
                      variant="outline-dark"
                      className="success-story-readmore-1"
                    >
                      Read More
                    </Button>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {showAll && (
            <Row className="mt-4">
              {stories.slice(3, 6).map((story, index) => (
                <Col key={index} md={4}>
                  <motion.div variants={cardVariants}>
                    <Card className="success-story-card-1">
                      <div className="success-story-header-1">
                        <img
                          src={story.image}
                          alt={story.name}
                          className="success-story-profile-1"
                        />
                        <div>
                          <h5 className="success-story-name-1">{story.name}</h5>
                          <p className="success-story-program-1">
                            {story.program}
                          </p>
                        </div>
                      </div>
                      <p className="success-story-feedback-1">
                        {story.feedback}
                      </p>
                      <Button
                        variant="outline-dark"
                        className="success-story-readmore-1"
                      >
                        Read More
                      </Button>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </motion.div>

        <div className="success-story-viewmore-1">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button variant="primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : 'View More'}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default SuccessStory;
