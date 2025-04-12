import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"; // Sidebar component
import NotFound from "./components/NotFound"; // For handling 404 pages
import "./style/App.css"; // Import custom styles
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import Login from "./components/Login";
import Register from "./components/Register";
import PasswordReset from "./components/PasswordReset";

import Userdetails from "./components/Userdetails";
import Dashboard from "./components/Dashboard";

import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <Router>
      <div className="d-flex">
        {showSidebar && <Sidebar />}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
        <div
          className="flex-grow-1 p-3"
          style={{ minHeight: "100vh", background: "#f8f9fa" }}
        >
          <div className="d-md-none mb-3">
            <Button variant="outline-primary" onClick={toggleSidebar}>
              <FaBars /> Menu
            </Button>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/Userdetails" element={<Userdetails />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<PaymentFailure />} />
            <Route path="*" element={<NotFound />} />{" "}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
