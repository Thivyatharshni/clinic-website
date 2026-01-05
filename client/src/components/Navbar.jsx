import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaBell, FaUser } from "react-icons/fa";
import LogoLink from "./LogoLink";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [seenNotifications, setSeenNotifications] = useState(() => {
    // Load seen notifications from localStorage
    const stored = localStorage.getItem('seenNotifications');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  /* SAFE USER READ */
  const user = (() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "null" || storedUser === "undefined") {
      return null;
    }
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  })();

  const adminToken = localStorage.getItem("adminToken");

  /* FETCH USER APPOINTMENTS */
  useEffect(() => {
    if (!user || adminToken) return;

    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/appointments/my",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppointments();

    // Poll for updates every 10 seconds
    const interval = setInterval(fetchAppointments, 10000);

    return () => clearInterval(interval);
  }, [user, adminToken]);

  /* SAVE SEEN NOTIFICATIONS TO LOCALSTORAGE */
  useEffect(() => {
    localStorage.setItem('seenNotifications', JSON.stringify([...seenNotifications]));
  }, [seenNotifications]);

  /* CLOSE DROPDOWNS ON OUTSIDE CLICK */
  useEffect(() => {
    const handler = (e) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target)
      ) {
        setShowNotif(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* FILTER NOTIFICATIONS - exclude seen ones */
  const notifications = appointments.filter(
    (a) => (a.status === "approved" || a.status === "rejected") && !seenNotifications.has(a._id)
  );

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("redirectAfterLogin");
    localStorage.removeItem("seenNotifications"); // Clear seen notifications
    navigate("/login");
  };

  const handleNotifClick = (appointmentId) => {
    // Mark this specific notification as seen
    setSeenNotifications(prev => new Set([...prev, appointmentId]));
    setShowNotif(false);
    setMenuOpen(false); // Close mobile menu
    navigate("/appointments");
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false); // Close mobile menu when nav link is clicked
  };

  const handleBookClick = () => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", "/book");
      navigate("/login");
    } else {
      navigate("/book");
    }
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo-section">
        <LogoLink />
        <div className="logo-text">
          <h2>Clinic</h2>
        </div>
      </div>

      {/* NAV LINKS */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={handleNavLinkClick}>Home</Link></li>
        <li><Link to="/about" onClick={handleNavLinkClick}>About</Link></li>
        <li><Link to="/services" onClick={handleNavLinkClick}>Services</Link></li>
        <li><Link to="/central-lab" onClick={handleNavLinkClick}>Central Lab</Link></li>
        <li><Link to="/health-insurance" onClick={handleNavLinkClick}>Health Insurance</Link></li>
        <li><Link to="/corporate-health" onClick={handleNavLinkClick}>Corporate Health</Link></li>
        <li><Link to="/careers" onClick={handleNavLinkClick}>Careers</Link></li>
        <li><Link to="/locations" onClick={handleNavLinkClick}>Locations</Link></li>
        <li><Link to="/contact" onClick={handleNavLinkClick}>Contact</Link></li>

        {adminToken && (
          <li>
            <Link to="/admin/dashboard" onClick={handleNavLinkClick}>Admin Dashboard</Link>
          </li>
        )}
      </ul>

      {/* RIGHT ACTIONS */}
      <div className="nav-actions">
        {!adminToken && user && (
          <div className="user-actions">
            {/* 🔔 BELL */}
            <div className="user-notification" ref={notifRef}>
              <FaBell
                className="bell-icon"
                onClick={() => setShowNotif(!showNotif)}
              />
              {notifications.length > 0 && (
                <span className="notif-count">
                  {notifications.length}
                </span>
              )}

              {showNotif && (
                <div className="notif-dropdown">
                  <h4>Notifications</h4>

                  {notifications.length === 0 ? (
                    <p>No notifications</p>
                  ) : (
                    notifications.map((a) => (
                      <div
                        key={a._id}
                        className={`notif-item ${a.status.toLowerCase()}`}
                        onClick={() => handleNotifClick(a._id)}
                      >
                        <strong>{a.service}</strong>
                        <span>
                          {a.status === "approved"
                            ? "✅ Appointment Approved"
                            : "❌ Appointment Rejected"}
                        </span>
                        <small>{a.date} • {a.time}</small>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* 👤 PROFILE ICON */}
            <div className="user-menu" ref={profileRef}>
              <button
                className="profile-icon-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                title="Profile Menu"
              >
                <FaUser />
              </button>

              {profileOpen && (
                <div className="user-dropdown">
                  <Link to="/profile">Profile</Link>
                  <Link to="/appointments">My Appointments</Link>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        )}

        {!adminToken && (
          <button className="book-btn" onClick={handleBookClick}>
            Book Appointment
          </button>
        )}

        {!user && (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
}
