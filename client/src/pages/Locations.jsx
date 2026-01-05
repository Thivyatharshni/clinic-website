import React, { useState, useMemo } from "react";
import "./Locations.css";

export default function Locations() {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [selectedClinic, setSelectedClinic] = useState(null);

  const clinics = useMemo(
    () => [
      {
        id: 1,
        name: "Apollo Clinic – T Nagar",
        area: "T Nagar, Chennai",
        open: true,
        emergency: true,
        wait: 10,
        phone: "+91 44 2819 0200",
        distance: "2.3 km",
        rating: 4.8,
        services: ["General Medicine", "Cardiology", "Emergency Care"],
        hours: "24/7",
        image: "🏥",
        reviews: 245
      },
      {
        id: 2,
        name: "Apollo Clinic – Anna Nagar",
        area: "Anna Nagar, Chennai",
        open: false,
        emergency: false,
        wait: 0,
        phone: "+91 44 2626 6311",
        distance: "4.1 km",
        rating: 4.6,
        services: ["Family Medicine", "Pediatrics", "Dental Care"],
        hours: "9 AM - 9 PM",
        image: "🏥",
        reviews: 189
      },
      {
        id: 3,
        name: "Apollo Clinic – Velachery",
        area: "Velachery, Chennai",
        open: true,
        emergency: true,
        wait: 5,
        phone: "+91 44 4340 1060",
        distance: "6.8 km",
        rating: 4.9,
        services: ["Emergency Care", "Surgery", "Diagnostics"],
        hours: "24/7",
        image: "🏥",
        reviews: 312
      },
      {
        id: 4,
        name: "Apollo Clinic – Tambaram",
        area: "Tambaram, Chennai",
        open: true,
        emergency: false,
        wait: 20,
        phone: "+91 44 2226 6060",
        distance: "12.5 km",
        rating: 4.7,
        services: ["General Medicine", "Orthopedics", "Laboratory"],
        hours: "8 AM - 10 PM",
        image: "🏥",
        reviews: 156
      },
    ],
    []
  );

  const handleBookAppointment = (clinic) => {
    const message = `Book appointment at ${clinic.name} (${clinic.area})`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=916383485665&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGetDirections = (clinic) => {
    // Show detailed location information
    const locationInfo = `
🏥 ${clinic.name}
📍 ${clinic.area}
📏 Distance: ${clinic.distance}
🕐 Hours: ${clinic.hours}
📞 Phone: ${clinic.phone}

Services Available:
${clinic.services.map(service => `• ${service}`).join('\n')}

Getting directions to ${clinic.name}...
    `.trim();

    // In a real app, this would open Google Maps or similar
    alert(locationInfo);
  };

  const filteredClinics = useMemo(() => {
    return clinics.filter((c) => {
      if (emergencyMode && !c.emergency) return false;
      if (filter === "OPEN") return c.open;
      if (filter === "FAST") return c.wait > 0 && c.wait <= 10;
      return true;
    });
  }, [clinics, emergencyMode, filter]);

  const bestClinic = filteredClinics.find((c) => c.open);

  return (
    <div className={`locations-page ${emergencyMode ? "emergency-active" : ""}`}>
      {/* HERO */}
      <div className="locations-hero">
        <span className="tag">🏥 Clinic Availability</span>

        <h1>
          Choose the Best <span>Apollo Clinic</span>
        </h1>

        <p>Live availability, emergency support & waiting time with interactive map.</p>

        <button
          className="emergency-btn"
          onClick={() => setEmergencyMode(!emergencyMode)}
        >
          🚑 Emergency Mode
        </button>

        {/* FILTERS */}
        <div className="filters">
          <button
            className={filter === "ALL" ? "active" : ""}
            onClick={() => setFilter("ALL")}
          >
            All
          </button>
          <button
            className={filter === "OPEN" ? "active" : ""}
            onClick={() => setFilter("OPEN")}
          >
            Open Now
          </button>
          <button
            className={filter === "FAST" ? "active" : ""}
            onClick={() => setFilter("FAST")}
          >
            Shortest Wait
          </button>
        </div>
      </div>



      {/* RECOMMENDED */}
      {bestClinic && (
        <div className="clinic-highlight">
          <div>
            <h3>⭐ Recommended for You</h3>
            <p className="clinic-name">{bestClinic.name}</p>
            <p>{bestClinic.area}</p>
            <p>⏱ Waiting Time: {bestClinic.wait} mins</p>
          </div>

          <div className="highlight-actions">
            <a href={`tel:${bestClinic.phone}`} className="call-btn">
              📞 Call
            </a>
          </div>
        </div>
      )}

      <h2 className="section-title">Nearby Clinics</h2>

      {/* CLINIC LIST */}
      <div className="clinic-list">
        {filteredClinics.map((c, i) => (
          <div
            className={`clinic-card ${
              emergencyMode && c.emergency ? "highlight" : ""
            } ${selectedClinic === c.id ? "selected" : ""}`}
            key={i}
            onClick={() => setSelectedClinic(selectedClinic === c.id ? null : c.id)}
          >
            <div className="card-header">
              <div className="clinic-rating">
                <span className="stars">⭐ {c.rating}</span>
                <span className="reviews">({c.reviews} reviews)</span>
              </div>
            </div>

            <div className="card-body">
              <div className="card-head">
                <h3>{c.name}</h3>

                {c.emergency && (
                  <span className="badge emergency">🚑 EMERGENCY</span>
                )}

                <span className={`badge ${c.open ? "open" : "closed"}`}>
                  {c.open ? "🟢 OPEN" : "🔴 CLOSED"}
                </span>
              </div>

              <div className="clinic-info">
                <p className="area">📍 {c.area}</p>
                <p className="distance">📏 {c.distance} away</p>
                <p className="hours">🕐 {c.hours}</p>
              </div>

              <div className="services-preview">
                <small>🏥 Services:</small>
                <div className="service-tags">
                  {c.services.slice(0, 2).map((service, idx) => (
                    <span key={idx} className="service-tag">{service}</span>
                  ))}
                  {c.services.length > 2 && (
                    <span className="service-tag more">+{c.services.length - 2} more</span>
                  )}
                </div>
              </div>

              {c.wait > 0 && (
                <div className="wait-info">
                  <div className="wait-bar">
                    <div style={{ width: `${100 - c.wait * 3}%` }}></div>
                  </div>
                  <small>⏱ {c.wait} mins waiting</small>
                </div>
              )}
            </div>

            <div className={`card-actions ${selectedClinic === c.id ? "expanded" : ""}`}>
              <a href={`tel:${c.phone}`} className="call-btn primary">
                📞 Call Now
              </a>
              <button
                className="book-btn secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookAppointment(c);
                }}
              >
                📅 Book Appointment
              </button>
              <button
                className="directions-btn tertiary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetDirections(c);
                }}
              >
                🗺️ Get Directions
              </button>
            </div>

            {selectedClinic === c.id && (
              <div className="expanded-details">
                <div className="full-services">
                  <h4>All Services:</h4>
                  <div className="service-list">
                    {c.services.map((service, idx) => (
                      <span key={idx} className="service-item">{service}</span>
                    ))}
                  </div>
                </div>
                <div className="clinic-stats">
                  <div className="stat">
                    <span className="stat-label">Rating</span>
                    <span className="stat-value">{c.rating}/5.0</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Reviews</span>
                    <span className="stat-value">{c.reviews}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Distance</span>
                    <span className="stat-value">{c.distance}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
