import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

        const res = await fetch(
          "http://localhost:5000/api/appointments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user"))?.token
              }`,
            },
            body: JSON.stringify(paymentPayload),
          }
        );

        if (!res.ok) {
          throw new Error("Appointment booking failed");
        }

        // payment + booking success
        navigate("/appointments", {
          state: { success: "Appointment booked successfully!" },
        });
      } catch (err) {
        setError("Payment failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="payment-page">
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
