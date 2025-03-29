const mongoose =require("mongoose")
const user = require("../Model/UserloginScheme");
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken");
const app  = require("../app");
require("dotenv").config();
const nodemailer =require('nodemailer')



const login = {
    register : async (req,res)=>{
         try {
            console.log("register login");
            console.log(req.body);
            
           const { username , email,password} = req.body

           const verifyemail = await user.findOne({email:email}) 
              console.log(verifyemail);
              
           if(verifyemail){
            return res.status(400).json({message:"user already there"})
           }

      const hashpassword = await  bcrypt.hash(password , 10)
           const newuser = new user ({
            username ,  email,password : hashpassword
           })

           await newuser.save()

           res.status(200).json({mesage:"user created successfully"})
            
            
         } catch (err) {
            res.status(400).json({message:err.message})
         }
    },
    admin : async(req,res)=>{
        try {
           
            
             const alldata =await user.find()
            
             
          res.status(200).json(alldata)
               
        } catch (error) {
            res.status(400).json({meaasge:error.message})
            
        }
        
    },
    
 

    login : async (req, res) => {
      try {
          console.log("Login request received");
  
          const { email, password } = req.body;
  
          // Validate input
          if (!email || !password) {
              return res.status(400).json({ message: "Email and password are required" });
          }
  
          // Find user by email
          const verifyUser = await user.findOne({ email });
  
          if (!verifyUser) {
              return res.status(400).json({ message: "User not found" });
          }
  
          // Ensure user has a password stored
          if (!verifyUser.password) {
              return res.status(500).json({ message: "User record is missing a password" });
          }
  
          // Compare passwords
          const uniquePassword = await bcrypt.compare(password, verifyUser.password);
  
          if (!uniquePassword) {
              return res.status(400).json({ message: "Wrong password" });
          }
  
          // Generate JWT token
          const token = jwt.sign({ id: verifyUser._id }, process.env.JWT_SECRET, {
              expiresIn: "1h",
          });
  
          // Set HTTP-only cookie
          res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "none",
          });
  
          return res.status(200).json({ message: "Login successful", token });
  
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  },
  
    logout : async (req,res)=>{
        try {
         console.log("logout");
       
         res.clearCookie('token', {
          httpOnly: true
          // secure: true, // Same as the one used when setting the cookie
          // sameSite: 'none', // Same as the one used when setting the cookie
        });
        res.status(200).json({ message: 'Logout Successful' });

        
        
        } catch (err) {
           res.status(400).json({message:err.message})
        }

    },
    me : async(req,res)=>{
       try {
         console.log("me is login");
         const userid  =  req.userid;

         const User = await user.findOne(userid)
         
        //  const user =await user.findbyID(userid).select("-password -__v -createdAT -updateAt -.id")
         console.log(  "user is " + User);
         
         return res.status(200).json(User)

       }
        catch (err) {
          res.status(400).json({message : err.meaasge})
       }
    },
    forgetpassword :async (req,res)=>{
      try {
        console.log("forget");
    console.log(req.body);
    
      const {email} =req.body
      const  checkemail = await user.findOne({email:email})
      console.log("User found:", checkemail);

      if(!checkemail){
        return res.status(400).json({mesage:"user not found"})
      }

      const token =Math.random().toString(26).slice(-8)
      
      console.log(token );
      
      checkemail.resetPasswordToken = token
 checkemail.resetPasswordExpires = Date.now() + 120000000
 console.log(checkemail.resetPasswordToken);
 
 
  
      await checkemail.save();


      const transpoter  =nodemailer.createTransport({
        service : "gmail",
        auth :{
          user :process.env.EMAIL,
          pass :process.env.EMAIL_PASSWORD
        }

      })

      const composeemail = {
       from :process.env.EMAIL,
       to : checkemail.email,
       subject :"password reset ",
       text :`${token}`,

      }   
        
      await transpoter.sendMail(composeemail)
     return  res.status(200).json({ message: "Password reset email sent successfully!" });
      } catch (err) {

         res.status(400).json({message : err.meaasge})
      }
    },
    setNewPassword: async (req, res) => {
      try {
        console.log('setNewPassword');
        
        const { token, newPassword } = req.body;
    
        if (!token || !newPassword) {
          return res.status(400).json({ message: "Token and new password are required." });
        }
    
        const users = await user.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
        });
    
        if (!users) {
          return res.status(400).json({ message: "Invalid or expired token." });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        users.password = hashedPassword; // Hash password before saving (use bcrypt)
        users.resetPasswordToken = undefined;
        users.resetPasswordExpires = undefined;
        await users.save();
    
        res.status(200).json({ message: "Password updated successfully!" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    
}


module.exports = login;