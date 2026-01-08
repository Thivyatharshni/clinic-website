import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend validation matching backend rules
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("All fields are required");
      return;
    }

    // Validate name length
    if (form.name.trim().length < 2) {
      setError("Name must be at least 2 characters long");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password length
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Validate phone number (basic check)
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    const cleanPhone = form.phone.replace(/\D/g, '');
    if (!phoneRegex.test(form.phone) || cleanPhone.length < 10) {
      setError("Please enter a valid phone number (at least 10 digits)");
      return;
    }

    // Create AbortController for timeout handling (mobile-friendly)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Ensure proper headers for mobile browsers
          "Accept": "application/json",
          "User-Agent": navigator.userAgent, // Include user agent for debugging
        },
        // Ensure proper request configuration for mobile
        mode: "cors",
        cache: "no-cache",
        credentials: "omit", // Avoid CORS issues with credentials on mobile
        signal: controller.signal, // Add timeout support
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.toLowerCase(),
          phone: form.phone.trim(),
          password: form.password,
        }),
      });

      clearTimeout(timeoutId);

      // Check if response is valid JSON before parsing
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned invalid response format");
      }

      const data = await res.json();

      if (!res.ok) {
        // Show specific backend error messages
        setError(data.message || data.error || `Registration failed (${res.status}: ${res.statusText})`);
        return;
      }

      navigate("/login");
    } catch (err) {
      clearTimeout(timeoutId);
      console.error("Registration error:", err);

      // More specific error messages for different failure types
      if (err.name === 'AbortError') {
        setError("Request timed out. Please check your internet connection and try again.");
      } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError("Network error: Unable to connect to server. Please check your internet connection and try again.");
      } else if (err.message.includes('invalid response format')) {
        setError("Server communication error. Please try again later.");
      } else {
        setError(`Registration failed: ${err.message || "Please try again later"}`);
      }
    }
  };

  return (
    <div className="clinic-login-container">
      <div className="clinic-login-card">

        <form className="clinic-login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="clinic-login-btn">
            Create Account
          </button>
        </form>

        <div className="clinic-login-footer">
          <p>Already have an account?
            <Link to="/login" className="register-link"> Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}





