const mongoose =require("mongoose");
const app = require('./app')
// const  emailCronJob = require("./Utils/EmailsJob.js")



require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    app.listen(3000)
    console.log("database connectes");
    // emailCronJob.start(); 
    
}).catch((err)=>{
    console.log( err , "databse not connected");
})