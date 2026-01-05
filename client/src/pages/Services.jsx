import "./Services.css";

export default function Services() {
  return (
    <div className="services-page">

      {/* HERO */}
      <section className="services-hero">
        <span className="badge">Complete Healthcare Ecosystem</span>
        <h1>
          Hospital Near Me | Complete Healthcare Services
          <span> Right in Your Neighbourhood</span>
        </h1>
        <p>
          Find the best doctors near you in Kochi & across Kerala. Get complete
          medical care from qualified doctors in a modern mini-hospital near you.
        </p>

        <div className="problem-box">
          <h4>The Problem We're Solving</h4>
          <p>
            63% of Indians avoid medical care due to cost & distance.
            Out-of-pocket expenses push millions into poverty every year.
          </p>
        </div>
      </section>

      {/* QUICK SERVICES */}
      <section className="quick-services">
        {[
          ["🩺", "Consultations", "General & specialist doctors"],
          ["🧪", "Lab & Diagnostics", "In-house laboratory"],
          ["🏠", "Home Visits", "Doctors & nurses at home"],
          ["💊", "Pharmacy", "Quality medicines"],
          ["✂️", "Minor Procedures", "In-clinic procedures"],
          ["🛏️", "Bed Spaces", "Emergency observation"],
          ["❤️", "Chronic Care", "Long-term disease care"],
          ["🤝", "Community Outreach", "Preventive programs"],
        ].map((item, i) => (
          <div key={i} className="quick-card">
            <span>{item[0]}</span>
            <h4>{item[1]}</h4>
            <p>{item[2]}</p>
          </div>
        ))}
      </section>

      {/* STATS */}
      <section className="stats">
        <div>👨‍⚕️ <h3>250K+</h3><p>Patients / year</p></div>
        <div>⏱️ <h3>15 min</h3><p>Average consultation</p></div>
        <div>🚑 <h3>24x7</h3><p>Emergency care</p></div>
        <div>⭐ <h3>95%+</h3><p>Patient satisfaction</p></div>
      </section>

      {/* MAIN SERVICES */}
      <section className="service-cards">

        <ServiceCard
          title="Primary Care Consultations"
          img="https://images.unsplash.com/photo-1678940805259-e2be79fa33e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFByaW1hcnklMjBDYXJlJTIwQ29uc3VsdGF0aW9ucyUyMGZvciUyMGNsaW5pY3xlbnwwfHwwfHx8MA%3D%3D"
          problem="Long waiting time & expensive hospital visits"
          solution="Same-day appointments with qualified doctors"
          list={[
            "General Medicine",
            "Fever & infections",
            "Diabetes & BP",
            "Chest & gastric issues",
          ]}
        />

        <ServiceCard
          title="Specialty Care"
          img="https://plus.unsplash.com/premium_photo-1723673095135-427187c5711b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3BlY2lhbHR5JTIwQ2FyZSUyMGZvciUyMGNsaW5pY3xlbnwwfHwwfHx8MA%3D%3D"
          problem="Specialists only available in big hospitals"
          solution="Specialist doctors available at local clinics"
          list={[
            "Pediatrics",
            "Orthopedics",
            "Dermatology",
            "Gynecology",
          ]}
        />

        <ServiceCard
          title="Pediatric & Geriatric Care"
          img="https://plus.unsplash.com/premium_photo-1726783296707-8f213cf18386?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UGVkaWF0cmljJTIwJTI2JTIwR2VyaWF0cmljJTIwQ2FyZSUyMGZvciUyMGNsaW5pY3xlbnwwfHwwfHx8MA%3D%3D"
          problem="Age-specific needs often ignored"
          solution="Dedicated child & elderly care programs"
          list={[
            "Child vaccinations",
            "Growth monitoring",
            "Elderly chronic care",
            "Home follow-ups",
          ]}
        />

        <ServiceCard
          title="Women's Health"
          img="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
          problem="Privacy & access concerns"
          solution="Female doctors & private consultation rooms"
          list={[
            "Pregnancy care",
            "Menstrual issues",
            "Fertility support",
            "Menopause care",
          ]}
        />

        <ServiceCard
          title="Minor Procedures & Injections"
          img="https://images.unsplash.com/photo-1584515933487-779824d29309"
          problem="ER visits for simple procedures"
          solution="Quick in-clinic procedures"
          list={[
            "IV fluids",
            "Wound care",
            "Injections",
            "Emergency first aid",
          ]}
        />

        <ServiceCard
          title="Laboratory & Diagnostics"
          img="https://plus.unsplash.com/premium_photo-1661670234063-bb133eae7b22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFib3JhdG9yeSUyMCUyNiUyMERpYWdub3N0aWNzJTIwZm9yJTIwY2xpbmljfGVufDB8fDB8fHww"
          problem="Multiple lab visits & delayed reports"
          solution="In-house lab with same-day reports"
          list={[
            "Blood tests",
            "Diabetes tests",
            "Thyroid & lipid profile",
            "Home collection",
          ]}
          button
        />

      </section>

    </div>
  );
}

function ServiceCard({ title, img, problem, solution, list, button }) {
  return (
    <div className="service-card">
      <img src={img} alt={title} />
      <h3>{title}</h3>

      <div className="problem">
        <strong>Common Problem:</strong>
        <p>{problem}</p>
      </div>

      <div className="solution">
        <strong>Our Solution:</strong>
        <p>{solution}</p>
      </div>

      <ul>
        {list.map((item, i) => <li key={i}>✔ {item}</li>)}
      </ul>

      {button && <button className="primary-btn">Know More About Our Lab →</button>}
    </div>
  );
}
