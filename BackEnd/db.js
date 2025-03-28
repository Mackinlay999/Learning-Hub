const mongoose =require("mongoose");
const app = require('./app')


require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    app.listen(3000)
    console.log("database connectes");
    
}).catch((err)=>{
    console.log( err , "databse not connected");
})