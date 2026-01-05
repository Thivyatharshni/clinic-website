import "./CorporateHealth.css";

export default function CorporateHealth() {
  return (
    <div className="corporate-page">

      {/* HERO SECTION */}
      <section className="corp-hero">
        <span className="corp-tag">Corporate Health Solutions</span>
        <h1>
          OFC <span>Corporate Health & Partnerships</span>
        </h1>
        <p>
          Comprehensive healthcare solutions for businesses, schools, and
          communities. We help organizations build healthier, more productive
          environments.
        </p>

        <div className="corp-actions">
          <a
            href="https://api.whatsapp.com/send?phone=916383485665"
            target="_blank"
            rel="noreferrer"
            className="btn whatsapp"
          >
            WhatsApp
          </a>

          <a href="tel:+916383485665" className="btn call">
            Call Us
          </a>

          <a
            href="mailto:corporatelabs@satkiyahealthcare.com"
            className="btn email"
          >
            Email
          </a>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="corp-services">
        <h2>Corporate Health Services</h2>
        <p className="section-sub">
          Tailored healthcare programs to support your workforce.
        </p>

        <div className="service-grid">
          {services.map((item, index) => (
            <div className="service-card" key={index}>
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <ul>
                {item.points.map((p, i) => (
                  <li key={i}>✔ {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* OUTREACH */}
      <section className="corp-outreach">
        <h2>Community Outreach Programs</h2>
        <p>
          Extending healthcare beyond corporate boundaries to communities and
          NGOs.
        </p>

        <div className="outreach-grid">
          <div className="outreach-card">Resident Associations</div>
          <div className="outreach-card">NGO Partnerships</div>
          <div className="outreach-card">Self Help Groups</div>
        </div>
      </section>

      {/* CTA */}
      <section className="corp-cta">
        <h2>Ready to Transform Your Organization’s Health?</h2>
        <p>
          Contact our corporate health experts for a customized proposal.
        </p>

        <div className="cta-grid">
          <a href="https://api.whatsapp.com/send?phone=916383485665" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href="tel:+916383485665">Phone</a>
          <a href="mailto:corporatelabs@satkiyahealthcare.com">Email</a>
        </div>
      </section>
    </div>
  );
}

/* DATA */
const services = [
  {
    title: "Pre-Employment Screening",
    desc: "Health assessments for workplace readiness.",
    img: "https://images.unsplash.com/photo-1691934286085-c88039d93dae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    points: ["Medical fitness", "Vision & hearing", "Drug screening"],
  },
  {
    title: "Employee Health Checkups",
    desc: "Regular wellness programs for employees.",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    points: ["Annual checkups", "Chronic care", "Preventive care"],
  },
  {
    title: "Mental Health Support",
    desc: "Professional counseling & stress management.",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56",
    points: ["Counseling", "Stress management", "Wellness programs"],
  },
  {
    title: "Occupational Health",
    desc: "Industry-specific health solutions.",
    img: "https://images.unsplash.com/photo-1657028310103-f53dd49a856a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2NjdXBhdGlvbmFsJTIwaGVhbHRoJTIwZm9yJTIwY2xpbmljfGVufDB8fDB8fHww",
    points: ["Safety audits", "Ergonomics", "Injury prevention"],
  },
];
