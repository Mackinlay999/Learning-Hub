import React from "react";
import { Container, Row, Col, Button, Card  } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaRegShareSquare, FaArrowLeft, FaArrowRight } from "react-icons/fa";  // ✅ Import this
import "../style/SuccessStory.css";
import video from "../images/video.jpg";
import success from "../images/2.png"
// Sample Data (Replace with API or Dynamic Data)
const successStories = [
  {
    name: "Surajith Nath",
    title: "Post Graduate Program in Cloud Computing",
    image: video,
  },
  {
    name: "Swati Kumari",
    title: "Post Graduate Diploma in Management",
    image: video,
  },
  {
    name: "Smitha Seethapathi",
    title: "Artificial Intelligence for Leaders",
    image: video,
  },
  {
    name: "Zulfiqaar Ahmed",
    title: "Post Graduate Program in Data Science",
    image: video,
  },
];
const stories = [
  {
    name: "Ajay Kini",
    image: video,
    program: "Post Graduate Program in Artificial Intelligence & Machine Learning",
    feedback:
      "I was looking for a fully online program due to my full-time job. This was my first foray into such a program, and I was hesitant. I'm happy to report that I couldn't have made a better choice!",
  },
  {
    name: "Jeffrey Jones M",
    image: video,
    program: "Post Graduate Program in Artificial Intelligence & Machine Learning",
    feedback:
      "The Post Graduate Program in AI & ML has been a transformative experience. The curriculum is meticulously designed, blending theoretical foundations with real-world applications.",
  },
  {
    name: "Ravi Kumar Tangellapalli",
    image: video,
    program: "Post Graduate Program in Artificial Intelligence & Machine Learning",
    feedback:
      "I am delighted with the PG Program in AI & ML. The content is comprehensive and well-structured, covering foundational concepts and advanced topics.",
  },
  {
    name: "Sarah Lee",
    image: video,
    program: "Post Graduate Program in AI & ML",
    feedback:
      "This course provided me with the skills I needed to switch careers into data science. The instructors were knowledgeable, and the community was extremely supportive.",
  },
  {
    name: "Michael Brown",
    image: video,
    program: "Post Graduate Program in AI & ML",
    feedback:
      "I gained hands-on experience with real-world projects. The curriculum is practical and industry-oriented. Highly recommended for anyone looking to break into AI & ML.",
  },
  {
    name: "Emma Watson",
    image: video,
    program: "Post Graduate Program in AI & ML",
    feedback:
      "The mentorship and peer discussions helped me understand complex topics easily. I appreciate the structured approach and the quality of content provided.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Success Story Component
const SuccessStory = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === successStories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? successStories.length - 1 : prevIndex - 1
    );
  };
  return (
    <>
    <motion.div className="success-container">
      <motion.div
        className="success-content1"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="success-title1">
          Transforming Lives,{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Defining Futures
          </motion.span>
        </h1>
        <p className="success-description1">
          Hear from our alumni who have achieved exceptional career milestones 
          through our programs. Their journeys of transformation stand as a 
          testament to the unparalleled education and mentorship at Mackinlay 
          Learning Hub.
        </p>
        <motion.button
          className="success-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Real Stories. Real Success.
        </motion.button>
      </motion.div>

      <motion.div
        className="success-image1"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={success} alt="Success Stories" />
      </motion.div>
    </motion.div>
      {/* First Section */}
      <motion.div fluid className="success-story">
        <Row className="align-items-center">
          {/* Left Content */}
          <Col lg={6} className="text-section">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="stats">
                <span>4000+ Hiring Companies</span>
                <span>50% Avg Salary Hike*</span>
              </div>
              <h1>Inspiring stories of success from our learners</h1>
              <motion.div
                className="button-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Button className="btn-primary-custom">Explore Career Transitions</Button>
                <Button className="btn-outline-custom">View Testimonials</Button>
              </motion.div>
              <p className="trusted-text">
                Trusted by 12.4 Million+ learners from over 170 countries <br />
                *Across all Great Learning programs
              </p>
            </motion.div>
          </Col>

          {/* Right Images */}
          <Col lg={6} className="image-grid">
            {["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg"].map((img, index) => (
              <motion.div
                key={index}
                className="image-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <img src={video} alt="Success Story" />
              </motion.div>
            ))}
          </Col>
        </Row>
      </motion.div>

      {/* Second Section */}
      <motion.div fluid className="success-story-1">
        <Row className="justify-content-center">
          <Col lg={10} className="story-card">
            <Row className="align-items-center">
              {/* Left Side - Photo Section */}
              <Col lg={5} className="photo-section">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <img 
                    src={video} 
                    alt="Success Story" 
                    className="profile-photo"
                  />
                </motion.div>
                <div className="user-info">
                  <h4>Arpit Mishra</h4>
                  <p>SCM Director at a Professional Services Firm</p>
                </div>
              </Col>

              {/* Right Side - Story Details */}
              <Col lg={7} className="story-content">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div className="badge">FEATURED STORY</div>
                  <h6 className="category">ARTIFICIAL INTELLIGENCE & MACHINE LEARNING</h6>
                  <h2 className="story-title">I am now able to talk to clients with more confidence</h2>
                  <div className="testimonial-info">
                    <div className="testimonial-user">
                      <div className="user-icon">👤</div>
                      <div>
                        <h5>Arpit Mishra</h5>
                        <p>Post Graduate Program in AI for Leaders</p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="share-icon"
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
      <motion.div fluid className="success-story-2">
      <Row>
        <Col>
          <motion.h2
            className="section-title-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Watch stories of success of our learners
          </motion.h2>
        </Col>
      </Row>

      <Row className="slider-container-2 align-items-center">
        <Col xs={1} className="arrow-container-2">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="arrow-left-2"
            onClick={prevSlide}
          >
            <FaArrowLeft />
          </motion.div>
        </Col>

        <Col xs={10} className="slider-2">
          <motion.div
            className="slide-2"
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="image-container-2">
              <img src={successStories[currentIndex].image} alt="Story" />
            </div>
            <h4 className="name-2">{successStories[currentIndex].name}</h4>
            <p className="title-2">{successStories[currentIndex].title}</p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="share-icon-2"
            >
              <FaRegShareSquare />
            </motion.div>
          </motion.div>
        </Col>

        <Col xs={1} className="arrow-container-2">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="arrow-right-2"
            onClick={nextSlide}
          >
            <FaArrowRight />
          </motion.div>
        </Col>
      </Row>
    </motion.div>
    <motion.div className="success-story-container">
      <h2>Stories of learners like you</h2>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {[0, 1].map((row) => (
          <Row key={row} className="mt-4">
            {stories.slice(row * 3, row * 3 + 3).map((story, index) => (
              <Col key={index} md={4}>
                <motion.div variants={cardVariants}>
                  <Card className="success-story-card">
                    <div className="success-story-header">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="success-story-profile"
                      />
                      <div>
                        <h5 className="success-story-name">{story.name}</h5>
                        <p className="success-story-program">{story.program}</p>
                      </div>
                    </div>
                    <p className="success-story-feedback">{story.feedback}</p>
                    <Button variant="outline-dark" className="success-story-readmore">
                      Read More
                    </Button>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        ))}
      </motion.div>

      <div className="success-story-viewmore">
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button variant="primary">View More</Button>
        </motion.div>
      </div>
    </motion.div>
    </>
  );
};

export default SuccessStory;
