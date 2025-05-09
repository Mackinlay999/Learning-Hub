// const express = require("express");
// const router = express.Router();
// const { createOrder, verifyPayment } = require("../controller/paymentController");
// const { validate } = require("../middlewares/validateRequest");
// const { body } = require("express-validator");
// // Create Order Route
// router.post(
//     "/create-order",
//     validate([body("amount").isNumeric().withMessage("Amount must be a number")]),
//     createOrder
//   );
  
//   // Verify Payment Route
//   router.post(
//     "/verify-payment",
//     validate([
//       body("razorpay_order_id").notEmpty(),
//       body("razorpay_payment_id").notEmpty(),
//       body("razorpay_signature").notEmpty(),
//     ]),
//     verifyPayment
//   );

// module.exports = router;
