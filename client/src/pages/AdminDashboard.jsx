import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaCalendarCheck,
  FaUsers,
  FaStethoscope,
  FaDollarSign,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import LogoLink from "../components/LogoLink";
import api from "../api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminProfile, setAdminProfile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const [highlightedAppointment, setHighlightedAppointment] = useState(null);
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
    generalEmail: ''
  });
  const [settingsLoading, setSettingsLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= FETCH APPOINTMENTS ================= */
  useEffect(() => {
    fetchAppointments();
    fetchAdminProfile();
    fetchClinicSettings();
  }, []);

  /* ================= SEARCH FILTER ================= */
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFiltered(appointments);
    } else {
      const filteredAppointments = appointments.filter((appointment) =>
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFiltered(filteredAppointments);
    }
  }, [searchTerm, appointments]);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/admin/appointments");
      setAppointments(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH ADMIN PROFILE ================= */
  const fetchAdminProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "adminToken"
            )}`,
          },
        }
      );
      setAdminProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch admin profile:", err);
    }
  };

  /* ================= FETCH CLINIC SETTINGS ================= */
  const fetchClinicSettings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/clinic-settings",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "adminToken"
            )}`,
          },
        }
      );
      setClinicSettings(res.data);
    } catch (err) {
      console.error("Failed to fetch clinic settings:", err);
    }
  };

  /* ================= UPDATE CLINIC SETTINGS ================= */
  const updateClinicSettings = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);

    try {
      await axios.put(
        "http://localhost:5000/api/clinic-settings",
        clinicSettings,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "adminToken"
            )}`,
          },
        }
      );
      alert("Clinic settings updated successfully!");
      fetchClinicSettings(); // Refresh the data
    } catch (err) {
      console.error("Failed to update clinic settings:", err);
      alert("Failed to update clinic settings. Please try again.");
    } finally {
      setSettingsLoading(false);
    }
  };

  /* ================= HANDLE SETTINGS CHANGE ================= */
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setClinicSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/appointments/${id}/status`,
        { status, isNew: false },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "adminToken"
            )}`,
          },
        }
      );
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className={`admin-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* ================= SIDEBAR ================= */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="logo">Health+</h2>
          <button className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars />
          </button>
        </div>

        <nav>
          <p className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => setActiveSection('dashboard')}>Dashboard</p>
          <p className={activeSection === 'appointments' ? 'active' : ''} onClick={() => setActiveSection('appointments')}>Appointments</p>
          <p className={activeSection === 'doctors' ? 'active' : ''} onClick={() => setActiveSection('doctors')}>Doctors</p>
          <p className={activeSection === 'patients' ? 'active' : ''} onClick={() => setActiveSection('patients')}>Patients</p>
          <p className={activeSection === 'reports' ? 'active' : ''} onClick={() => setActiveSection('reports')}>Reports</p>
          <p className={activeSection === 'settings' ? 'active' : ''} onClick={() => setActiveSection('settings')}>Settings</p>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="main-content">
        {/* ================= TOP BAR ================= */}
        <div className="topbar">
          <div className="topbar-left">
            <button className={`hamburger topbar-hamburger ${isSidebarOpen ? 'hidden' : ''}`} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <FaBars />
            </button>
            <LogoLink onAdminDashboardClick={() => setActiveSection('dashboard')} />
          </div>

          {(activeSection === 'dashboard' || activeSection === 'appointments' || activeSection === 'patients') && (
            <input
              className="search"
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}

          <div className="top-icons">
    <div className="notification-wrapper">
              <FaBell />
              {appointments.filter(a => a.isNew && a.status === 'pending').length > 0 && (
                <span className="notification-badge">
                  {appointments.filter(a => a.isNew && a.status === 'pending').length}
                </span>
              )}

              <div className="admin-notification-dropdown">
                <h4>New Appointments</h4>
                {appointments.filter(a => a.isNew && a.status === 'pending').length === 0 ? (
                  <p>No new appointments</p>
                ) : (
                  appointments
                    .filter(a => a.isNew && a.status === 'pending')
                    .slice(0, 5)
                    .map((appointment) => (
                      <div
                        key={appointment._id}
                        className="admin-notification-item"
                        onClick={() => {
                          setActiveSection('appointments');
                          setHighlightedAppointment(appointment._id);
                          // Mark this notification as seen by updating the appointment
                          setAppointments(prev => prev.map(a =>
                            a._id === appointment._id ? { ...a, isNew: false } : a
                          ));
                          // Scroll to the appointment after a brief delay
                          setTimeout(() => {
                            const element = document.getElementById(`appointment-${appointment._id}`);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              element.classList.add('highlighted');
                              setTimeout(() => element.classList.remove('highlighted'), 3000);
                            }
                          }, 100);
                        }}
                      >
                        <div className="notification-content">
                          <strong>{appointment.name}</strong>
                          <span>{appointment.service}</span>
                          <small>{appointment.date} • {appointment.time}</small>
                        </div>
                        <div className="notification-status pending">New</div>
                      </div>
                    )))
                }
              </div>
            </div>

            <div className="profile">
              <FaUserCircle />

              {/* PROFILE DROPDOWN */}
              <div className="profile-dropdown">
                <p>{adminProfile?.email || "Admin"}</p>

                <Link to="/admin/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>

        {activeSection === 'dashboard' && (
          <>
            {/* ================= STATS ================= */}
            <div className="stats">
              <div className="stat-card">
                <FaCalendarCheck />
                <h3>{appointments.length}</h3>
                <p>Appointments</p>
              </div>

              <div className="stat-card">
                <FaUsers />
                <h3>920</h3>
                <p>Patients</p>
              </div>

              <div className="stat-card">
                <FaStethoscope />
                <h3>150</h3>
                <p>Doctors</p>
              </div>

              <div className="stat-card">
                <FaDollarSign />
                <h3>₹12,860</h3>
                <p>Income</p>
              </div>
            </div>

            {/* ================= RECENT APPOINTMENTS ================= */}
            <section className="table-section">
              <h3>Recent Appointments</h3>

              {loading ? (
                <p>Loading appointments...</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.slice(0, 5).map((a) => (
                      <tr key={a._id} className={a.isNew ? 'new-appointment' : ''}>
                        <td>
                          {a.name}
                        </td>
                        <td>{a.phone}</td>
                        <td>{a.service}</td>
                        <td>{a.date}</td>
                        <td>{a.time}</td>

                        <td>
                          <span
                            className={`status ${a.status.toLowerCase()}`}
                          >
                            {a.status}
                          </span>
                        </td>

                        <td>
                          {a.status === "pending" ? (
                            <div className="action-buttons">
                              <button
                                className="approve-btn"
                                onClick={() =>
                                  updateStatus(a._id, "approved")
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="reject-btn"
                                onClick={() =>
                                  updateStatus(a._id, "rejected")
                                }
                              >
                                Reject
                              </button>
                            </div>
                        ) : (
                          <span className="action-placeholder">—</span>
                        )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </>
        )}

        {activeSection === 'appointments' && (
          <section className="table-section">
            <h3>All Appointments</h3>

            {loading ? (
              <p>Loading appointments...</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((a) => (
                    <tr key={a._id} id={`appointment-${a._id}`} className={highlightedAppointment === a._id ? 'highlighted-appointment' : ''}>
                      <td>{a.name}</td>
                      <td>{a.phone}</td>
                      <td>{a.service}</td>
                      <td>{a.date}</td>
                      <td>{a.time}</td>

                      <td>
                        <span
                          className={`status ${a.status.toLowerCase()}`}
                        >
                          {a.status}
                        </span>
                      </td>

                      <td>
                        {a.status === "pending" ? (
                          <div className="action-buttons">
                            <button
                              className="approve-btn"
                              onClick={() =>
                                updateStatus(a._id, "approved")
                              }
                            >
                              Approve
                            </button>
                            <button
                              className="reject-btn"
                              onClick={() =>
                                updateStatus(a._id, "rejected")
                              }
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="action-placeholder">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {activeSection === 'doctors' && (
          <section className="table-section">
            <h3>Doctors</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialty</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Experience</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dr. John Doe</td>
                  <td>Cardiology</td>
                  <td>+1 234 567 890</td>
                  <td>john@clinic.com</td>
                  <td>10 years</td>
                </tr>
                <tr>
                  <td>Dr. Jane Smith</td>
                  <td>Dermatology</td>
                  <td>+1 234 567 891</td>
                  <td>jane@clinic.com</td>
                  <td>8 years</td>
                </tr>
                <tr>
                  <td>Dr. Alex Johnson</td>
                  <td>Orthopedics</td>
                  <td>+1 234 567 892</td>
                  <td>alex@clinic.com</td>
                  <td>12 years</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {activeSection === 'patients' && (
          <section className="table-section">
            <h3>Patients</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Last Visit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alice Brown</td>
                  <td>+1 234 567 893</td>
                  <td>alice@email.com</td>
                  <td>2024-01-15</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Bob Wilson</td>
                  <td>+1 234 567 894</td>
                  <td>bob@email.com</td>
                  <td>2024-01-10</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Charlie Davis</td>
                  <td>+1 234 567 895</td>
                  <td>charlie@email.com</td>
                  <td>2024-01-08</td>
                  <td>Inactive</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {activeSection === 'reports' && (
          <section className="table-section">
            <h3>Reports</h3>
            <div className="reports-grid">
              <div className="report-card">
                <FaCalendarCheck />
                <h4>Monthly Appointments</h4>
                <p>245 appointments this month</p>
              </div>
              <div className="report-card">
                <FaUsers />
                <h4>Patient Growth</h4>
                <p>15% increase from last month</p>
              </div>
              <div className="report-card">
                <FaDollarSign />
                <h4>Revenue</h4>
                <p>₹85,000 this month</p>
              </div>
              <div className="report-card">
                <FaStethoscope />
                <h4>Doctor Performance</h4>
                <p>Average rating: 4.8/5</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'settings' && (
          <section className="table-section">
            <h3>Clinic Settings</h3>
            <form className="settings-form" onSubmit={updateClinicSettings}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="clinicName">Clinic Name</label>
                  <input
                    type="text"
                    id="clinicName"
                    name="clinicName"
                    value={clinicSettings.clinicName}
                    onChange={handleSettingsChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={clinicSettings.phone}
                    onChange={handleSettingsChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={clinicSettings.address}
                  onChange={handleSettingsChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={clinicSettings.email}
                    onChange={handleSettingsChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="whatsappNumber">WhatsApp Number</label>
                  <input
                    type="text"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={clinicSettings.whatsappNumber}
                    onChange={handleSettingsChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="emergencyPhone">Emergency Phone</label>
                  <input
                    type="text"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={clinicSettings.emergencyPhone}
                    onChange={handleSettingsChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ceoEmail">CEO Email</label>
                  <input
                    type="email"
                    id="ceoEmail"
                    name="ceoEmail"
                    value={clinicSettings.ceoEmail}
                    onChange={handleSettingsChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cmoEmail">CMO Email</label>
                  <input
                    type="email"
                    id="cmoEmail"
                    name="cmoEmail"
                    value={clinicSettings.cmoEmail}
                    onChange={handleSettingsChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hrEmail">HR Email</label>
                  <input
                    type="email"
                    id="hrEmail"
                    name="hrEmail"
                    value={clinicSettings.hrEmail}
                    onChange={handleSettingsChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="generalEmail">General Email</label>
                <input
                  type="email"
                  id="generalEmail"
                  name="generalEmail"
                  value={clinicSettings.generalEmail}
                  onChange={handleSettingsChange}
                />
              </div>

              <button type="submit" className="save-btn" disabled={settingsLoading}>
                {settingsLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
