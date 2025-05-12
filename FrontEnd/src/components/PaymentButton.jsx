import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "../style/PaymentButton.css";

const PaymentButton = ({ amount, user = {} }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("❌ Failed to load Razorpay SDK. Try again later.");
      setLoading(false);
      return;
    }
    try {
      // Step 1: Create Order
      const { data: order } = await axios.post(
        "https://learning-hub-p2yq.onrender.com/api/create-order",
        { amount }
      );

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: order.amount,
        currency: "INR",
        name: "EduProject",
        description: "Course Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Step 2: Verify Payment
            const verifyRes = await axios.post(
              "https://learning-hub-p2yq.onrender.com/api/verify-payment",
              response
            );

            if (verifyRes.data.success) {
              toast.success("✅ Payment successful! Redirecting...", {
                autoClose: 2000,
              });
              setTimeout(() => navigate("/payment-success"), 2500);
            } else {
              toast.error("❌ Payment verification failed.");
              setTimeout(() => navigate("/payment-failure"), 2500);
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error(
              "❌ Payment verification failed. Please contact support."
            );
            setTimeout(() => navigate("/payment-failure"), 2500);
          }
        },
        prefill: {
          name: user.name || "John Doe",
          email: user.email || "john@example.com",
          contact: user.contact || "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("❌ Payment error:", error);
      toast.error("❌ Payment failed. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <>
      <motion.button
        className="payment-btn"
        onClick={handlePayment}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </motion.button>
    </>
  );
};

export default PaymentButton;
