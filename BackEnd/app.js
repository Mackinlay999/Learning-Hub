const mongoose = require("mongoose")
const express = require("express")
const app =express()
const cookieParser = require("cookie-parser");
const AllRouters =require("./Route/AllRouters") 
const cors = require("cors")




app.use(express.json())

app.use(cors());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",  // Change to your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type"],
}));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use("/api", AllRouters);
module.exports = app;