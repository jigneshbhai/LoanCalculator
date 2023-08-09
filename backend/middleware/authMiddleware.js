const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    try {
      token = req.headers.authorization
      //token = req.headers.authorization.split(" ")[1];
      console.log("Received token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(401).json({ error: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
});

module.exports = { protect };
