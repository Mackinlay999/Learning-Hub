


import React, { useEffect, useState } from "react";
import axios from "./axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FaSearch, FaBell } from "react-icons/fa";
import { motion } from "framer-motion";
import SchedulerCalendar from "../components/SchedulerCalendar";
import "../style/Home.css"; // Using your existing dashboard style

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
  const [totalLeads, setTotalLeads] = useState();
  const [todayLeads, setTodayLeads] = useState();
  const [dailyLeads, setDailyLeads] = useState([]);
  const [activeStudents, setActiveStudents] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);


  // /revenue
  const [transactions, setTransactions] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState({ paid: 0, pending: 0, overdue: 0 });
  const [activityData, setActivityData] = useState([]);
  const [todayRevenue, setTodayRevenue] = useState(0);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/getRevenue");
      const data = response.data;
      setTransactions(data);

      // 1. Calculate total revenue
      const totalRevenue = data
        .filter(item => item.status === "Paid")
        .reduce((sum, item) => sum + item.amount, 0);
      setRevenue(totalRevenue);

      // 2. Calculate payment status percentages
      const totalCount = data.length;
      const paidCount = data.filter(item => item.status === "Paid").length;
      const pendingCount = data.filter(item => item.status === "Pending").length;
      const overdueCount = data.filter(item => item.status === "Overdue").length;

      setPaymentStatus({
        paid: totalCount ? ((paidCount / totalCount) * 100).toFixed(1) : 0,
        pending: totalCount ? ((pendingCount / totalCount) * 100).toFixed(1) : 0,
        overdue: totalCount ? ((overdueCount / totalCount) * 100).toFixed(1) : 0,
      });


// 4. Calculate today's revenue
      const today = new Date().toDateString(); // 'Sat Apr 26 2025'
const todayTransactions = data.filter(item => {
  const itemDate = new Date(item.date).toDateString();
  return itemDate === today && item.status === "Paid";
});
const todayRevenueSum = todayTransactions.reduce((sum, item) => sum + item.amount, 0);

setTodayRevenue(todayRevenueSum);




      // 3. Prepare BarChart data based on transaction dates (optional simple sample)
      const dailyRevenue = {};
      data.forEach(item => {
        const date = new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }); // like 'Mon', 'Tue'
        if (!dailyRevenue[date]) {
          dailyRevenue[date] = 0;
        }
        if (item.status === "Paid") {
          dailyRevenue[date] += item.amount;
        }
      });

      const formattedActivityData = Object.keys(dailyRevenue).map(day => ({
        day,
        hours: dailyRevenue[day] / 1000, // Dividing just to make the graph smaller; you can change
      }));

      setActivityData(formattedActivityData);

    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };


  useEffect(() => {
    fetchTransactions();
    // Fetch Dashboard main data
    axios.get("/dashboard")
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
        console.error("There was an error fetching dashboard data:", error);
        setLoading(false);
      });

    // Fetch Leads by Date
    axios.get("/getLeadsByDate")
    .then((res) => {
      setTotalLeads(res.data.totalLeadsOverall);

      const todayData = res.data.totalLeadsByDate[0]; // safely get the first item
      if (todayData) {
        setTodayLeads(todayData.totalLeads);
        console.log("Today's leads: " + todayData.totalLeads);
      } else {
        setTodayLeads(0);
        console.log("No leads found for today.");
      }
  

       
       setLoading(false);
    })
    .catch((err) => console.error("Error fetching leads by date:", err));

},

[]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="home-container">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="home-header">
          <div>
            <h4>Hello Admin 👋</h4>
            <p>Welcome to your Dashboard</p>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <FaSearch className="icon" />
              <input type="text" placeholder="Search..." />
            </div>
            <div className="notification-icon">
              <FaBell size={20} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="stats-grid">
       



{/* Combined Leads Card */}
<motion.div className="card double-lead-card" custom={0} initial="hidden" animate="visible" variants={fadeInUp}>
  <div className="card-body">
    <h6>Leads Overview</h6>
    <div className="lead-counts">
      <div>
        <p className="label">Today's Leads</p>
        <h3>{todayLeads}</h3>
      </div>
      <div>
        <p className="label">Total Leads</p>
        <h3>{totalLeads}</h3> 
      </div>
    </div>
    <div className="lead-links">
      <button className="view-link" onClick={openModal}>Daily</button>
      <a className="view-link" href="/LeadsByDate">All</a>
    </div>
  </div>
</motion.div>



  








        {/* Active Students */}
        <motion.div className="card" custom={2} initial="hidden" animate="visible" variants={fadeInUp}>
          <div className="card-body">
            <h6>Active Students</h6>
            <h3>{activeStudents}</h3>
            <a href="/students" className="view-link">View</a>
          </div>
        </motion.div>

        {/* Course Count */}
        <motion.div className="card" custom={3} initial="hidden" animate="visible" variants={fadeInUp}>
          <div className="card-body">
            <h6>Course Count</h6>
            <h3>5</h3>
            <a href="/courses" className="view-link">View</a>
          </div>
        </motion.div>
      </div>

    

<div className="charts-grid">
      <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="card-body">
          <h5>Revenue</h5>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
          <p>Total Revenue: ${revenue}</p>
          <p>Revenue This Month: ${(revenue).toFixed(2)}</p> {/* Example logic */}
          <p>Today Revenue: ${todayRevenue}</p>
        </div>
      </motion.div>

      <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="card-body">
          <h5>Payment Status</h5>
          <div className="payment-status">
            <div><h6>Paid</h6><p>{paymentStatus.paid}%</p></div>
            <div><h6>Pending</h6><p>{paymentStatus.pending}%</p></div>
            <div><h6>Overdue</h6><p>{paymentStatus.overdue}%</p></div>
          </div>
        </div>
      </motion.div>
    </div>









      {/* Attendance Snapshot */}
      <motion.div className="card attendance-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="card-body">
          <h5>Attendance Snapshot</h5>
          <p>Total Attendance: 85%</p>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: "85%" }}>85%</div>
          </div>
        </div>
      </motion.div>

      {/* Today's Events */}
      <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <div className="card-body">
          <h5>Today's Events</h5>
          <ul>
            <li>Live Class: React Basics - 10:00 AM</li>
            <li>Webinar: Advanced JavaScript - 2:00 PM</li>
            <li>Live Class: Node.js Fundamentals - 4:00 PM</li>
          </ul>
        </div>
      </motion.div>

      {/* Calendar */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
        <SchedulerCalendar />
      </motion.div>

      {/* Modal for Daily Leads Overview */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>📆 Daily Leads Overview</h2>
            <button className="close-btn" onClick={closeModal}>X</button>
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Number of Leads</th>
                </tr>
              </thead>
              <tbody>
                {dailyLeads.map(day => (
                  <tr key={day._id}>
                    <td>{day._id}</td>
                    <td>{day.totalLeads}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

