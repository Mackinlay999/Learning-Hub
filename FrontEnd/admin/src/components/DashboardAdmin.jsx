import { FaUsers, FaBook, FaDollarSign, FaChartBar } from "react-icons/fa";
import "../style/AdminDashboardAdmin.css"

const DashboardAdmin = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <FaUsers className="dashboard-icon users-icon" />
          <div>
            <h2 className="card-title">Users</h2>
            <p className="card-text">1,200 Active</p>
          </div>
        </div>
        <div className="dashboard-card">
          <FaBook className="dashboard-icon courses-icon" />
          <div>
            <h2 className="card-title">Courses</h2>
            <p className="card-text">350 Available</p>
          </div>
        </div>
        <div className="dashboard-card">
          <FaDollarSign className="dashboard-icon revenue-icon" />
          <div>
            <h2 className="card-title">Revenue</h2>
            <p className="card-text">$45,000</p>
          </div>
        </div>
        <div className="dashboard-card">
          <FaChartBar className="dashboard-icon reports-icon" />
          <div>
            <h2 className="card-title">Reports</h2>
            <p className="card-text">120 Generated</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
