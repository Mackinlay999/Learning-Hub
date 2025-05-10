// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const Payment = require("../model/Payment");
// const { log } = require("../Utils/logger");
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
// exports.createOrder = async (req, res, next) => {
//     try {
//       const { amount } = req.body;
  
//       if (!amount || amount < 1) {
//         return res.status(400).json({ error: "Invalid amount" });
//       }
  
//       const order = await razorpay.orders.create({
//         amount: amount * 100,
//         currency: "INR",
//         receipt: "receipt_" + Date.now(),
//       });
  
//       log("Order created:", order.id);
//       res.status(201).json(order);
//     } catch (err) {
//       next(err);
//     }
//   };
  
//   exports.verifyPayment = async (req, res, next) => {
//     try {
//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user, amount } = req.body;
  
//       if (!(razorpay_order_id && razorpay_payment_id && razorpay_signature)) {
//         return res.status(400).json({ error: "Incomplete payment details" });
//       }
  
//       const generated_signature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//         .digest("hex");
  
//       const isValid = crypto.timingSafeEqual(
//         Buffer.from(generated_signature),
//         Buffer.from(razorpay_signature)
//       );
  
//       if (!isValid) {
//         return res.status(400).json({ success: false, message: "Invalid signature" });
//       }
  
//       await Payment.create({
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//         user,
//         amount,
//       });
  
//       log("✅ Payment verified:", razorpay_payment_id);
//       res.status(200).json({ success: true, message: "Payment verified successfully!" });
//     } catch (err) {
//       next(err);
//     }
//   };
