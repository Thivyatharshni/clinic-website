const express = require("express");
const router = express.Router();
const clinicSettingsController = require("../controllers/clinicSettingsController");
const adminAuth = require("../middleware/adminAuth");

// Get clinic settings (public route for frontend)
router.get("/public", clinicSettingsController.getClinicSettings);

// Get clinic settings (admin only)
router.get("/", adminAuth, clinicSettingsController.getClinicSettings);

// Update clinic settings (admin only)
router.put("/", adminAuth, clinicSettingsController.updateClinicSettings);

module.exports = router;
