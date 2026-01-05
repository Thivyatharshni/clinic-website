import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserMd, FaHeartbeat } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ✅ CLEAR OLD LOGIN STATE WHEN LOGIN PAGE LOADS */
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      /* 🔹 1. TRY ADMIN LOGIN FIRST */
      let res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
        return;
      }

      /* 🔹 2. TRY USER LOGIN */
      res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid login");
        return;
      }

      /* ✅ USER LOGIN SUCCESS (SAFE STORAGE) */
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: data.email,
          token: data.token,
        })
      );

      const redirectTo = localStorage.getItem("redirectAfterLogin");
      if (redirectTo) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectTo);
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clinic-login-container">
      <div className="clinic-login-card">
        <div className="clinic-login-header">
          <div className="clinic-icon-wrapper">
            <FaUserMd className="clinic-icon" />
            <FaHeartbeat className="heartbeat-icon" />
          </div>
          <h1>Health+</h1>
          <p>Welcome back to your health journey</p>
        </div>

        <form className="clinic-login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

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
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
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

          <button type="submit" className="clinic-login-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner"></div>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="clinic-login-footer">
          <p>New to Health+?
            <Link to="/register" className="register-link"> Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
