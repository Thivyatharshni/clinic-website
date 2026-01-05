const Appointment = require("../models/Appointment");

/* ================= USER: CREATE APPOINTMENT (AFTER PAYMENT) ================= */
exports.createAppointment = async (req, res) => {
  try {
    const {
      service,
      date,
      time,
      message,
      paymentStatus,
      paymentId,
      paymentMode, // optional (online / cash)
    } = req.body;

    // 🔐 PAYMENT CHECK
    if (paymentStatus !== "paid") {
      return res.status(400).json({
        message: "Payment not completed. Appointment not booked.",
      });
    }

    // 🔁 SLOT AVAILABILITY CHECK
    const alreadyBooked = await Appointment.findOne({ date, time });
    if (alreadyBooked) {
      return res.status(400).json({
        message: "Selected time slot is already booked",
      });
    }

    const appointment = new Appointment({
      user: req.userId,              // existing auth logic
      service,
      date,
      time,
      message,
      paymentStatus,
      paymentId,
      paymentMode: paymentMode || "online",
      isNew: true,                   // 🔔 admin notification
      status: "pending",             // admin approval
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Appointment Booking Error:", error);
    res.status(500).json({ message: "Failed to book appointment" });
  }
};

/* ================= USER: MY APPOINTMENTS ================= */
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

/* ================= ADMIN: ALL APPOINTMENTS ================= */
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("user", "email")
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

/* ================= ADMIN: MARK APPOINTMENTS AS SEEN ================= */
exports.markAppointmentsSeen = async (req, res) => {
  try {
    await Appointment.updateMany(
      { isNew: true },
      { $set: { isNew: false } }
    );

    res.json({ message: "New appointment notifications cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notifications" });
  }
};
