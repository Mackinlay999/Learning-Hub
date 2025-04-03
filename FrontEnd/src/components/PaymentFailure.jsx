import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../style/PaymentFailure.css"; // Import the CSS file

const PaymentFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("❌ Payment Failed. Please try again.");
    setTimeout(() => navigate("/"), 4000);
  }, [navigate]);

  return (
    <div className="payment-failure-container">
      <div className="failure-card">
        <div className="failure-icon">❌</div>
        <h2>Payment Failed!</h2>
        <p>Oops! Something went wrong. Please try again.</p>
        <button className="retry-btn" onClick={() => navigate("/")}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
