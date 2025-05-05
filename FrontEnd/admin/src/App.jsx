import React, { createContext, useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login"; // Assuming Login acts as LoginPortal
import NotAuthorized from "./components/NotAuthorized";
import { Navigate } from "react-router-dom";

import AdminHome from "./components/AdminHome";
import NotFound from "./components/NotFound";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Students, StudentDetail } from "./components/studentManagement";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
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
import Mentors from "./components/Mentors";
import MentorDetail from "./components/MentorDetail";
import Suceess from "./components/Suceess";
import BlogWebinar from "./components/BlogWebinar";
import RecruiterDashboard from "./components/RecruiterDashboard";
import Partners from "./components/Partners";
import PostJob from "./components/PostJob";
import Applicants from "./components/Applicants";
import ScheduleInterview from "./components/ScheduleInterview";
import EmailCampaign from "./components/EmailCampaign";
import ResumeViewer from "./components/ResumeViewer";

import AuthProvider from "./context/AuthContext"; // Adjust path as necessary

import { useAuth } from "./context/AuthContext";

import LeadsByDate from "./components/LeadByDate";
import LeadDetails from "./components/LeadDetails";
import Courses from "./components/Courses";

function App() {
  const { auth } = useAuth();

  if (auth.loading) {
    return <div>Loading...</div>; // Simple loader until auth is ready
  }
  return (
    <Router>
      <div className="App">
        <div
          className="d-flex flex-column flex-md-row"
          style={{ minHeight: "100vh" }}
        >
          {/* Sidebar */}
          {auth.token && (
            <div className="d-none d-md-block">
              <Sidebar />
            </div>
          )}
          {/* Main Content */}
          <div className="flex-grow-1" style={{ background: "#f8f9fa" }}>
            <div className="d-md-none p-2 bg-white border-bottom shadow-sm sticky-top z-3">
              {auth.token && <Sidebar />}
            </div>

            <div className="p-3">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/PasswordReset" element={<PasswordReset />} />
                <Route path="/not-authorized" element={<NotAuthorized />} />
                <Route
                  path="/"
                  element={auth.token ? <Navigate to="/home" /> : <Login />}
                />
                {/* Protected routes */}
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute allowedRoles={["Super Admin", "Admin"]}>
                      <AdminHome />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/courses"
                  element={
                    <ProtectedRoute
                      allowedRoles={["Admin", "Super Admin", "Recruiter"]}
                    >
                      <Courses />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Userdetails"
                  element={
                    <ProtectedRoute
                      allowedRoles={["Admin", "Super Admin", "Recruiter"]}
                    >
                      <Userdetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment-success"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <PaymentSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment-failure"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <PaymentFailure />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/super-admin"
                  element={
                    <ProtectedRoute allowedRoles={["Super Admin"]}>
                      <SuperAdminPanel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lead-student"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <LeadAndStudentManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/training-program"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <Trainingprogram />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/email-marketing"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <EMailMarketing />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/finance-payment"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <FinanceAndPayment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/corporate-training"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <CorporateTrainingEnterprice />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analytics-reports"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <AnalyticsAndReports />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/support-feedback"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <SupportAndFeedback />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/recruitment"
                  element={
                    <ProtectedRoute
                      allowedRoles={["Admin", "Recruiter", "Super Admin"]}
                    >
                      <RecruiterAndPlacementManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/students"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <Students />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/students/:id"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <StudentDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-student"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <AddStudent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-student/:id"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <EditStudent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mentors"
                  element={
                    <ProtectedRoute
                      allowedRoles={["Admin", "Mentor", "Super Admin"]}
                    >
                      <Mentors />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/mentors/:id"
                  element={
                    <ProtectedRoute
                      allowedRoles={["Admin", "Mentor", "Super Admin"]}
                    >
                      <MentorDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/Suceess"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <Suceess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/blog-webinar"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <BlogWebinar />
                    </ProtectedRoute>
                  }
                />
                {/* <Route
                  path="/recruiters/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["Recruiter", "Super Admin"]}>
                      <RecruiterDashboard />
                    </ProtectedRoute>
                  }
                /> */}
                <Route
                  path="/recruiters/partners"
                  element={
                    <ProtectedRoute allowedRoles={["Recruiter", "Super Admin"]}>
                      <Partners />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/recruiters/post"
                  element={
                    <ProtectedRoute allowedRoles={["Recruiter", "Super Admin"]}>
                      <PostJob />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/recruiters/applicants"
                  element={
                    <ProtectedRoute allowedRoles={["Recruiter", "Super Admin"]}>
                      <Applicants />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/recruiters/schedule"
                  element={
                    <ProtectedRoute allowedRoles={["Recruiter", "Super Admin"]}>
                      <ScheduleInterview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/recruiters/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["Recruiter", "Super Admin"]}>
                      <RecruiterDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/EmailCampaign"
                  element={
                    <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                      <EmailCampaign />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/resume"
                  element={
                    <ProtectedRoute
                      allowedRoles={["Admin", "Recruiter", "Super Admin"]}
                    >
                      <ResumeViewer />
                    </ProtectedRoute>
                  }
                />
                {/* Fallback 404 */}
                <Route path="*" element={<NotFound />} />
                <Route path="/recruiters" element={<RecruiterDashboard />} />
                <Route path="/EmailCampaign" element={<EmailCampaign />} />
                <Route path="/resume" element={<ResumeViewer />} />
                <Route path="/LeadsByDate" element={<LeadsByDate />} />
                <Route path="/LeadDetails" element={<LeadDetails />} />
                {/* Catch-all route for 404 pages */}
                <Route path="*" element={<NotFound />} />{" "}
                {/* Catch-all route for 404 pages */}
              </Routes>
            </div>
          </div>
        </div>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
      </div>
    </Router>
  );
}

export default App;
