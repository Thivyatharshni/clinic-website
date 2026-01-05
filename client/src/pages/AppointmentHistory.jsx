import { useEffect, useState } from "react";
import "./AppointmentHistory.css";

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/appointments/my", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          setAppointments([]);
        }
      })
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="appointments-container">
      <h2 className="appointments-title">My Appointments</h2>

      {loading ? (
        <div className="info-box">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="info-box">No appointments yet.</div>
      ) : (
        <div className="table-wrapper">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Service</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((app) => (
                <tr key={app._id}>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td>{app.service}</td>
                  <td>
                    {/* ✅ IMPORTANT FIX HERE */}
                    <span
                      className={`status ${app.status.toLowerCase()}`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


