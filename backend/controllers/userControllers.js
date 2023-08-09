const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, darkMode } = req.body;

  // Check fields
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields.");
  }

  // Check if the user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // check if user is created successfully
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials.");
  }
});


const getUserData = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  generateToken,
};
