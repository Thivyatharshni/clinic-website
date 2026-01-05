const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Appointment = require("../models/Appointment");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

/* ================= ADMIN REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Admin Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADMIN LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid admin email" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { adminId: admin._id, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADMIN PROFILE (GET) ================= */
router.get("/profile", adminAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    console.error("Get Admin Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADMIN PROFILE (UPDATE) ================= */
router.put("/profile", adminAuth, async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update email if provided
    if (email) {
      admin.email = email;
    }

    // Update password if provided
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    await admin.save();

    const updatedAdmin = await Admin.findById(req.adminId).select("-password");
    res.json({
      message: "Admin profile updated successfully",
      admin: updatedAdmin
    });
  } catch (error) {
    console.error("Update Admin Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET ALL APPOINTMENTS ================= */
router.get("/appointments", adminAuth, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("user", "email")
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Fetch Appointments Error:", error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
});

/* ================= UPDATE APPOINTMENT STATUS ================= */
router.put("/appointments/:id/status", adminAuth, async (req, res) => {
  try {
    const { status, isNew } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, isNew: isNew !== undefined ? isNew : false },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({
      message: `Appointment ${status}`,
      appointment,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= DELETE APPOINTMENT ================= */
router.delete("/appointments/:id", adminAuth, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Delete Appointment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
