const mongoose = require("mongoose")
const express = require("express")
const app =express()
const cookieParser = require("cookie-parser");
const AllRouters =require("./Route/AllRouters") 
const cors = require("cors")



const corsOptions = {
    origin: "http://localhost:5173", // ✅ Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type"],
    credentials: true, // ✅ Required to send cookies
  };
app.use(express.json())

app.use(cors(corsOptions));
app.use(cookieParser());


  

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use("/api", AllRouters);
module.exports = app;