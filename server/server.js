const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");


dotenv.config();
connectDB();

const app = express();

/* 🔥 IMPORTANT MIDDLEWARE */
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "https://webapplicationclinic.netlify.app",
        "http://localhost:3000", // For development
        "https://clinic-website.netlify.app", // Alternative domain
      ];

      // Allow all Netlify subdomains
      if (origin.endsWith('.netlify.app')) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' })); // Increase limit for mobile uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Handle form data

/* HEALTH CHECK ENDPOINT */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0"
  });
});

/* WARM UP ENDPOINT (for Render cold starts) */
app.get("/warm", async (req, res) => {
  try {
    // Quick database check
    await require("./config/db").connection.readyState === 1;
    res.status(200).json({
      status: "warmed",
      timestamp: new Date().toISOString(),
      message: "Server is ready"
    });
  } catch (error) {
    res.status(500).json({
      status: "warming",
      error: error.message
    });
  }
});

/* ROUTES */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes")); // ✅ REQUIRED
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/clinic-settings", require("./routes/clinicSettingsRoutes"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
