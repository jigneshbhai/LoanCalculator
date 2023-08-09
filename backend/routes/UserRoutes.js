const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserData,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserData);


module.exports = router;
