import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../style/PaymentButton.css"; // External CSS

const PaymentButton = ({ amount }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/create-order", { amount });

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: data.amount,
        currency: "INR",
        name: "EduProject",
        description: "Course Payment",
        order_id: data.id,
        handler: async function (response) {
          await axios.post("http://localhost:5000/api/verify-payment", response);
          alert("Payment successful!");
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
    setLoading(false);
  };

  return (
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
  );
};

export default PaymentButton;



// import React, { useState } from "react";
// import axios from "axios";

// const PaymentButton = ({ amount }) => {
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.post("http://localhost:5000/api/create-order", { amount });
//       const options = {
//         key: "YOUR_RAZORPAY_KEY_ID",
//         amount: data.amount,
//         currency: "INR",
//         name: "EduProject",
//         description: "Course Payment",
//         order_id: data.id,
//         handler: async function (response) {
//           await axios.post("http://localhost:5000/api/verify-payment", response);
//           alert("Payment successful!");
//         },
//         prefill: {
//           name: "John Doe",
//           email: "john@example.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//     }
//     setLoading(false);
//   };

//   return <button onClick={handlePayment} disabled={loading}>{loading ? "Processing..." : "Pay Now"}</button>;
// };

// export default PaymentButton;

// const express = require("express");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// require("dotenv").config();

// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create Order
// router.post("/create-order", async (req, res) => {
//   try {
//     const options = {
//       amount: req.body.amount * 100, // Amount in paise
//       currency: "INR",
//       receipt: "order_rcptid_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Verify Payment
// router.post("/verify-payment", (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;
//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(body)
//     .digest("hex");

//   if (expectedSignature === razorpay_signature) {
//     res.json({ success: true, message: "Payment verified successfully!" });
//   } else {
//     res.status(400).json({ success: false, message: "Payment verification failed!" });
//   }
// });

// module.exports = router;
// const express = require("express");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// require("dotenv").config();

// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create Order API
// router.post("/api/create-order", async (req, res) => {
//   try {
//     const options = {
//       amount: req.body.amount * 100, // Convert amount to paise
//       currency: "INR",
//       receipt: "order_rcptid_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Verify Payment API
// router.post("/api/verify-payment", (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;
//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(body)
//     .digest("hex");

//   if (expectedSignature === razorpay_signature) {
//     res.json({ success: true, message: "Payment verified successfully!" });
//   } else {
//     res.status(400).json({ success: false, message: "Payment verification failed!" });
//   }
// });

// module.exports = router;

