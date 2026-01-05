const ClinicSettings = require("../models/ClinicSettings");

// Get clinic settings
exports.getClinicSettings = async (req, res) => {
  try {
    let settings = await ClinicSettings.findOne();

    // If no settings exist, create default settings
    if (!settings) {
      settings = new ClinicSettings();
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    console.error("Error fetching clinic settings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update clinic settings
exports.updateClinicSettings = async (req, res) => {
  try {
    const {
      clinicName,
      address,
      phone,
      email,
      whatsappNumber,
      emergencyPhone,
      ceoEmail,
      cmoEmail,
      hrEmail,
      generalEmail,
      officeHours,
      socialLinks,
    } = req.body;

    let settings = await ClinicSettings.findOne();

    if (!settings) {
      // Create new settings if none exist
      settings = new ClinicSettings({
        clinicName,
        address,
        phone,
        email,
        whatsappNumber,
        emergencyPhone,
        ceoEmail,
        cmoEmail,
        hrEmail,
        generalEmail,
        officeHours,
        socialLinks,
      });
    } else {
      // Update existing settings
      if (clinicName !== undefined) settings.clinicName = clinicName;
      if (address !== undefined) settings.address = address;
      if (phone !== undefined) settings.phone = phone;
      if (email !== undefined) settings.email = email;
      if (whatsappNumber !== undefined) settings.whatsappNumber = whatsappNumber;
      if (emergencyPhone !== undefined) settings.emergencyPhone = emergencyPhone;
      if (ceoEmail !== undefined) settings.ceoEmail = ceoEmail;
      if (cmoEmail !== undefined) settings.cmoEmail = cmoEmail;
      if (hrEmail !== undefined) settings.hrEmail = hrEmail;
      if (generalEmail !== undefined) settings.generalEmail = generalEmail;
      if (officeHours !== undefined) settings.officeHours = officeHours;
      if (socialLinks !== undefined) settings.socialLinks = socialLinks;
    }

    settings.updatedAt = new Date();
    await settings.save();

    res.json({ message: "Clinic settings updated successfully", settings });
  } catch (error) {
    console.error("Error updating clinic settings:", error);
    res.status(500).json({ message: "Server error" });
  }
};
