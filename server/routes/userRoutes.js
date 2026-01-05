const express = require("express");
const router = express.Router();

const userAuth = require("../middleware/userAuth");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");

/* ================= GET LOGGED-IN USER PROFILE ================= */
router.get("/me", userAuth, getUserProfile);

/* ================= UPDATE USER PROFILE ================= */
router.put("/me", userAuth, updateUserProfile);

module.exports = router;
