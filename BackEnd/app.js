const mongoose = require("mongoose")
const express = require("express")
const app =express()
const cookieParser = require("cookie-parser");
const AllRouters =require("./Route/AllRouters") 
const cors = require("cors")
const paymentRoutes = require("./Route/PaymentRoutes")
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { errorHandler } = require("./middlewares/errorHandler");
const ticketRoutes = require("./Route/TicketRoutes.js");
const feedbackRoutes = require("./Route/FeedbackRoutes.js");
const communityRoutes = require("./Route/communityRoutes.js");
const insightRoutes = require("./Route/insightRoutes.js");
const reportRoutes = require("./Route/reportRoutes");
const decisionInsightRoutes = require("./Route/decisionInsightRoutes.js");
const corporateClientRoutes = require("./Route/corporateClientRoutes");
const employeeRoutes = require("./Route/employeeRoutes");
const customLearningPathRoutes = require("./Route/customLearningPathRoutes");
const transactionRoutes = require("./Route/transactionRoutes");
const refundRoutes = require("./Route/refundRoutes");
const commissionPayoutRoutes = require("./Route/commissionPayoutRoutes");
const adminRoutes = require("./Route/adminRoutes"); // ✅ Import
const websiteContentRoutes = require("./Route/websiteContentRoutes");
const emailCampaignRoutes = require("./Route/emailCampaignRoutes"); // ⬅️ Import
const funnelEntryRoutes = require("./Route/funnelEntryRoutes.js");
const discountRoutes = require("./Route/discountRoutes");
const dashboardRoutes = require('./Route/dashboardRoutes');

const mentorRoutes = require("./Route/mentorRoutes");
const studentRoutes = require("./Route/studentRoutes.js");
const blogRoutes = require("./Route/blogRoutes");
const webinarRoutes = require("./Route/webinarRoutes");





const allowedOrigins = [
  "http://localhost:5173", // Frontend 1
  "http://localhost:5174"  // Frontend 2
];




const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow the specified origins and also allow no origin (i.e., for Postman requests)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET,POST,PUT,DELETE"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true, // Required to send cookies
};




// const corsOptions = {
//     origin: "http://localhost:5173", // ✅ Your frontend URL
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: ["Content-Type"],
//     credentials: true, // ✅ Required to send cookies
//   };
app.use(express.json())

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200, // limit each IP to 100 requests
    message: "Too many requests from this IP, try again later.",
  })
);
app.use(errorHandler);
  

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use("/api", AllRouters);
app.use("/api", paymentRoutes);
app.use("/api", ticketRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", communityRoutes);
app.use("/api", insightRoutes);
app.use("/api", reportRoutes);
app.use("/api", decisionInsightRoutes);
app.use("/api", corporateClientRoutes);
app.use("/api", employeeRoutes);
app.use("/api", customLearningPathRoutes);
app.use("/api", transactionRoutes);
app.use("/api", refundRoutes);
app.use("/api", commissionPayoutRoutes);
app.use("/api", adminRoutes); // ✅ Use
app.use("/api", websiteContentRoutes);
app.use("/api", emailCampaignRoutes); 
app.use("/api", funnelEntryRoutes);
app.use("/api", discountRoutes);
// Add the dashboard route
app.use('/api', dashboardRoutes);
app.use("/api", mentorRoutes);
app.use("/api", studentRoutes);
// app.use("/api", studentDetailRoutes); 

app.use("/api", blogRoutes);
app.use("/api", webinarRoutes);



module.exports = app;