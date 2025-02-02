const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Get all users
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    // Remove sensitive data
    const safeUsers = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
    }));
    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a user
router.post("/", async (req, res) => {
  // Basic validation
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    // Check if username or email already exists
    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const newUser = await user.save();
    console.log("New user created:", {
      username: newUser.username,
      email: newUser.email,
      hashedPassword: newUser.password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    };

    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
