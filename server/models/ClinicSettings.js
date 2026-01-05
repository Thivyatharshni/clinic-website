const mongoose = require("mongoose");

const clinicSettingsSchema = new mongoose.Schema({
  clinicName: {
    type: String,
    default: "Health+ Clinic",
    required: true,
  },
  address: {
    type: String,
    default: "123 Main St, City, State",
    required: true,
  },
  phone: {
    type: String,
    default: "+1 234 567 8900",
    required: true,
  },
  email: {
    type: String,
    default: "info@healthplus.com",
    required: true,
  },
  whatsappNumber: {
    type: String,
    default: "+91 9061236888",
  },
  emergencyPhone: {
    type: String,
    default: "+91 9544449908",
  },
  ceoEmail: {
    type: String,
    default: "ceo@sakriyhealthcare.com",
  },
  cmoEmail: {
    type: String,
    default: "cmo@sakriyhealthcare.com",
  },
  hrEmail: {
    type: String,
    default: "hr@sakriyhealthcare.com",
  },
  generalEmail: {
    type: String,
    default: "ourfamilyclinic@hotmail.com",
  },
  officeHours: {
    mondaySaturday: {
      type: String,
      default: "8:00 AM - 8:00 PM",
    },
    sunday: {
      type: String,
      default: "9:00 AM - 2:00 PM",
    },
    emergency: {
      type: String,
      default: "24/7 Available",
    },
  },
  socialLinks: {
    facebook: {
      type: String,
      default: "#",
    },
    instagram: {
      type: String,
      default: "#",
    },
    twitter: {
      type: String,
      default: "#",
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure only one document exists
clinicSettingsSchema.pre("save", async function (next) {
  const count = await mongoose.models.ClinicSettings.countDocuments();
  if (count > 0 && !this.isNew) {
    // Update existing document
    await mongoose.models.ClinicSettings.updateOne({}, this.toObject());
    next(new Error("Only one clinic settings document allowed"));
  } else {
    next();
  }
});

module.exports = mongoose.model("ClinicSettings", clinicSettingsSchema);
