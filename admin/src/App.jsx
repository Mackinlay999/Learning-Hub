import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import NotFound from "./components/NotFound";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

import Login from "./components/Login";
import Register from "./components/Register";
import PasswordReset from "./components/PasswordReset";
import Userdetails from "./components/Userdetails";
import Dashboard from "./components/Dashboard";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";
import SuperAdminPanel from "./components/SuperAdminPanel";
import LeadAndStudentManagement from "./components/LeadAndStudentManagement";
import Trainingprogram from "./components/Traningprogram";
import EMailMarketing from "./components/EMailMarketing";
import FinanceAndPayment from "./components/FinanceAndPayment";
import CorporateTrainingEnterprice from "./components/CorporateTrainingEnterprice";
import AnalyticsAndReports from "./components/AnalyticsAndReports";
import SupportAndFeedback from "./components/SupportAndFeedback";
import RecruiterAndPlacementManagement from "./components/RecruiterAndPlacementManagement";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <Router>
<<<<<<< HEAD
           
      <div className="App">
        <Navbar />
=======
      <div
        className="d-flex flex-column flex-md-row"
        style={{ minHeight: "100vh" }}
      >
        {/* Sidebar */}
        {showSidebar && (
          <div className="d-none d-md-block">
            <Sidebar />
          </div>
        )}

>>>>>>> e81fc5466f075855b86849b1579f56cb10ba4dc8
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
<<<<<<< HEAD
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/PasswordReset" element={<PasswordReset />} />
          <Route path="/Userdetails" element={<Userdetails />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
          {/* <Route path="/program/:id" element={<ProgramDetail />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          <Route path="/program" element={<Program />} />
          <Route path="/program/business" element={<BusinessAnalytics />} />
          <Route path="/program/hr" element={<HrProgram />} />
          <Route path="/program/marketing" element={<MarketingProgram />} />
          <Route path="/program/sales" element={<SalesProgram />} />
          <Route path="/program/finance" element={<FinanceProgram />} /> */}
          
          <Route path="*" element={<NotFound />} />{" "}
          {/* Catch-all route for 404 pages */}
        </Routes>
        <Footer />
=======

        {/* Main Content */}
        <div className="flex-grow-1" style={{ background: "#f8f9fa" }}>
          {/* Toggle button for small screens */}
          <div className="d-md-none p-2 bg-white border-bottom shadow-sm sticky-top z-3">
            <Button variant="outline-primary" onClick={toggleSidebar}>
              <FaBars /> Menu
            </Button>
            {showSidebar && <Sidebar />}
          </div>

          {/* Page Content */}
          <div className="p-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/super-admin" element={<SuperAdminPanel />} />
              <Route
                path="/lead-student"
                element={<LeadAndStudentManagement />}
              />
              <Route path="/training-program" element={<Trainingprogram />} />
              <Route path="/email-marketing" element={<EMailMarketing />} />
              <Route path="/finance-payment" element={<FinanceAndPayment />} />
              <Route
                path="/corporate-training"
                element={<CorporateTrainingEnterprice />}
              />
              <Route
                path="/analytics-reports"
                element={<AnalyticsAndReports />}
              />
              <Route
                path="/support-feedback"
                element={<SupportAndFeedback />}
              />
              <Route
                path="/recruitment"
                element={<RecruiterAndPlacementManagement />}
              />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/PasswordReset" element={<PasswordReset />} />
              <Route path="/Userdetails" element={<Userdetails />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failure" element={<PaymentFailure />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          {/* Footer (optional to show conditionally) */}
          {/* <Footer /> */}
        </div>
>>>>>>> e81fc5466f075855b86849b1579f56cb10ba4dc8
      </div>
    </Router>
  );
}

export default App;
