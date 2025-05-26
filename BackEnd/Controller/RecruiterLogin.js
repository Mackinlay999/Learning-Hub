const Recruiter = require("../Model/Recruiter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const RecruiterController = {
  RecruiterRegister: async (req, res) => {
    try {
      console.log("Recruiter login");

      const { username, email, password, role  } = req.body;

      const verify = await Recruiter.findOne({ email });

      if (verify) {
        return res.status(400).json({ message: "user already there!" });
      }
      const hashpassword = await bcrypt.hash(password, 10);

      const NewRegister = new Recruiter({
        username,
        email,
        password: hashpassword,
        role: "Recruiter",
      });

      await NewRegister.save();
      res.status(201).json({ message: "Recruiter created successfully" });
    } catch (err) {
      res.status(401).json({ err: err.message });
    }
  },
  RecruiterLogin: async (req, res) => {
    console.log("🚀 RecruiterLogin controller hit");

  try {

    console.log("Recruiter login request received");

    const { email, password } = req.body;
    console.log("Request body:", req.body);
    // Validate input early
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const verifyEmail = await Recruiter.findOne({ email });

    if (!verifyEmail) {
      return res.status(401).json({ message: "Recruiter not found" });
    }

    // Optionally check status if you have one like Admin
    // if (verifyEmail.status !== "approved") {
    //   return res.status(403).json({ message: "Your account is not approved yet." });
    // }

    // Check password
    const verifypassword = await bcrypt.compare(password, verifyEmail.password);
    if (!verifypassword) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Generate JWT token including role
    const token = jwt.sign(
      { id: verifyEmail._id, role: verifyEmail.role }, // include role here
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Generated token:", token);
    console.log("Role to send:", verifyEmail.role);
    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax", // recommended for dev
    });

   const responsePayload = {
      message: "Login successful",
      token,
      role: verifyEmail.role,
      recruiterId: verifyEmail._id.toString(), 
    };
    console.log("Sending response:", responsePayload);

    res.status(200).json(responsePayload);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},
  RecruiterforgotPassword: async (req, res) => {
    try {
      console.log("forget password in recruiter");
      const { email } = req.body;

      const verifyEmail = await Recruiter.findOne({ email });

      if (!verifyEmail) {
        return res.status(401).json({ message: "pleace enter valid email" });
      }

      const token = Math.random().toString(26).slice(-8);

      //        resetpassword : String ,
      // resetpasswordExpried : Date
      verifyEmail.resetpassword = token;
      verifyEmail.resetpasswordExpried = Date.now() + 120000000;
      console.log(token);

      await verifyEmail.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const composeemail = {
        from: process.env.EMAIL,
        to: verifyEmail.email,
        subjecr: "Password Reset",
        text: `${token}`,
      };

      await transporter.sendMail(composeemail);
      res.status(200).json({ message: "Token created successfully" });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },

  ResetPassword: async (req, res) => {
    try {
      console.log("reset password");
      const { token, Newpassword } = req.body;

      const vaild = await Recruiter.findOne({
        resetpassword: token,
        resetpasswordExpried: { $gt: Date.now() },
      });

      if (!vaild) {
        return res.status(401).json({ message: "token faild or expried" });
      }

      const hashedPassword = await bcrypt.hash(Newpassword, 10);

      vaild.password = hashedPassword;
      vaild.resetpassword = undefined;
      vaild.resetpasswordExpried = undefined;

      await vaild.save();

      res.status(200).json({ message: "password update sucessfully" });
    } catch (err) {
      res.status(401).json({ err: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      console.log("logout");
      res.clearCookie("token", { httpOnly: true });
      res.status(200).json({ message: "logout successfully " });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  },
};
module.exports = RecruiterController;
