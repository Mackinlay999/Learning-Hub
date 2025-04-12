const Dashboard = require('../Model/DashboardModel'); // Import the Dashboard model

// Fetch dashboard data
const getDashboardData = async (req, res) => {
  try {
    const data = await Dashboard.findOne(); // assuming only one record for the dashboard
    if (!data) {
      return res.status(404).json({ message: 'Dashboard data not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getDashboardData };
