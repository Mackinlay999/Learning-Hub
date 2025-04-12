import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";

import NotFound from "./components/NotFound"; // For handling 404 pages
import "./style/App.css"; // Import custom styles
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from './components/Login'
import Register from "./components/Register"
import PasswordReset  from './components/PasswordReset'


import Userdetails from "./components/Userdetails"
import Dashboard from "./components/Dashboard"


import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";



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
      </div>
    </Router>
  );
}

export default App;
