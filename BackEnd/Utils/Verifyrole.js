const jwt = require("jsonwebtoken");
require("dotenv").config();

const Verifyrole = {
  verifyToken: (req, res, next) => {
    try {
      // Get token from cookies or headers
      const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userid = decoded.id; // Attach user id to request for later use
      req.role = decoded.role; // Attach role to request for later use

      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  },

  // Middleware to check if the user has the required role
  checkRole: (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.role)) {
        return res.status(403).json({ message: "Access Denied: Insufficient role" });
      }
      next();
    };
  }
};

module.exports = Verifyrole;