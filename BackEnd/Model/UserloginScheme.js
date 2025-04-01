const  mongoose  = require("mongoose");


const userScheme = new mongoose.Schema({
    username : { type :String ,required: true },
    email:{type :String ,required: true },
    password : {type :String ,required: true },
    number: { 
        type: String, 
        required: true, 
        validate: {
          validator: function(v) {
            return /^\d{10}$/.test(v);  // Ensures the number is exactly 10 digits
          },
          message: props => `${props.value} is not a valid phone number!`
        }
      },
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











