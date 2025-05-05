import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../style/PaymentSuccess.css"; // Import the CSS file

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("✅ Payment Successful! Thank you for your purchase.");
    setTimeout(() => navigate("/"), 4000); // Redirect after 4 seconds
  }, [navigate]);

  return (
    <div className="payment-success-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase. You will be redirected shortly.</p>
        <button className="continue-btn" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
