import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Career from "./components/Career";
import SuccessStory from "./components/SuccessStory";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound"; // For handling 404 pages
import "./style/App.css"; // Import custom styles
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import { ToastContainer } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css";
import BlogTraining from "./components/BlogTraining";
import Enterprise from "./components/Enterprise";
import Webinars from "./components/Webinars";
import Recruiters from "./components/Recruiters";
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordReset from "./components/PasswordReset";
import ProgramDetail from "./components/ProgramDetail";
import Program from "./components/Program";

import Userdetails from "./components/Userdetails";

import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";
import BusinessAnalytics from "./components/BussinessAnalytics";
import HrProgram from "./components/HrProgram";
import MarketingProgram from "./components/MarketingProgram";
import SalesProgram from "./components/SalesProgram";
import FinanceProgram from "./components/FinanceProgram";
// import DashboardAdmin from "../admin/src/components/DashboardAdmin";

// DashboardAdmin

import ProtectedRoute from "./components/ProtectedRoute";

import Sidebar from "./components/AdminSidebar";

import AdminLogin from "./components/AdminLogin"; // Assuming Login acts as LoginPortal

import NotAuthorized from "./components/NotAuthorized";
import { Navigate } from "react-router-dom";

import AdminHome from "./components/AdminHome";

import "./style/AdminApp.css";

import {
  AdminStudents,
  AdminStudentDetail,
} from "./components/AdminStudentManagement";
import AdminAddStudent from "./components/AdminAddStudent";
import AdminEditStudent from "./components/AdminEditStudent";
import AdminRegister from "./components/AdminRegister";

import AdminUserdetails from "./components/AdminUserdetails";
import AdminDashboard from "./components/AdminDashboard";

import SuperAdminPanel from "./components/SuperAdminPanel";

import AdminLeadAndStudentManagement from "./components/AdminLeadAndStudentManagement";
import AdminTrainingprogram from "./components/AdminTraningprogram";
import AdminEMailMarketing from "./components/AdminEMailMarketing";
import AdminFinanceAndPayment from "./components/AdminFinanceAndPayment";
import AdminCorporateTrainingEnterprice from "./components/AdminCorporateTrainingEnterprice";
import AdminAnalyticsAndReports from "./components/AdminAnalyticsAndReports";
import AdminSupportAndFeedback from "./components/AdminSupportAndFeedback";
import AdminRecruiterAndPlacementManagement from "./components/AdminRecruiterAndPlacementManagement";
import AdminMentors from "./components/AdminMentors";
import AdminMentorDetail from "./components/AdminMentorDetail";
import AdminSuceess from "./components/AdminSuceess";
import AdminBlogWebinar from "./components/AdminBlogWebinar";
import AdminRecruiterDashboard from "./components/AdminRecruiterDashboard";
import AdminPartners from "./components/AdminPartners";
import AdminPostJob from "./components/AdminPostJob";
import AdminApplicants from "./components/AdminApplicants";
import AdminScheduleInterview from "./components/AdminScheduleInterview";
import AdminEmailCampaign from "./components/AdminEmailCampaign";
import AdminResumeViewer from "./components/AdminResumeViewer";
import AdminLoginPortal from "./components/AdminLoginPortal";

import AuthProvider from "./context/AuthContext";

import { useAuth } from "./context/AuthContext";

import AdminLeadsByDate from "./components/AdminLeadByDate";
import AdminLeadDetails from "./components/AdminLeadDetails";
import AdminCourses from "./components/AdminCourses";

// Layout for public-facing pages (Navbar + Footer)
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet /> {/* Public pages render here */}
    <Footer />
  </>
);
// // Layout for admin pages (Sidebar only)
// const AdminLayout = () => (
//   <>
//     <Sidebar />
//     <Outlet /> {/* Admin pages render here */}
//   </>
// );
const AdminLayout = () => {
  const { auth } = useAuth();

  return (
    <div className="d-flex flex-column flex-md-row">
      {/* Sidebar for medium and up */}
      {auth.token && (
        <div className="d-none d-md-block">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow-1" style={{ background: "#f8f9fa" }}>
        {/* Sidebar for small screens (mobile) */}
        <div className="d-md-none p-2 bg-white border-bottom shadow-sm sticky-top z-3">
          {auth.token && <Sidebar />}
        </div>
        <Outlet /> {/* Render nested routes here */}
      </div>
    </div>
  );
};

// main
function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/career-support" element={<Career />} />
            <Route path="/success-story" element={<SuccessStory />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog-training" element={<BlogTraining />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/for-recruiters" element={<Recruiters />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/program" element={<Program />} />
            <Route path="/program/:title" element={<ProgramDetail />} />
            <Route path="/Userdetails" element={<Userdetails />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<PaymentFailure />} />
            <Route path="/program/business" element={<BusinessAnalytics />} />
            <Route path="/program/hr" element={<HrProgram />} />
            <Route path="/program/marketing" element={<MarketingProgram />} />
            <Route path="/program/sales" element={<SalesProgram />} />
            <Route path="/program/finance" element={<FinanceProgram />} />
            {/* <Route path="*" element={<NotFound />} />{" "} */}
            {/* Catch-all route for 404 pages */}
          </Route>

          {/* Public routes */}
          <Route path="/admin-login" element={<AdminLoginPortal />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-PasswordReset" element={<PasswordReset />} />
          <Route path="/admin-not-authorized" element={<NotAuthorized />} />
          <Route
            path="admin/*"
            element={
              <ProtectedRoute
                allowedRoles={["Admin", "Super Admin", "Recruiter", "Mentor"]}
              >
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Protected Admin Routes - With Sidebar/Layout */}
            <Route
              path="admin-home"
              element={
                <ProtectedRoute allowedRoles={["Super Admin", "Admin"]}>
                  <AdminHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-courses"
              element={
                <ProtectedRoute
                  allowedRoles={["Admin", "Super Admin", "Recruiter"]}
                >
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-Userdetails"
              element={
                <ProtectedRoute
                  allowedRoles={["Admin", "Super Admin", "Recruiter"]}
                >
                  <AdminUserdetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="super-admin"
              element={
                <ProtectedRoute allowedRoles={["Super Admin"]}>
                  <SuperAdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-lead-student"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminLeadAndStudentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-training-program"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminTrainingprogram />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-email-marketing"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminEMailMarketing />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-finance-payment"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminFinanceAndPayment />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-corporate-training"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminCorporateTrainingEnterprice />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-analytics-reports"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminAnalyticsAndReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-support-feedback"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminSupportAndFeedback />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-recruitment"
              element={
                <ProtectedRoute
                  allowedRoles={["Admin", "Recruiter", "Super Admin"]}
                >
                  <AdminRecruiterAndPlacementManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-students"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-students/:id"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminStudentDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-add-student"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminAddStudent />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-edit-student/:id"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminEditStudent />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin-mentors"
              element={
                <ProtectedRoute
                  allowedRoles={["Admin", "Mentor", "Super Admin"]}
                >
                  <AdminMentors />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-mentors/:id"
              element={
                <ProtectedRoute
                  allowedRoles={["Admin", "Mentor", "Super Admin"]}
                >
                  <AdminMentorDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-Suceess"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminSuceess />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-blog-webinar"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminBlogWebinar />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin-recruiters/partners"
              element={
                <ProtectedRoute allowedRoles={["Recruiter", "Super Admin"]}>
                  <AdminPartners />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-recruiters/post"
              element={
                <ProtectedRoute allowedRoles={["Recruiter", "Super Admin"]}>
                  <AdminPostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-recruiters/applicants"
              element={
                <ProtectedRoute allowedRoles={["Recruiter", "Super Admin"]}>
                  <AdminApplicants />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-recruiters/schedule"
              element={
                <ProtectedRoute allowedRoles={["Recruiter", "Super Admin"]}>
                  <AdminScheduleInterview />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-recruiters/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Recruiter", "Super Admin"]}>
                  <AdminRecruiterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-EmailCampaign"
              element={
                <ProtectedRoute allowedRoles={["Admin", "Super Admin"]}>
                  <AdminEmailCampaign />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-resume"
              element={
                <ProtectedRoute
                  allowedRoles={["Admin", "Recruiter", "Super Admin"]}
                >
                  <AdminResumeViewer />
                </ProtectedRoute>
              }
            />
            {/* Fallback 404 */}

            <Route path="recruiters" element={<AdminRecruiterDashboard />} />
            <Route path="EmailCampaign" element={<AdminEmailCampaign />} />
            <Route path="resume" element={<AdminResumeViewer />} />
            <Route path="LeadsByDate" element={<AdminLeadsByDate />} />
            <Route path="LeadDetails" element={<AdminLeadDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
