import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [clinicSettings, setClinicSettings] = useState({
    clinicName: '',
    address: '',
    phone: '',
    email: '',
    whatsappNumber: '',
    emergencyPhone: '',
    ceoEmail: '',
    cmoEmail: '',
    hrEmail: '',
    generalEmail: '',
    officeHours: {
      mondaySaturday: '',
      sunday: '',
      emergency: ''
    }
  });

  // Fetch clinic settings on component mount
  useEffect(() => {
    const fetchClinicSettings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/clinic-settings/public");
        setClinicSettings(response.data);
      } catch (error) {
        console.error("Error fetching clinic settings:", error);
        // Keep default values if fetch fails
      }
    };

    fetchClinicSettings();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      {/* ENHANCED HERO */}
      <section className="contact-hero">
        <div className="hero-content">
          <span className="hero-badge">📞 Get In Touch</span>
          <h1>Contact Us</h1>
          <p>We're here to help you 24×7 with compassionate care and expert medical guidance</p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Available</span>
            </div>
            <div className="stat">
              <span className="stat-number">2hrs</span>
              <span className="stat-label">Avg Response</span>
            </div>
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Locations</span>
            </div>
          </div>
        </div>

        {/* Floating Contact Icons */}
        <div className="contact-animations">
          <div className="floating-phone">📞</div>
          <div className="floating-email">📧</div>
          <div className="floating-clock">🕐</div>
          <div className="floating-heart">❤️</div>
        </div>
      </section>

      {/* CONTACT FORM */}
      {showForm && (
        <section className="contact-form-only">
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <p>Have a question or need assistance? We'd love to hear from you.</p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Book Appointment</option>
                    <option value="emergency">Emergency Care</option>
                    <option value="corporate">Corporate Enquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us how we can help you..."
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                📤 Send Message
              </button>
            </form>
          </div>
        </section>
      )}

      {/* CONTACT INFORMATION */}
      <section className="contact-info-only">
        <div className="contact-info-section">
          <div className="contact-info-header">
            <h2>Contact Information</h2>
            <button
              className="message-toggle-btn"
              onClick={() => setShowForm(!showForm)}
              aria-label={showForm ? "Hide contact form" : "Show contact form"}
            >
              {showForm ? "✖️" : "💬"}
            </button>
          </div>

          <div className="info-cards">
            {/* OFFICE HOURS */}
            <div className="info-card">
              <div className="card-icon">🕐</div>
              <h3>Office Hours</h3>
              <p><strong>Monday - Saturday:</strong> {clinicSettings.officeHours?.mondaySaturday || "8:00 AM - 8:00 PM"}</p>
              <p><strong>Sunday:</strong> {clinicSettings.officeHours?.sunday || "9:00 AM - 2:00 PM"}</p>
              <p><strong>Emergency:</strong> {clinicSettings.officeHours?.emergency || "24/7 Available"}</p>
            </div>

            {/* LOCATION */}
            <div className="info-card">
              <div className="card-icon">📍</div>
              <h3>Our Location</h3>
              <p>{clinicSettings.clinicName || "Health+ Clinic"}</p>
              <p>{clinicSettings.address || "123 Main St, City, State"}</p>
              <p>Find nearest clinic →</p>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="info-card">
              <div className="card-icon">🌐</div>
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="javascript:void(0)" className="social-link">📘 Facebook</a>
                <a href="javascript:void(0)" className="social-link">📷 Instagram</a>
                <a href="javascript:void(0)" className="social-link">🐦 Twitter</a>
              </div>
            </div>
          </div>

          {/* CONTACT CARDS */}
          <div className="contact-cards-grid">
            {/* APPOINTMENT BOOKING */}
            <div className="contact-card">
              <h3>📞 Appointment Booking</h3>
              <a href={`tel:${clinicSettings.phone}`}>{clinicSettings.phone || "+91 9061236888"}</a>
              <p>24×7 appointment booking & support</p>
            </div>

            {/* WHATSAPP BOOKING */}
            <div className="contact-card">
              <h3>💬 WhatsApp Booking</h3>
              <a
                href={`https://api.whatsapp.com/send?phone=${clinicSettings.whatsappNumber}&text=Hi! I want to book an appointment at ${clinicSettings.clinicName}.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {clinicSettings.whatsappNumber || "+91 9061236888"}
              </a>
              <p>Quick appointment booking via WhatsApp</p>
            </div>

            {/* CORPORATE ENQUIRIES */}
            <div className="contact-card">
              <h3>🏢 Corporate Enquiries</h3>
              <a href={`mailto:${clinicSettings.ceoEmail}`}>
                {clinicSettings.ceoEmail || "ceo@sakriyhealthcare.com"}
              </a>
              <a href={`mailto:${clinicSettings.cmoEmail}`}>
                {clinicSettings.cmoEmail || "cmo@sakriyhealthcare.com"}
              </a>
            </div>

            {/* GENERAL ENQUIRIES */}
            <div className="contact-card">
              <h3>✉️ General Enquiries</h3>
              <a href={`mailto:${clinicSettings.hrEmail}`}>
                {clinicSettings.hrEmail || "hr@sakriyhealthcare.com"}
              </a>
              <a href={`mailto:${clinicSettings.generalEmail}`}>
                {clinicSettings.generalEmail || "ourfamilyclinic@hotmail.com"}
              </a>
            </div>

            {/* EMERGENCY */}
            <div className="contact-card emergency">
              <h3>🚑 24×7 Emergency Care</h3>
              <a href={`tel:${clinicSettings.emergencyPhone}`}>
                Call Immediately: {clinicSettings.emergencyPhone || "+91 9544449908"}
              </a>
              <p>Emergency services available at select locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="quick-actions-section">
        <h2>Quick Actions</h2>
        <p>Fast-track your healthcare needs</p>

        <div className="quick-actions-grid">
          <a
            className="action-btn primary"
            href={`https://api.whatsapp.com/send?phone=${clinicSettings.whatsappNumber}&text=Hi! I want to book an appointment at ${clinicSettings.clinicName}.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 Book Appointment via WhatsApp
          </a>

          <a className="action-btn secondary" href="/services">
            🏥 Request Home Visit
          </a>

          <a className="action-btn secondary" href="/central-lab">
            🧪 Book Lab Tests
          </a>

          <a className="action-btn emergency" href={`tel:${clinicSettings.emergencyPhone}`}>
            🚨 Emergency Assistance
          </a>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="contact-faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-grid">
          <div className="faq-item">
            <h4>How quickly will I get a response?</h4>
            <p>We respond to all inquiries within 2 hours during business hours.</p>
          </div>

          <div className="faq-item">
            <h4>Do you offer telemedicine consultations?</h4>
            <p>Yes, we provide telemedicine services for follow-up consultations.</p>
          </div>

          <div className="faq-item">
            <h4>How can I book an emergency appointment?</h4>
            <p>Call our emergency hotline at +91 9544449908 for immediate assistance.</p>
          </div>

          <div className="faq-item">
            <h4>Can I request medical records?</h4>
            <p>Yes, you can request your medical records through our patient portal or by contacting our office.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
