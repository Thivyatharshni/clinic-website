import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./BookAppointment.css";

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

export default function BookAppointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const [bookedSlots, setBookedSlots] = useState([]);

  /* 🔐 Protect Book Page */
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      localStorage.setItem("redirectAfterLogin", "/book");
      navigate("/login");
    }
  }, [navigate]);

  /* Fetch booked slots when date changes */
  useEffect(() => {
    if (!formData.date) return;

    api.get(`/appointments/slots/${formData.date}`)
      .then((res) => setBookedSlots(res.data))
      .catch(() => setBookedSlots([]));
  }, [formData.date]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ✅ UPDATED SUBMIT FUNCTION → PAYMENT PAGE */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.time) {
      alert("Please select a time slot");
      return;
    }

    // 🔁 Redirect to payment page with appointment data
    navigate("/payment", {
      state: {
        ...formData,
      },
    });
  };

  return (
    <div className="appointment-container">
      <h1>Book an Appointment</h1>

      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Information</h3>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-section">
          <h3>Appointment Details</h3>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option>Pediatrics</option>
            <option>General Medicine</option>
            <option>Diagnostics</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Additional Message (Optional)"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className="time-selection">
          <p className="select-time">Select Your Preferred Time</p>

          <div className="time-grid">
            {TIME_SLOTS.map((time) => {
              const isBooked = bookedSlots.includes(time);
              const isSelected = formData.time === time;

              return (
                <button
                  type="button"
                  key={time}
                  className={`slot ${isBooked ? "booked" : ""} ${
                    isSelected ? "selected" : ""
                  }`}
                  disabled={isBooked}
                  onClick={() => setFormData({ ...formData, time })}
                >
                  {isBooked ? "Booked" : time}
                </button>
              );
            })}
          </div>
        </div>

        <button className="confirm-btn" type="submit">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}
