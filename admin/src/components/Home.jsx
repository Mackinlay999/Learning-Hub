import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Spinner,
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
  const [totalLeads, setTotalLeads] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState({
    paid: 0,
    pending: 0,
    overdue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/dashboard")
      .then((response) => {
        const { leads, students, courses, revenue, payments } = response.data;
        setTotalLeads(leads);
        setActiveStudents(students);
        setCourseCount(courses);
        setRevenue(revenue.totalRevenue);
        setPaymentStatus(payments);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container fluid className="p-4 bg-light min-vh-100 home-dashboard">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Row className="mb-4 align-items-center home-dashboard-header">
          <Col md={6}>
            <h4 className="home-admin-text">Hello Admin 👋</h4>
            <p>Welcome to your Dashboard</p>
          </Col>
          <Col md={6} className="d-flex justify-content-end gap-3 align-items-center">
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

      {/* Dashboard Overview Cards */}
      <Row className="g-3">
        {[{ title: "Total Leads", value: totalLeads, link: "/leads" },
          { title: "Active Students", value: activeStudents, link: "/students" },
          { title: "Course Count", value: courseCount, link: "/courses" }]
          .map((item, idx) => (
            <Col md={4} sm={6} key={idx}>
              <motion.div
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="h-100"
              >
                <Card className="shadow-sm home-card-stats">
                  <Card.Body>
                    <Card.Title className="fs-6">{item.title}</Card.Title>
                    <h3>{item.value}</h3>
                    <Button variant="link" href={item.link}>View</Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
      </Row>

      {/* Revenue & Payment Status */}
      <Row className="mt-4 g-3">
        <Col md={6}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="shadow-sm home-chart-card h-100">
              <Card.Body>
                <Card.Title>Revenue</Card.Title>
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
                  <p>Total Revenue: ${revenue}</p>
                  <p>Revenue This Month: ${revenue * 0.2}</p>
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
            <Card className="shadow-sm home-chart-card h-100">
              <Card.Body>
                <Card.Title>Payment Status</Card.Title>
                <div className="d-flex justify-content-around">
                  <div>
                    <h5>Paid</h5>
                    <p>{paymentStatus.paid}%</p>
                  </div>
                  <div>
                    <h5>Pending</h5>
                    <p>{paymentStatus.pending}%</p>
                  </div>
                  <div>
                    <h5>Overdue</h5>
                    <p>{paymentStatus.overdue}%</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Attendance Snapshot */}
      <Row className="mt-4">
        <Col md={6}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>Attendance Snapshot</Card.Title>
                <p>Total Attendance: 85%</p>
                <ProgressBar now={85} label="85%" />
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Today's Events */}
      <Row className="mt-4">
        <Col md={12}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>Today's Events</Card.Title>
                <ul>
                  <li>Live Class: React Basics - 10:00 AM</li>
                  <li>Webinar: Advanced JavaScript - 2:00 PM</li>
                  <li>Live Class: Node.js Fundamentals - 4:00 PM</li>
                </ul>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

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
    </Container>
  );
};

export default Home;
