require("dotenv").config();
const Adminlogin = require("../Model/AdminlogScheme");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = require("../app");

const transporter = require("../Utils/Approvel"); // nodemailer instance
const nodemailer = require("nodemailer");

const path = require("path");


const Admincontroller = {
  register: async (req, res) => {
    try {
      console.log("register login");
      console.log(req.body);

      const { username, email, password, role } = req.body;

      const verifyemail = await Adminlogin.findOne({ email: email });
      console.log(verifyemail);

      if (verifyemail) {
        return res.status(400).json({ message: "user already there" });
      }

      const hashpassword = await bcrypt.hash(password, 10);
      const newuser = new Adminlogin({
        username,
        email,
        password: hashpassword,
        role,
        status: "pending",
      });

      await newuser.save();



      const approveURL = `https://learning-hub-p2yq.onrender.com/api/approveEmail/${newuser._id}`;
      const rejectURL = `https://learning-hub-p2yq.onrender.com/api/rejectEmail/${newuser._id}`;

      const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.SUPER_ADMIN_EMAIL,
        subject: "New User Registration Pending Approval",
        html: `
          <h3>New Registration Request</h3>
          <p><strong>Username:</strong> ${username}</p>
          <p><strong>Email:</strong> ${email}</p>
        
        

        <a href="${approveURL}" style="padding: 8px 12px; background-color: green; color: white;">✅ Approve</a>
<a href="${rejectURL}" style="padding: 8px 12px; background-color: red; color: white;">❌ Reject</a>
         
        `,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({
        message: "Registration request submitted. Awaiting approval.",
      });
      // res.status(200).json({message : "responsive successfully"})
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getallrole: async (req, res) => {
    try {
      const alldata = await Adminlogin.find({}, "username email role");

      res.status(200).json(alldata);
    } catch (error) {
      res.status(400).json({ meaasge: error.message });
    }
  },

  login: async (req, res) => {
    try {
      console.log("Login request received");

      const { email, password } = req.body;

      const user = await Adminlogin.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      if (user.status !== "approved") {
        return res
          .status(403)
          .json({ message: "Your account is not approved yet." });
      }

      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Find user by email
      const verifyUser = await Adminlogin.findOne({ email });

      if (!verifyUser) {
        return res.status(400).json({ message: "User not found" });
      }

      // Ensure user has a password stored
      if (!verifyUser.password) {
        return res
          .status(500)
          .json({ message: "User record is missing a password" });
      }

      // Compare passwords
      const uniquePassword = await bcrypt.compare(
        password,
        verifyUser.password
      );

      if (!uniquePassword) {
        return res.status(400).json({ message: "Wrong password" });
      }

      // Generate JWT token with user id and role
      const token = jwt.sign(
        { id: verifyUser._id, role: verifyUser.role }, // Include the role here
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Set the token in an HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true for production
        sameSite: "lax", // Recommended for local development
      });

      return res.status(200).json({
        message: "Login successful",
        token,
        role: verifyUser.role, // ← explicitly include role here
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      console.log("logout");

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
      console.log("me is login");
      const userid = req.userid; // Extract the user id from the JWT payload

      // Find the user by their ID and exclude sensitive fields like password
      const user = await Adminlogin.findOne({ _id: userid }).select(
        "-password -__v -createdAt -updatedAt"
      );

      // If no user is found, send a 404 error
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log("User found:", user);

      // Return the user data, including their role
      return res.status(200).json({
        userId: user._id,
        role: user.role, // Assuming 'role' is stored in your user schema
        name: user.username, // Adjust based on your schema
        email: user.email, // Adjust based on your schema
      });
    } catch (err) {
      console.error("Error fetching user:", err);
      return res.status(400).json({
        message:
          err.message || "An error occurred while fetching the user data",
      });
    }
  },

  forgetpassword: async (req, res) => {
    try {
      console.log("forget");
      console.log(req.body);

      const { email } = req.body;
      const checkemail = await Adminlogin.findOne({ email: email });
      console.log("User found:", checkemail);

      if (!checkemail) {
        return res.status(400).json({ mesage: "user not found" });
      }

      const token = Math.random().toString(26).slice(-8);

      console.log(token);

      checkemail.resetPasswordToken = token;
      checkemail.resetPasswordExpires = Date.now() + 120000000;
      console.log(checkemail.resetPasswordToken);

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
      return res
        .status(200)
        .json({ message: "token send in your email" });
    } catch (err) {
      res.status(400).json({ message: err.meaasge });
    }
  },
  setNewPassword: async (req, res) => {
    try {
      console.log("setNewPassword");

      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res
          .status(400)
          .json({ message: "Token and new password are required." });
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

      const AdminloginId = req.userid; // Logged-in user's ID from token
      const { id, username, email, role } = req.body;

      const loggedInUser = await Adminlogin.findById(AdminloginId);
      if (!loggedInUser) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Admin not found" });
      }

      // Ensure only "Super Admin" can update roles
      if (loggedInUser.role !== "Super Admin") {
        return res.status(403).json({
          message: "Access denied: Only Super Admin can update roles",
        });
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

      res.status(200).json({
        message: "User updated successfully",
        updatedUser: userToUpdate,
      });
    } catch (error) {
      console.error("Error updating role:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      console.log("Delete user request");

      const adminId = req.userid; // from auth middleware
      const {id } = req.params;

      console.log("Logged in Admin ID:", adminId);
      console.log("User to delete ID:", id);

      const loggedInAdmin = await Adminlogin.findById(adminId);
      if (!loggedInAdmin) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Admin not found" });
      }

      // Ensure only "Super Admin" can delete users
      if (loggedInAdmin.role !== "Super Admin") {
        return res.status(403).json({
          message: "Access denied: Only Super Admin can delete users",
        });
      }

      const userToDelete = await Adminlogin.findById(id);
      if (!userToDelete) {
        return res.status(404).json({ message: "User not found" });
      }

      await Adminlogin.findByIdAndDelete(id);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },

  approveUser: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Approving user with ID:", id);

      const user = await Adminlogin.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.status === "approved") {
        return res.status(400).json({ message: "User already approved" });
      }

      user.status = "approved";
      await user.save();

      res.send("✅ User approved successfully!");
    } catch (err) {
      console.error("❌ Error:", err);
      res.status(500).send("Error approving user");
    }
  },

  rejectUser: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Approving user with ID:", id);
      const user = await Adminlogin.findById(id);

      if (!user) return res.status(404).json({ message: "User not found" });
      if (user.status === "rejected") {
        return res.status(400).json({ message: "User already rejected" });
      }

      user.status = "rejected";
      await user.save();

      res.send("❌ User rejected successfully.");
    } catch (err) {
      res.status(500).send("Error rejecting user");
    }
  },
  approve: async (req, res) => {
    try {
      const id = req.params.id;
      await Adminlogin.findByIdAndUpdate(id, { status: "approved" });
      res.send("<h2>User approved successfully ✅</h2>");
    } catch (err) {
      res.status(500).send("Error approving user: " + err.message);
    }
  },

  reject: async (req, res) => {
    try {
      const id = req.params.id;
      await Adminlogin.findByIdAndUpdate(id, { status: "rejected" });
      res.send("<h2>User rejected ❌</h2>");
    } catch (err) {
      res.status(500).send("Error rejecting user: " + err.message);
    }
  },
};

module.exports = Admincontroller;
