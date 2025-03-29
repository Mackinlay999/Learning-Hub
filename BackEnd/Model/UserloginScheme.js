const  mongoose  = require("mongoose");


const userScheme = new mongoose.Schema({
    username : "String",
    email:"string",
    password : "String",
    role: {
        type:"String",
        enum :["user","admin","manager"],
            default:"user"

    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpires : Date
    // resetPasswordExpires: Date.now ,


})

module.exports =mongoose.model("user",userScheme)











