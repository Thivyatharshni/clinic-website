import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  // appointment data passed from BookAppointment page
  const appointmentData = location.state;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // safety check: if user directly opens payment page
  useEffect(() => {
    if (!appointmentData) {
      navigate("/");
    }
  }, [appointmentData, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    // simulate payment delay
    setTimeout(async () => {
      try {
        const paymentPayload = {
          ...appointmentData,
          paymentStatus: "paid",
          paymentId: "PAY" + Date.now(),
        };

        const res = await api.post("/appointments", paymentPayload);

        console.log("Appointment created:", res.data);

        // payment + booking success
        navigate("/appointments", {
          state: { success: "Appointment booked successfully!" },
        });
      } catch (err) {
        console.error("Payment error:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);

        // More specific error messages
        if (err.response?.status === 400) {
          setError("Payment verification failed. Please contact support.");
        } else if (err.response?.status === 401) {
          setError("Authentication failed. Please login again.");
        } else if (err.response?.status >= 500) {
          setError("Server error. Please try again later.");
        } else if (err.code === 'ECONNABORTED') {
          setError("Request timed out. Please check your connection.");
        } else {
          setError("Payment failed. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="payment-page page-with-bottom-cta">
      <div className="payment-card">
        <h2>Payment</h2>

        <div className="payment-summary">
          <p>
            <strong>Date:</strong> {appointmentData?.date}
          </p>
          <p>
            <strong>Time:</strong> {appointmentData?.time}
          </p>
          <p>
            <strong>Amount:</strong> ₹300
          </p>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button
          className="pay-btn"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
