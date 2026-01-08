const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* ================= USER REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // 🔴 BASIC VALIDATION
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields (name, email, phone, password) are required",
      });
    }

    // 🔴 VALIDATE EMAIL FORMAT
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    // 🔴 VALIDATE PASSWORD STRENGTH
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // 🔴 VALIDATE PHONE NUMBER (basic check for digits and length)
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({
        message: "Please enter a valid phone number (at least 10 digits)",
      });
    }

    // 🔴 VALIDATE NAME LENGTH
    if (name.trim().length < 2) {
      return res.status(400).json({
        message: "Name must be at least 2 characters long",
      });
    }

    // 🔴 CHECK EXISTING USER
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ CREATE USER
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      phone: phone.trim(),
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Registration successful",
      success: true
    });
  } catch (error) {
    console.error("Register Error:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: messages.join(', '),
        error: 'ValidationError',
        success: false
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already registered",
        error: 'DuplicateError',
        success: false
      });
    }

    // Handle other specific errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: "Invalid data format provided",
        error: 'CastError',
        success: false
      });
    }

    res.status(500).json({
      message: "Server error during registration",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      success: false
    });
  }
});

/* ================= USER LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 CHECK USER
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // 🔴 CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ GENERATE JWT TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ SEND USER DATA + TOKEN
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


