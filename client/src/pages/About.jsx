import "./About.css";

export default function About() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="hero-content">
          <span className="about-badge">🏥 About Our Clinic</span>
          <h1>
            Trusted Family Healthcare <span>Right Near You</span>
          </h1>
          <p>
            Our Family Clinic is a modern neighborhood healthcare center delivering
            affordable, accessible, and high-quality medical care for all age groups.
          </p>
        </div>

        {/* Floating Medical Icons */}
        <div className="hero-animations">
          <div className="floating-icon icon-1">🏥</div>
          <div className="floating-icon icon-2">💊</div>
          <div className="floating-icon icon-3">🩺</div>
          <div className="floating-icon icon-4">🧬</div>
          <div className="floating-icon icon-5">❤️</div>
        </div>
      </section>

      {/* ABOUT CLINIC */}
      <section className="about-clinic">
        <div className="about-text">
          <h2>👨‍⚕️ Who We Are</h2>
          <p>
            Our Family Clinic (OFC) was founded with a mission to bring
            hospital-quality healthcare closer to communities.
            We combine experienced doctors, advanced diagnostics, and compassionate
            care under one roof.
          </p>

          <ul>
            <li>✅ Experienced & qualified doctors</li>
            <li>✅ In-house laboratory & pharmacy</li>
            <li>✅ Affordable consultation fees</li>
            <li>✅ Emergency & chronic care support</li>
          </ul>
        </div>

        <div className="about-visuals">
          <div className="about-image main-image">
            <img
              src="https://images.unsplash.com/photo-1581982231900-6a1a46b744c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsaW5pYyUyMGludGVyaW9yJTIwZm9yJTIwY2xpbmljfGVufDB8fDB8fHww"
              alt="Clinic Interior"
            />
          </div>

          {/* Animated Side Images */}
          <div className="side-images">
            <div className="side-image image-1">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                alt="Medical Team"
              />
              <div className="image-overlay">
                <span>👨‍⚕️</span>
                <p>Expert Doctors</p>
              </div>
            </div>

            <div className="side-image image-2">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                alt="Medical Technology"
              />
              <div className="image-overlay">
                <span>🧪</span>
                <p>Modern Technology</p>
              </div>
            </div>

            <div className="side-image image-3">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
                alt="Patient Care"
              />
              <div className="image-overlay">
                <span>❤️</span>
                <p>Patient Care</p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* SPECIALITIES */}
      <section className="specialities">
        <h2>🌟 Our Medical Specialities</h2>

        <div className="speciality-grid">
          <Speciality
            emoji="🩺"
            title="General Medicine"
            desc="Diagnosis & treatment of common illnesses, infections, and chronic diseases."
          />
          <Speciality
            emoji="👶"
            title="Pediatrics"
            desc="Complete healthcare for infants, children, and adolescents."
          />
          <Speciality
            emoji="👩‍⚕️"
            title="Women's Health"
            desc="Pregnancy care, gynecology, hormonal health & wellness."
          />
          <Speciality
            emoji="🧠"
            title="Mental Health"
            desc="Stress management, counseling & emotional wellbeing."
          />
          <Speciality
            emoji="🦴"
            title="Orthopedics"
            desc="Bone, joint, muscle pain & injury management."
          />
          <Speciality
            emoji="🧪"
            title="Diagnostics"
            desc="Blood tests, imaging, health checkups & reports."
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <h2>💙 Why Choose Our Family Clinic?</h2>

        <div className="why-grid">
          <div className="why-card">
            ⚡ <h4>Quick Consultations</h4>
            <p>Minimal waiting time with efficient appointment systems.</p>
          </div>

          <div className="why-card">
            🏠 <h4>Home Services</h4>
            <p>Doctor visits, nursing care & lab sample collection at home.</p>
          </div>

          <div className="why-card">
            💊 <h4>All-in-One Care</h4>
            <p>Consultation, lab tests, pharmacy & follow-ups in one place.</p>
          </div>

          <div className="why-card">
            ❤️ <h4>Patient-Centered Care</h4>
            <p>We treat patients with empathy, dignity, and respect.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

function Speciality({ emoji, title, desc }) {
  return (
    <div className="speciality-card">
      <span className="spec-emoji">{emoji}</span>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}
