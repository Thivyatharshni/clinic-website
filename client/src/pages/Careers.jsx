import "./Careers.css";

export default function Careers() {
  return (
    <div className="careers">

      {/* HERO */}
      <section className="careers-hero">
        <span className="tag">Join Our Team</span>
        <h1>Build Your Career in Healthcare</h1>
        <p>
          Be part of a trusted healthcare network delivering quality care with
          compassion, innovation, and clinical excellence.
        </p>

        <div className="stats">
          <div>
            <h3>15+</h3>
            <span>Clinic Locations</span>
          </div>
          <div>
            <h3>200+</h3>
            <span>Team Members</span>
          </div>
          <div>
            <h3>1.5M+</h3>
            <span>Families Served</span>
          </div>
        </div>
      </section>

      {/* JOB OPENINGS */}
      <section className="jobs">
        <h2>Current Job Openings</h2>

        <div className="job-card">
          <h3>Family Medicine Doctor</h3>
          <p>📍 Chennai | ⏱ 2–5 years</p>
          <ul>
            <li>MBBS with valid medical license</li>
            <li>Primary care experience</li>
            <li>Strong communication skills</li>
          </ul>
          <div className="job-actions">
            <a href="https://api.whatsapp.com/send?phone=916383485665" target="_blank" rel="noreferrer">WhatsApp Resume</a>
            <a href="mailto:hr@ourfamilyclinic.com">Email Resume</a>
          </div>
        </div>

        <div className="job-card">
          <h3>Registered Nurse</h3>
          <p>📍 Chennai | ⏱ 1–3 years</p>
          <ul>
            <li>B.Sc Nursing / GNM</li>
            <li>Valid nursing license</li>
            <li>Patient care experience</li>
          </ul>
          <div className="job-actions">
            <a href="https://api.whatsapp.com/send?phone=916383485665" target="_blank" rel="noreferrer">WhatsApp Resume</a>
            <a href="mailto:hr@ourfamilyclinic.com">Email Resume</a>
          </div>
        </div>

        <div className="job-card">
          <h3>Lab Technician</h3>
          <p>📍 Chennai | ⏱ 1–2 years</p>
          <ul>
            <li>Lab technology certification</li>
            <li>Diagnostic equipment handling</li>
            <li>Quality control knowledge</li>
          </ul>
          <div className="job-actions">
            <a href="https://api.whatsapp.com/send?phone=916383485665" target="_blank" rel="noreferrer">WhatsApp Resume</a>
            <a href="mailto:hr@ourfamilyclinic.com">Email Resume</a>
          </div>
        </div>

        <div className="job-card">
          <h3>Customer Care Executive</h3>
          <p>📍 Chennai | ⏱ 0–2 years</p>
          <ul>
            <li>Excellent communication skills</li>
            <li>Basic computer knowledge</li>
            <li>Customer service mindset</li>
          </ul>
          <div className="job-actions">
            <a href="https://api.whatsapp.com/send?phone=916383485665" target="_blank" rel="noreferrer">WhatsApp Resume</a>
            <a href="mailto:hr@ourfamilyclinic.com">Email Resume</a>
          </div>
        </div>

        <div className="job-card">
          <h3>Clinic Manager</h3>
          <p>📍 Chennai | ⏱ 3–5 years</p>
          <ul>
            <li>Healthcare management experience</li>
            <li>Leadership and operations skills</li>
            <li>Patient service excellence</li>
          </ul>
          <div className="job-actions">
            <a href="https://api.whatsapp.com/send?phone=916383485665" target="_blank" rel="noreferrer">WhatsApp Resume</a>
            <a href="mailto:hr@ourfamilyclinic.com">Email Resume</a>
          </div>
        </div>

        <div className="job-card">
          <h3>Pharmacist</h3>
          <p>📍 Chennai | ⏱ 1–3 years</p>
          <ul>
            <li>B.Pharm / D.Pharm</li>
            <li>Valid pharmacy license</li>
            <li>Medication counseling</li>
          </ul>
          <div className="job-actions">
            <a href="https://api.whatsapp.com/send?phone=916383485665" target="_blank" rel="noreferrer">WhatsApp Resume</a>
            <a href="mailto:hr@ourfamilyclinic.com">Email Resume</a>
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="why">
        <h2>Why Work With Us?</h2>
        <div className="why-grid">
          <div className="why-box">❤️ Healthcare Benefits</div>
          <div className="why-box">⏰ Work-Life Balance</div>
          <div className="why-box">📈 Professional Growth</div>
          <div className="why-box">🤝 Supportive Team</div>
          <div className="why-box">🏥 Modern Facilities</div>
          <div className="why-box">⭐ Community Impact</div>
        </div>
      </section>

    </div>
  );
}


