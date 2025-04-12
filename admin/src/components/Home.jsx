import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
} from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaSearch, FaBell } from "react-icons/fa";
import { motion } from "framer-motion";
import "../style/Home.css";
import SchedulerCalendar from "../components/SchedulerCalendar";

const activityData = [
  { day: "S", hours: 4 },
  { day: "M", hours: 5 },
  { day: "T", hours: 3 },
  { day: "W", hours: 4 },
  { day: "T", hours: 3 },
  { day: "F", hours: 4 },
  { day: "S", hours: 4 },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 70,
    },
  }),
};

const Home = () => {
  return (
    <Container fluid className="p-4 bg-light min-vh-100 home-dashboard">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Row className="mb-4 align-items-center dashboard-header">
          <Col md={6}>
            <h4>Hello Firoz 👋</h4>
            <p>Let’s learn something new today!</p>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-end gap-3 align-items-center"
          >
            <motion.div
              whileFocus={{ scale: 1.03 }}
              whileHover={{ scale: 1.02 }}
              className="search-bar"
            >
              <FaSearch className="me-2 text-muted" />
              <input type="text" placeholder="Search..." />
            </motion.div>
            <motion.div whileHover={{ rotate: 10 }} whileTap={{ scale: 0.9 }}>
              <FaBell size={20} className="text-secondary" />
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      {/* Overview Cards */}
      <Row className="g-3">
        {[
          { title: "Order in progress", value: 15, variant: "danger" },
          { title: "Certificates Earned", value: 90, variant: "primary" },
          { title: "Course Completed", value: 70, variant: "success" },
          { title: "Community Support", value: 320, variant: "warning" },
        ].map((item, idx) => (
          <Col md={3} sm={6} key={idx}>
            <motion.div
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="h-100"
            >
              <Card className="shadow-sm card-stats">
                <Card.Body>
                  <Card.Title className="fs-6">{item.title}</Card.Title>
                  <h3 className={`text-${item.variant}`}>{item.value}</h3>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row className="mt-4 g-3">
        <Col md={6}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="shadow-sm chart-card h-100">
              <Card.Body>
                <Card.Title>Activity Hours</Card.Title>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#007bff" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-3">
                  <p>Time spent: 28h (143%)</p>
                  <p>Lessons Done: 50 (84%)</p>
                  <p>Exams Passed: 10 (100%)</p>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={6}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="shadow-sm chart-card h-100">
              <Card.Body>
                <Card.Title>Performance</Card.Title>
                <div className="text-center my-4">
                  <motion.h2
                    className="text-success"
                    whileHover={{ scale: 1.05 }}
                  >
                    9.301
                  </motion.h2>
                  <p>5th in Leaderboard</p>
                  <ProgressBar now={75} label="75%" />
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Submission & Sidebar */}
      <Row className="mt-4 g-3">
      <Col md={4}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {/* Profile Card */}
            <Card className="shadow-sm mb-3 text-center profile-card">
              <Card.Body>
                <motion.img
                  src="https://via.placeholder.com/80"
                  alt="profile"
                  className="profile-img mb-2"
                  whileHover={{ scale: 1.1 }}
                />
                <h6 className="mb-0">Md. Firoz Ahmed</h6>
                <small className="text-muted">UI/UX Student</small>
              </Card.Body>
            </Card>

            {/* Community Groups */}
            <Card className="shadow-sm community-card">
              <Card.Body>
                <Card.Title>Community Groups</Card.Title>
                <ul className="list-unstyled mt-3">
                  <li className="mb-2">🔹 Design Community USA (112k)</li>
                  <li className="mb-2">📢 SEO Helpline 24/7 (78k)</li>
                  <li>🌐 UI/UX Worldwide (498k)</li>
                </ul>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={8}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>Upcoming Submission</Card.Title>
                <p className="mb-1">Wireframe E-Course Dashboard</p>
                <small className="text-muted">UI/UX Design for Beginner</small>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="text-warning fw-bold">
                    Thu 21 April 2022
                  </span>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button variant="primary">Submit Task</Button>
                  </motion.div>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        {/* Calendar */}
        <Row className="mt-4">
          <Col>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <SchedulerCalendar />
            </motion.div>
          </Col>
        </Row>
        
      </Row>
    </Container>
  );
};

export default Home;
