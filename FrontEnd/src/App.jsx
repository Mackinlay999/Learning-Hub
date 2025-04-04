import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import BlogTraining from './components/BlogTraining'
import Enterprise from './components/Enterprise'
import Webinars from './components/Webinars'
import Recruiters from './components/Recruiters'
import Login from './components/Login'
import Register from "./components/Register"
import PasswordReset  from './components/PasswordReset'
import ProgramDetail from './components/ProgramDetail'
import Program from './components/Program' 

import Userdetails from "./components/Userdetails"
import Dashboard from "./components/Dashboard"

=======
import BlogTraining from "./components/BlogTraining";
import Enterprise from "./components/Enterprise";
import Webinars from "./components/Webinars";
import Recruiters from "./components/Recruiters";
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordReset from "./components/PasswordReset";
import ProgramDetail from "./components/ProgramDetail";
import Program from "./components/Program";
>>>>>>> marcus
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";
import BusinessAnalytics from "./components/BussinessAnalytics";
import HRProgram from "./components/HRProgram";
import MarketingProgram from "./components/MarketingProgram";
import SalesProgram from "./components/SalesProgram";
import FinanceProgram from "./components/FinanceProgram";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
        <Routes>
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
<<<<<<< HEAD
          <Route path="/program/:title" element={<ProgramDetail />} />
          <Route path="/Userdetails" element={<Userdetails />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />

          <Route path="*" element={<NotFound />} />{' '}
=======
          <Route path="/program/:id" element={<ProgramDetail />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          <Route path="/program" element={<Program />} />
          <Route path="/program/:id" element={<ProgramDetail />} />
          <Route path="/program/business" element={<BusinessAnalytics />} />
          <Route path="/program/hr" element={<HRProgram />} />
          <Route path="/program/marketing" element={<MarketingProgram />} />
          <Route path="/program/sales" element={<SalesProgram />} />
          <Route path="/program/finance" element={<FinanceProgram />} />
          <Route path="*" element={<NotFound />} />{" "}
>>>>>>> marcus
          {/* Catch-all route for 404 pages */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
