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


const corsOptions = {
    origin: "http://localhost:5173", // ✅ Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type"],
    credentials: true, // ✅ Required to send cookies
  };
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

module.exports = app;