const mongoose = require("mongoose")
const express = require("express")
const app =express() 





app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is running');
});
module.exports = app;