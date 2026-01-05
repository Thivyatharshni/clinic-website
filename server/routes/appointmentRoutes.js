const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");

/* ================= GET BOOKED SLOTS FOR A DATE ================= */
router.get("/slots/:date", async (req, res) => {
  try {
    const appointments = await Appointment.find({ date: req.params.date });
    const bookedTimes = appointments.map((a) => a.time);
    res.status(200).json(bookedTimes);
  } catch (error) {
    console.error("Slots Error:", error);
    res.status(500).json([]);
  }
});

/* ================= CREATE NEW APPOINTMENT (USER AFTER PAYMENT) ================= */
router.post("/", userAuth, async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      service,
      date,
      time,
      message,
      paymentStatus,
      paymentId,
      paymentMode,
    } = req.body;

    // 🔐 PAYMENT CHECK
    if (paymentStatus !== "paid") {
      return res.status(400).json({
        message: "Payment not completed",
      });
    }

    const exists = await Appointment.findOne({ date, time });
    if (exists) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const appointment = new Appointment({
      name,
      phone,
      email,
      service,
      date,
      time,
      message,
      user: req.userId,
      paymentStatus,
      paymentId,
      paymentMode: paymentMode || "online",
      isNew: true,
      status: "pending",
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error("Create Appointment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= USER: MY APPOINTMENTS ================= */
router.get("/my", userAuth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.userId })
      .sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json([]);
  }
});

/* ================= ADMIN: ALL APPOINTMENTS ================= */
router.get("/all", adminAuth, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("user", "email")
      .sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json([]);
  }
});

/* ================= ADMIN: MARK APPOINTMENTS AS SEEN ================= */
router.put("/mark-seen", adminAuth, async (req, res) => {
  try {
    await Appointment.updateMany(
      { isNew: true },
      { $set: { isNew: false } }
    );
    res.json({ message: "Notifications cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear notifications" });
  }
});

module.exports = router;
