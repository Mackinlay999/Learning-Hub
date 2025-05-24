const jwt = require("jsonwebtoken");
require("dotenv").config();
const Auth = {
  authverify: (req, res, next) => {
    try {
      const token = req.cookies.token;

      console.log(token, "token");

      if (!token) {
        return res.status(401).json({ message: "unauthorized" });
      }

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.userid = decode.id;
      console.log(req.userid);

      next();
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  },
};
module.exports = Auth;
