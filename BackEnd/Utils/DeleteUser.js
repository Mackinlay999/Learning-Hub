const jwt = require("jsonwebtoken");
require("dotenv").config();

const DeleteUser = {
  User:  (req, res, next) => {
    const authHeader = req.headers.authorization;
    const tokenFromCookie = req.cookies.token;
  
    console.log("Authorization Header:", authHeader);  // Log Authorization header
    console.log("Token from Cookies:", tokenFromCookie);  // Log token from cookies (if any)
  
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : tokenFromCookie;
  
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userid = decoded.id; // Attach user id to request for later use
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  }
}

module.exports = DeleteUser;
