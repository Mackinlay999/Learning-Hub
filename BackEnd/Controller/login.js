const mongoose = require("mongoose");
const user = require("../Model/UserloginScheme");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");
require("dotenv").config();
const nodemailer = require("nodemailer");
const Resume = require("../Model/ProfileResumeScheme");
const DripCompains = require("../Model/dripCampaign");
// const dripQueue = require("../Utils/dripQueue")

const path = require("path");

// const { scheduleEmail } = require('../Utils/SendEmail.js');
const EmailTemplate = require("../Model/EmailTemplate");
const EmailSchedule = require("../Model/EmailSchedule");

const login = {
  register: async (req, res) => {
    try {
      // console.log("register ");
      console.log(req.body);

      const { username, email, password, number, role } = req.body;

      const verifyemail = await user.findOne({ email });
      // console.log(verifyemail);

      if (verifyemail) {
        return res.status(400).json({ message: "user already there" });
      }

      if (!/^\d{10}$/.test(number)) {
        return res.status(400).json({ message: "Invalid phone number" });
      }

      const hashpassword = await bcrypt.hash(password, 10);
      const newuser = new user({
        username,
        email,
        number,
        password: hashpassword,
        role: "user",
      });
      //  schedule email

      await newuser.save();
      // console.log("New user saved:", newuser);

      const templates = await EmailTemplate.find();
      // console.log("Templates found:", templates.length);
      const now = new Date();

      const schedules = templates.map((t) => ({
        userId: newuser._id,
        email: newuser.email,
        subject: t.subject,
        content: t.content,
        sendAt: new Date(now.getTime() + t.delayInMinutes * 60 * 1000),
      }));

      // console.log("Schedules prepared:", schedules.length);

      await EmailSchedule.insertMany(schedules);

      return res
        .status(201)
        .json({ message: "User registered and emails scheduled" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  admin: async (req, res) => {
    try {
      const alldata = await user.find();

      res.status(200).json(alldata);
    } catch (error) {
      res.status(400).json({ meaasge: error.message });
    }
  },

  login: async (req, res) => {
    try {
      // console.log("🚀 User login request received");

      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const verifyUser = await user.findOne({ email });

      if (!verifyUser) {
        return res.status(401).json({ message: "User not found" });
      }

      if (!verifyUser.password) {
        return res
          .status(500)
          .json({ message: "User record is missing a password" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        verifyUser.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const token = jwt.sign(
        { id: verifyUser._id, role: verifyUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // ✅ set to true in production with HTTPS
        sameSite: "lax",
      });

      const responsePayload = {
        message: "Login successful",
        token,
        role: verifyUser.role,
      };

      // console.log("✅ User login success:", responsePayload);

      return res.status(200).json(responsePayload);
    } catch (err) {
      console.error("❌ Login error:", err);
      res.status(500).json({ message: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      // console.log("logout");

      res.clearCookie("token", {
        httpOnly: true,
        // secure: true, // Same as the one used when setting the cookie
        // sameSite: 'none', // Same as the one used when setting the cookie
      });
      res.status(200).json({ message: "Logout Successful" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  me: async (req, res) => {
    try {
      // console.log("me is login");
      const userid = req.userid;

      const User = await user.findOne({ _id: userid });

      //  const user =await user.findbyID(userid).select("-password -__v -createdAT -updateAt -.id")
      // console.log("user is " + User);

      return res.status(200).json(User);
    } catch (err) {
      res.status(400).json({ message: err.meaasge });
    }
  },
  forgetpassword: async (req, res) => {
    try {
      // console.log("forget");
      // console.log(req.body);

      const { email } = req.body;
      const checkemail = await user.findOne({ email: email });
      // console.log("User found:", checkemail);

      if (!checkemail) {
        return res.status(400).json({ mesage: "user not found" });
      }

      const token = Math.random().toString(26).slice(-8);

      // console.log(token);

      checkemail.resetPasswordToken = token;
      checkemail.resetPasswordExpires = Date.now() + 120000000;
      // console.log(checkemail.resetPasswordToken);

      await checkemail.save();

      const transpoter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const composeemail = {
        from: process.env.EMAIL,
        to: checkemail.email,
        subject: "password reset ",
        text: `${token}`,
      };

      await transpoter.sendMail(composeemail);
      return res.status(200).json({ message: "token sent in your emails" });
    } catch (err) {
      res.status(400).json({ message: err.meaasge });
    }
  },
  setNewPassword: async (req, res) => {
    try {
      // console.log("setNewPassword");

      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res
          .status(400)
          .json({ message: "Token and new password are required." });
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
  },
  profileResume: async (req, res) => {
    // console.log("plese  fill the form");

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    try {
      // Save file details to MongoDB
      const newResume = new Resume({
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });

      await newResume.save();

      // Send Email with Attachment
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: "harikrishg44@gmail.com",
        subject: "File Uploaded Successfully",
        text: `A new file has been uploaded:\n\nProgram: Filename: ${req.file.filename}`,
        attachments: [
          {
            filename: req.file.filename,
            path: req.file.path,
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Email error:", error);
          return res
            .status(500)
            .json({ message: "File saved, but email failed" });
        }
        res.status(201).json({
          message: "File uploaded, saved, and emailed successfully!",
          file: newResume,
        });
      });
    } catch (error) {
      console.error("Error saving file:", error);
      res
        .status(500)
        .json({ message: "Error saving file", error: error.message });
    }
  },

  getAlluser: async (req, res) => {
    try {
      const alldata = await user.find({}, "username email role");

      res.status(200).json(alldata);
    } catch (error) {
      res.status(400).json({ meaasge: error.message });
    }
  },
};

module.exports = login;
