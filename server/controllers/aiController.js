const getAIResponse = (req, res) => {
  try {
    const { message } = req.body;
    const userMessage = message.toLowerCase();

    console.log("AI Debug - User message:", userMessage);

    let response = "";

  // Clinic-related responses with expanded coverage
  if (userMessage.includes("appointment") || userMessage.includes("book")) {
    if (userMessage.includes("how") || userMessage.includes("process")) {
      response = "Booking an appointment is easy! Visit our 'Book Appointment' page, select your preferred department (Pediatrics, General Medicine, or Diagnostics), choose a date and time, and provide your details. We'll confirm your appointment via email or WhatsApp. 🩺";
    } else if (userMessage.includes("cancel") || userMessage.includes("change")) {
      response = "To cancel or reschedule an appointment, please contact us at least 24 hours in advance via phone (+91 63834 85665) or WhatsApp. We'll help you find an alternative time. 📅";
    } else {
      response = "I'd be happy to help you book an appointment! You can use the 'Book Appointment' section to schedule a consultation with our doctors. We have specialists in Pediatrics, General Medicine, and Diagnostics. 🩺";
    }
  } else if (userMessage.includes("service") || userMessage.includes("what do you offer") || userMessage.includes("treatment")) {
    if (userMessage.includes("pediatric") || userMessage.includes("child") || userMessage.includes("baby")) {
      response = "Our Pediatrics department specializes in child healthcare, including routine check-ups, vaccinations, growth monitoring, and treatment of childhood illnesses. Our pediatricians are experienced in handling infants, children, and adolescents. 👶";
    } else if (userMessage.includes("general") || userMessage.includes("family")) {
      response = "Our General Medicine department provides comprehensive primary healthcare for all ages, including preventive care, chronic disease management, health screenings, and treatment of common illnesses. 🩺";
    } else if (userMessage.includes("diagnostic") || userMessage.includes("lab")) {
      response = "Our Diagnostics department offers a wide range of laboratory tests with same-day results. We provide home sample collection, accurate testing, and detailed reports. Services include blood tests, urine analysis, X-rays, and more. 🧪";
    } else {
      response = "Our comprehensive services include: 🩺 Doctor Consultations (General Medicine & Pediatrics), 🧪 Lab & Diagnostics (same-day reports & home collection), 💊 Pharmacy (quality medicines & delivery), 🏠 Home Visits (doctor & nurse visits), and 🚨 24x7 Emergency Care.";
    }
  } else if (userMessage.includes("emergency") || userMessage.includes("urgent") || userMessage.includes("critical")) {
    response = "For medical emergencies, we provide 24x7 emergency care. Please call our emergency hotline at +91 63834 85665 immediately or visit the nearest clinic. Our emergency team is equipped to handle critical situations. 🚨";
  } else if (userMessage.includes("contact") || userMessage.includes("phone") || userMessage.includes("whatsapp") || userMessage.includes("reach")) {
    if (userMessage.includes("email")) {
      response = "You can reach us via: 📞 Phone: +91 63834 85665, 💬 WhatsApp: +91 63834 85665, 📧 Email: support@ourfamilyclinic.com. We're available to assist you! 🤝";
    } else {
      response = "Contact us anytime: 📞 Call +91 63834 85665, 💬 WhatsApp +91 63834 85665, 📧 Email support@ourfamilyclinic.com. Our team is ready to help with your healthcare needs! 🏥";
    }
  } else if (userMessage.includes("insurance") || userMessage.includes("payment") || userMessage.includes("cost") || userMessage.includes("fee")) {
    if (userMessage.includes("accept") || userMessage.includes("covered")) {
      response = "We accept major health insurance plans including private insurance, corporate health plans, and government schemes. During appointment booking, you can check coverage and payment options. 💳";
    } else if (userMessage.includes("how much") || userMessage.includes("price")) {
      response = "Consultation fees vary by department: General Medicine ₹500-800, Pediatrics ₹600-900, Diagnostics based on tests. We offer flexible payment options and insurance coverage. 💰";
    } else {
      response = "We accept various health insurance plans and offer flexible payment options including cash, card, UPI, and insurance claims. Transparent pricing with no hidden charges. 💳";
    }
  } else if (userMessage.includes("lab") || userMessage.includes("test") || userMessage.includes("diagnostic") || userMessage.includes("blood")) {
    if (userMessage.includes("home") || userMessage.includes("collection")) {
      response = "We offer convenient home sample collection for most diagnostic tests. Our trained phlebotomists visit your home at your preferred time. Results are available same-day for most tests. 🏠";
    } else if (userMessage.includes("report") || userMessage.includes("result")) {
      response = "Most lab reports are available same-day. You can collect reports from the clinic or receive them digitally via email/WhatsApp. Our lab maintains high accuracy standards. 📋";
    } else {
      response = "Our Central Lab offers comprehensive diagnostic services including blood tests, urine analysis, X-rays, ECG, ultrasound, and more. We provide accurate results with same-day reporting and home collection services. 🧪";
    }
  } else if (userMessage.includes("pharmacy") || userMessage.includes("medicine") || userMessage.includes("drug") || userMessage.includes("prescription")) {
    if (userMessage.includes("delivery") || userMessage.includes("home")) {
      response = "We offer medicine delivery services! Upload your prescription or consult our doctors for home delivery within 2-4 hours in most areas. Quality medicines at competitive prices. 🚚";
    } else {
      response = "Our in-house pharmacy provides quality medicines, health supplements, and medical supplies. We stock branded and generic medicines with expert pharmacist consultation. 💊";
    }
  } else if (userMessage.includes("home visit") || userMessage.includes("visit home") || userMessage.includes("house call")) {
    response = "Our home visit services include doctor consultations and nursing care at your doorstep. Available for elderly patients, post-surgery care, chronic illness management, and patients unable to visit the clinic. 🏠";
  } else if (userMessage.includes("corporate") || userMessage.includes("business") || userMessage.includes("company")) {
    response = "Our Corporate Health services include: annual health checkups, wellness programs, occupational health assessments, vaccination drives, and health awareness workshops for employees. 📊";
  } else if (userMessage.includes("career") || userMessage.includes("job") || userMessage.includes("work") || userMessage.includes("vacancy")) {
    response = "We're hiring! Current openings include doctors, nurses, pharmacists, lab technicians, administrative staff, and support roles. Visit our Careers page or contact us for current opportunities. 👨‍⚕️";
  } else if (userMessage.includes("time") || userMessage.includes("hours") || userMessage.includes("open") || userMessage.includes("timing") || userMessage.includes("schedule")) {
    if (userMessage.includes("weekend") || userMessage.includes("sunday") || userMessage.includes("saturday")) {
      response = "Weekend hours: 9:00 AM to 2:00 PM on Saturdays and Sundays. Emergency services are available 24x7. Please call ahead for weekend appointments. 🕐";
    } else if (userMessage.includes("monday") || userMessage.includes("tuesday") || userMessage.includes("wednesday") || userMessage.includes("thursday") || userMessage.includes("friday")) {
      response = "Weekday hours: Monday-Friday 9:00 AM to 7:00 PM. All our clinics follow the same schedule for consistency. Emergency services are available 24x7. 🕐";
    } else if (userMessage.includes("morning") || userMessage.includes("early")) {
      response = "Our clinics open at 9:00 AM every day. For early appointments, we recommend booking the first available slot at 9:00 AM. Emergency services are available 24x7. 🌅";
    } else if (userMessage.includes("evening") || userMessage.includes("late") || userMessage.includes("close")) {
      response = "On weekdays, we close at 7:00 PM. Weekend hours are shorter (until 2:00 PM). For urgent matters after hours, use our 24x7 emergency hotline. 🌙";
    } else {
      response = "Clinic hours: Monday-Friday 9:00 AM to 7:00 PM, Saturday-Sunday 9:00 AM to 2:00 PM. Emergency care is available 24 hours a day, 7 days a week. 🕐";
    }
  } else if ((userMessage.includes("location") || userMessage.includes("address") || userMessage.includes("where") || userMessage.includes("clinic")) && !(userMessage.includes("time") || userMessage.includes("timing") || userMessage.includes("hours") || userMessage.includes("schedule"))) {
    if (userMessage.includes("chennai") || userMessage.includes("madurai") || userMessage.includes("coimbatore")) {
      response = "All our clinics in Chennai, Madurai, and Coimbatore offer the same comprehensive services: doctor consultations, diagnostics, pharmacy, and home visits. Each clinic is equipped with modern medical facilities and qualified healthcare professionals. 🏥";
    } else {
      response = "We have primary care clinics in Chennai, Madurai, and Coimbatore. Our clinics offer comprehensive healthcare services including consultations, diagnostics, pharmacy, and home visits. All locations are easily accessible and equipped with modern medical facilities. 📍";
    }
  } else if (userMessage.includes("doctor") || userMessage.includes("physician") || userMessage.includes("specialist")) {
    response = "Our team includes experienced doctors in General Medicine and Pediatrics, supported by qualified nurses, pharmacists, and lab technicians. All healthcare professionals are licensed and experienced. 👨‍⚕️";
  } else if (userMessage.includes("vaccine") || userMessage.includes("vaccination") || userMessage.includes("immunization")) {
    response = "We provide routine vaccinations for children and adults, including COVID-19, flu, and travel vaccines. Our pediatricians follow national immunization schedules. 💉";
  } else if (userMessage.includes("health check") || userMessage.includes("screening") || userMessage.includes("package")) {
    response = "We offer comprehensive health checkup packages including basic screenings, executive health checks, and specialized packages for different age groups and conditions. 📋";
  } else if (userMessage.includes("wait") || userMessage.includes("queue") || userMessage.includes("delay")) {
    response = "We strive to minimize wait times! Book appointments in advance for preferred time slots. Walk-ins are welcome but may have longer wait times. ⏰";
  } else if (userMessage.includes("parking") || userMessage.includes("transport")) {
    response = "All our clinic locations have parking facilities. We're easily accessible by public transport and are located in convenient areas. 🅿️";
  } else if (userMessage.includes("feedback") || userMessage.includes("complaint") || userMessage.includes("suggestion")) {
    response = "We value your feedback! Please share your suggestions or concerns via our contact form, email, or WhatsApp. Your input helps us improve our services. 📝";
  } else if (userMessage.includes("thank") || userMessage.includes("thanks")) {
    response = "You're welcome! I'm here whenever you need assistance with your healthcare needs. Take care and stay healthy! 😊";
  } else if (userMessage.includes("hello") || userMessage.includes("hi") || userMessage.includes("hey") || userMessage.includes("good")) {
    response = "Hello! Welcome to Our Family Clinic. I'm MediBot, your healthcare assistant. How can I help you today? 🤖";
  } else if (userMessage.includes("bye") || userMessage.includes("goodbye")) {
    response = "Goodbye! Remember, your health is our priority. Feel free to reach out anytime you need assistance. Take care! 👋";
  } else {
    // Default response with more suggestions
    response = "I'm here to help with information about our clinic services, appointments, locations, and healthcare questions. You can ask me about: appointments, services, locations, contact info, payments, lab tests, pharmacy, or any other clinic-related queries. 🏥";
  }

    res.json({
      success: true,
      response: response,
      timestamp: new Date()
    });

  } catch (error) {
    console.error("AI Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Sorry, I'm having trouble processing your request right now. Please try again later.",
      timestamp: new Date()
    });
  }
};

module.exports = {
  getAIResponse
};
