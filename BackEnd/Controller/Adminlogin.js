
const Adminlogin = require("../Model/AdminlogScheme");
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken");
const app  = require("../app");
require("dotenv").config();
const nodemailer =require('nodemailer')
const Resume = require("../Model/ProfileResumeScheme")

const path = require("path");



const Admincontroller = {
    register : async (req,res)=>{
         try {
            console.log("register login");
            console.log(req.body);
            
           const { username , email,password,role} = req.body

           const verifyemail = await Adminlogin.findOne({email:email}) 
              console.log(verifyemail);
              
           if(verifyemail){
            return res.status(400).json({message:"user already there"})
           }


          

      const hashpassword = await  bcrypt.hash(password , 10)
           const newuser = new Adminlogin ({
            username ,  email,  password : hashpassword ,role
           })

           await newuser.save()

           res.status(200).json({mesage:"user created successfully"})
            
            
         } catch (err) {
            res.status(400).json({message:err.message})
         }
    },
    getallrole : async(req,res)=>{
        try {
           
            
             const alldata =await Adminlogin.find({}, 'username email role')
            
             
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
          const verifyUser = await Adminlogin.findOne({ email });
  
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
          // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,
            const token = jwt.sign({ id: verifyUser._id }, process.env.JWT_SECRET, 
              {
              expiresIn: "1h",
          });
  
          // Set HTTP-only cookie
          // res.cookie("token", token, {
          //     httpOnly: true,
          //     secure: process.env.NODE_ENV === "production",
          //     sameSite: "none",
          // });
          res.cookie("token", token, {
            httpOnly: true,
            secure: false, // ✅ Set to false for local development
            sameSite: "lax", // ✅ 'lax' is recommended for local development
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

         const User = await Adminlogin.findOne({ _id: userid });

         
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
      const  checkemail = await Adminlogin.findOne({email:email})
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
    
        const users = await Adminlogin.findOne({
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
    },
    updateRole: async (req, res) => {
      try {
        console.log("Update role request");
    
        const AdminloginId = req.userid;
        const { id, username, email, role,  } = req.body;
    
        const loggedInUser = await Adminlogin.findById(AdminloginId);
        if (!loggedInUser) {
          return res.status(401).json({ message: "Unauthorized: Admin not found" });
        }
    
        if (loggedInUser.role !== "Super Admin") {
          return res.status(403).json({ message: "Access denied: Only Super Admin can update roles" });
        }
    
        const userToUpdate = await Adminlogin.findById(id);
        if (!userToUpdate) {
          return res.status(404).json({ message: "User to update not found" });
        }
    
        // Update fields
        userToUpdate.username = username;
        userToUpdate.email = email;
        userToUpdate.role = role;
        
    
        await userToUpdate.save();
    
        res.status(200).json({ message: "User updated successfully", updatedUser: userToUpdate });
    
      } catch (error) {
        console.error("Error updating role:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    },
  
    
    deleteUser: async (req, res) => {
      try {
        console.log("Delete user request");
    
        const adminId = req.userid; // from auth middleware
        const { userIdToDelete } = req.body;

        console.log("Logged in Admin ID:", adminId);
    console.log("User to delete ID:", userIdToDelete);
    
        const loggedInAdmin = await Adminlogin.findById(adminId);
        if (!loggedInAdmin) {
          return res.status(401).json({ message: "Unauthorized: Admin not found" });
        }
    
        if (loggedInAdmin.role !== "Super Admin") {
          return res.status(403).json({ message: "Access denied: Only Super Admin can delete users" });
        }
    
        const userToDelete = await Adminlogin.findById(userIdToDelete);
        if (!userToDelete) {
          return res.status(404).json({ message: "User not found" });
        }
    
        await Adminlogin.findByIdAndDelete(userIdToDelete);
        return res.status(200).json({ message: "User deleted successfully" });
    
      } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    }
    
}


module.exports =Admincontroller;