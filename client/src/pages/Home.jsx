import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="home-hero">
        <div className="home-container">
        <div className="hero-content animate-fade-in">
          <span className="hero-badge animate-float">⭐ 1.5M+ Families Trust Us</span>

          <h1 className="animate-slide-up">
            Your Own Family Doctor,{" "}
            <span>Just Around the Corner</span>
          </h1>

          <p className="animate-slide-up-delay">
            Tamilnadu's most trusted primary healthcare network. Consult qualified
            doctors, access diagnostics, pharmacy, emergency care and home visits
            — all from your neighborhood clinic.
          </p>

          <div className="hero-stats animate-slide-up-delay-2">
            <div className="stat-item">
              <h3 className="animate-count">1.5M+</h3>
              <p>Consultations</p>
            </div>
            <div className="stat-item">
              <h3 className="animate-count">15+</h3>
              <p>Clinics</p>
            </div>
            <div className="stat-item">
              <h3 className="animate-count">24x7</h3>
              <p>Emergency Care</p>
            </div>
          </div>

          <div className="hero-buttons animate-slide-up-delay-3">
            <Link to="/book" className="btn primary animate-bounce-in">Book Appointment</Link>
            <Link to="/locations" className="btn secondary animate-bounce-in-delay">Find Nearest Clinic</Link>
          </div>
        </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="home-section animate-fade-in-up">
        <div className="home-container">
        <h2>Our Services</h2>
        <p className="section-sub">
          Complete healthcare services under one roof
        </p>

        <div className="grid-4">
          <Service delay="0" icon="🩺" title="Doctor Consultations" desc="General & specialist care" />
          <Service delay="1" icon="🧪" title="Lab & Diagnostics" desc="Same-day reports & home collection" />
          <Service delay="2" icon="💊" title="Pharmacy" desc="Quality medicines & delivery" />
          <Service delay="3" icon="🏠" title="Home Visits" desc="Doctor & nurse visits at home" />
        </div>

        <Link to="/services" className="link-btn">View All Services →</Link>
        </div>
      </section>

      {/* LOCATIONS PREVIEW */}
      <section className="home-section light animate-fade-in-up-delay">
        <div className="home-container">
        <h2>Clinic Locations</h2>
        <p className="section-sub">
          Easily accessible clinics across Kerala
        </p>

        <div className="grid-3">
          <Location delay="0" name="Chennai" />
          <Location delay="1" name="Madurai" />
          <Location delay="2" name="Coimbatore" />
        </div>

        <Link to="/locations" className="link-btn">View All Locations →</Link>
        </div>
      </section>

      {/* CONTACT PREVIEW */}
      <section className="home-section animate-fade-in-up-delay-2">
        <h2>Need Help?</h2>
        <p className="section-sub">
          Reach us instantly for appointments & support
        </p>

        <div className="grid-3">
          <ContactCard delay="0" title="WhatsApp" value="+91 63834 85665" />
          <ContactCard delay="1" title="Call Us" value="+91 63834 85665" />
          <ContactCard delay="2" title="Email" value="support@ourfamilyclinic.com" />
        </div>

        <Link to="/contact" className="link-btn">Contact Us →</Link>
      </section>

    </div>
  );
}

/* COMPONENTS */
function Service({ delay, icon, title, desc }) {
  return (
    <div className={`card animate-card-stagger-${delay}`}>
      <span className={`icon animate-pulse-on-hover`}>{icon}</span>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

function Location({ delay, name }) {
  return (
    <div className={`card animate-card-stagger-${delay}`}>
      <span className={`icon animate-pulse-on-hover`}>📍</span>
      <h4>{name}</h4>
      <p>Primary Care Clinic</p>
    </div>
  );
}

function ContactCard({ delay, title, value }) {
  return (
    <div className={`card animate-card-stagger-${delay}`}>
      <span className={`icon animate-pulse-on-hover`}>☎️</span>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}
