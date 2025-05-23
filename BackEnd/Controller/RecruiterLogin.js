const Recruiter = require("../Model/Recruiter")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")



const RecruiterController ={
    RecruiterRegister : async (req, res)=>{

        try{

             console.log("Recruiter login");

        const{username,email,password} = req.body
        
        const verify =await Recruiter.findOne({email})

        if(verify){
            return res.status(400).json({message : "user already there!"})
        }
        const hashpassword =await bcrypt.hash(password, 10)
        
        const NewRegister =  new Recruiter({
            username,
            email,
            password:hashpassword

        })

        await NewRegister.save();
         res.status(201).json({message :"Recruiter created successfully"})

        }
        catch(err){
             res.status(401).json({err : err.message})


        }
       },
       RecruiterLogin : async (req,res)=>{

         try{
            console.log("Recruiter login");

        const {email , password} = req.body;
                 
   
         const verifyEmail =await  Recruiter.findOne({email})
         console.log(verifyEmail)

         
          if(!verifyEmail){
               return  res.status(401).json({message : "Recruiter not fount"})
          }

          const verifypassword =await bcrypt.compare(password ,verifyEmail.password )

          if(!verifypassword){
            return  res.status(401).json({message : "wrong password"})
          }

          const token = jwt.sign({id : verifyEmail._id} , process.env.JWT_SECRET , 
            {
                expiresIn :"1h"
            }
          )

          res.cookie("token" , token,{
            httpOnly : true,
            secure : false,
            sameSite: "lax",
       
            sameSite: "lax", // ✅ 'lax' is recommended for local development
          }
            )
            res.status(200).json({message : "login sucessfully"})
         }
         catch(err){
            res.status(401).json({err : err.message})
         }

          },

        RecruiterforgotPassword : async(req,res)=>{

         try{
           console.log("forget password in recruiter");
          const {email} = req.body

          const verifyEmail = await Recruiter.findOne({email})

          if(!verifyEmail){
            return res.status(401).json({message :"pleace enter valid email"})
          }

         
          const token = Math.random().toString(26).slice(-8);



    //        resetpassword : String ,
    // resetpasswordExpried : Date
          verifyEmail.resetpassword =token;
          verifyEmail.resetpasswordExpried  = Date.now() +120000000;
          console.log(token);

          await  verifyEmail.save();

          const transporter =nodemailer.createTransport({
            service :"gmail",
            auth:{
             user :process.env.EMAIL,
            pass :process.env.EMAIL_PASSWORD
            }
          })

          const composeemail = {
            from :process.env.EMAIL,
            to:verifyEmail.email,
            subjecr :"Password Reset",
            text :`${token}`    
                }

          await transporter.sendMail(composeemail)
          res.status(200).json({message:"Token created successfully"})
         }

        catch(err){
          res.status(401).json({message: err.message})
        }
          },

          ResetPassword :async (req ,res)=>{
            try{
             console.log("reset password")
             const {token , Newpassword} = req.body

             const vaild =await  Recruiter.findOne({
                    resetpassword :token ,
    resetpasswordExpried : { $gt :Date.now()}
     
             })

             if(!vaild){
              return res.status(401).json({message : "token faild or expried"})
             }

             const hashedPassword = await bcrypt.hash(Newpassword , 10)

            
             vaild.password = hashedPassword;
             vaild.resetpassword = undefined;
             vaild.resetpasswordExpried = undefined;

             await vaild.save()

             res.status(200).json({message:"password update sucessfully"})


            }
            catch(err){
              res.status(401).json({err : err.message})

            }
          },
          logout : async(req,res)=>{
          try{
              console.log("logout")
            res.clearCookie("token" , 
             { httpOnly: true}
            )
            res.status(200).json({message:"logout successfully "})
          }
          catch(err){
            res.status(401).json({message : err.message})
          }
          }
        

       }
module.exports = RecruiterController;