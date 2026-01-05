import "./CentralLab.css";

export default function CentralLab() {
  const handleBookPackage = (packageName, price) => {
    console.log('Booking package:', packageName, 'Price:', price);
    const message = `Book ${packageName} (₹${price})`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=916383485665&text=${encodeURIComponent(message)}`;
    console.log('WhatsApp URL:', whatsappUrl);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="central-lab-page">

      {/* HERO */}
      <section className="lab-hero">
        <span className="lab-badge">🔬 Central Laboratory Services</span>
        <h1>
          Where Precision Meets <span>Trust</span>
        </h1>
        <p>
          Fully digitized and automated diagnostics delivering same-day,
          accurate reports for your family’s health.
        </p>

        <div className="lab-feature-row">
          <div className="lab-feature">🏅<h4>Fully Automated</h4><p>International standards</p></div>
          <div className="lab-feature">⏱️<h4>Same Day Reports</h4><p>WhatsApp delivery</p></div>
          <div className="lab-feature">🏠<h4>Home Collection</h4><p>Doorstep sample pickup</p></div>
          <div className="lab-feature">🧪<h4>500+ Tests</h4><p>Complete diagnostics</p></div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="lab-section">
        <h2>Health Packages That Care</h2>
        <p className="section-subtitle">
          Prevention-focused health plans for every stage of life
        </p>

        <div className="package-grid">
          <div className="package-card highlight">
            <span className="tag">Most Popular</span>
            <h3>Essential Health Checkup</h3>
            <h4>₹999</h4>
            <ul>
              <li>✔ CBC</li>
              <li>✔ Lipid Profile</li>
              <li>✔ Blood Sugar</li>
              <li>✔ Kidney Function</li>
              <li>✔ Liver Function</li>
            </ul>
            <button
              className="btn-primary"
              onClick={() => handleBookPackage("Essential Health Checkup", "999")}
            >
              Book Now
            </button>
          </div>

          <div className="package-card">
            <h3>Women’s Wellness</h3>
            <h4>₹1,299</h4>
            <ul>
              <li>✔ Thyroid</li>
              <li>✔ Iron Studies</li>
              <li>✔ Vitamin D & B12</li>
              <li>✔ Hormonal Panel</li>
            </ul>
            <button
              className="btn-outline"
              onClick={() => handleBookPackage("Women's Wellness Package", "1,299")}
            >
              Book Now
            </button>
          </div>

          <div className="package-card">
            <h3>Senior Citizen Care</h3>
            <h4>₹1,599</h4>
            <ul>
              <li>✔ Diabetes Panel</li>
              <li>✔ Cardiac Risk</li>
              <li>✔ Bone Health</li>
              <li>✔ Cancer Markers</li>
            </ul>
            <button
              className="btn-outline"
              onClick={() => handleBookPackage("Senior Citizen Care Package", "1,599")}
            >
              Book Now
            </button>
          </div>

          <div className="package-card">
            <h3>Child Health Package</h3>
            <h4>₹699</h4>
            <ul>
              <li>✔ Growth Markers</li>
              <li>✔ Immunity Check</li>
              <li>✔ Allergy Panel</li>
            </ul>
            <button
              className="btn-outline"
              onClick={() => handleBookPackage("Child Health Package", "699")}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* TESTS */}
      <section className="lab-section light-bg">
        <h2>Specialized Testing Services</h2>

        <div className="test-grid">
          {[
            ["❤️ Cardiac Care", "ECG, Stress Tests"],
            ["🧠 Neurology", "EEG & Cognitive Tests"],
            ["👁️ Eye Care", "Vision & Retinopathy"],
            ["🤰 Pregnancy Care", "Prenatal Screening"],
            ["🩸 Diabetes", "HbA1c Monitoring"],
            ["🛡️ Immunity Tests", "Allergy & Titer"],
          ].map((item, i) => (
            <div key={i} className="test-card">
              <h4>{item[0]}</h4>
              <p>{item[1]}</p>
              <span>Learn More →</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lab-cta">
        <h2>Book Your Lab Test Today</h2>
        <p>
          Safe sample collection, fast reports, and expert diagnostics.
        </p>
      
        <div className="cta-row">
          <a href="/book" className="btn-primary">📅 Book Collection</a>
          <a href="/locations" className="btn-outline">📍 Find Lab</a>
          <a href="tel:+919061236888" className="btn-call">📞 Call Support</a>
        </div>

        <small>
          Lab Helpline: +91 90612 36888 | Collection Hours: 6 AM – 10 PM
        </small>
      </section>

    </div>
  );
}
