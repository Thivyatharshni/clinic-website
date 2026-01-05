import "./HealthInsurance.css";

export default function HealthInsurance() {
  const handleCalculatePremium = () => {
    // Simple calculation logic
    alert('Premium calculation feature coming soon! Contact us for personalized quotes.');
  };

  const handleGetQuote = () => {
    const message = 'Hi, I need a detailed health insurance quote. Please contact me.';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=916383485665&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFreeQuote = () => {
    const message = 'Hello, I would like to get a free health insurance quote.';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=916383485665&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallExpert = () => {
    window.location.href = 'tel:+919061236888';
  };

  const handlePartnerClick = (partnerName) => {
    const message = `Hi, I'm interested in ${partnerName} health insurance plans.`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=916383485665&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');n
  };

  const plans = [
    {
      title: "Cashless Health Insurance",
      desc: "Hassle-free cashless treatment across our clinic network.",
      img: "https://plus.unsplash.com/premium_photo-1661375173523-e53501f99674?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FzaGxlc3MlMjBIZWFsdGglMjBJbnN1cmFuY2V8ZW58MHx8MHx8fDA%3D",
      points: [
        "Instant claim approval",
        "No upfront payment",
        "Partnered insurance providers",
      ],
    },
    {
      title: "OPD Insurance Coverage",
      desc: "Affordable OPD consultation and diagnostic coverage.",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
      points: [
        "Doctor consultations",
        "Lab tests included",
        "Prescription benefits",
      ],
    },
    {
      title: "Family Health Insurance",
      desc: "Complete healthcare protection for your entire family.",
      img: "https://images.unsplash.com/photo-1758691463331-2ac00e6f676f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RmFtaWx5JTIwSGVhbHRoJTIwSW5zdXJhbmNlfGVufDB8fDB8fHww",
      points: [
        "Parents & children covered",
        "Preventive health checkups",
        "Flexible premium options",
      ],
    },
    {
      title: "Corporate Insurance Tie-Ups",
      desc: "Customized insurance plans for corporate employees.",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
      points: [
        "Employee wellness programs",
        "Annual health screenings",
        "Dedicated support team",
      ],
    },
  ];

  const stats = [
    { number: "500K+", label: "Claims Processed", icon: "📋" },
    { number: "98%", label: "Approval Rate", icon: "✅" },
    { number: "24/7", label: "Support Available", icon: "🕐" },
  ];

  const partners = [
    "Star Health", "HDFC Ergo", "ICICI Lombard", "Bajaj Allianz",
    "Reliance Health", "Max Bupa", "Apollo Munich", "New India Assurance"
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "IT Professional",
      message: "Cashless treatment saved me ₹50,000 during my surgery. Excellent service!",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Priya Sharma",
      role: "Teacher",
      message: "Family coverage at affordable rates. My kids' vaccinations were fully covered.",
      rating: 5,
      avatar: "👩‍🏫"
    },
    {
      name: "Amit Patel",
      role: "Business Owner",
      message: "Corporate tie-up made healthcare accessible for all our employees.",
      rating: 5,
      avatar: "👨‍💼"
    }
  ];

  return (
    <div className="insurance-page">

      {/* ENHANCED HERO */}
      <section className="insurance-hero">
        <div className="hero-content">
          <span className="hero-badge">🛡️ Health Insurance Services</span>
          <h1>Secure Your Health Future</h1>
          <p>
            We partner with leading insurance providers to offer seamless,
            affordable, and reliable healthcare coverage for individuals,
            families, and organizations.
          </p>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="hero-animations">
          <div className="floating-shield">🛡️</div>
          <div className="floating-heart">❤️</div>
          <div className="floating-stethoscope">🩺</div>
          <div className="floating-cross">✚</div>
        </div>
      </section>

      {/* INSURANCE CALCULATOR */}
      <section className="calculator-section">
        <h2>💰 Estimate Your Premium</h2>
        <p>Quick premium calculator for personalized health insurance quotes</p>

        <div className="calculator-container">
          <div className="calculator-form">
            <div className="form-group">
              <label>👤 Age Group</label>
              <select>
                <option>18-25 years</option>
                <option>26-35 years</option>
                <option>36-45 years</option>
                <option>46-55 years</option>
                <option>56-65 years</option>
                <option>65+ years</option>
              </select>
            </div>

            <div className="form-group">
              <label>👨‍👩‍👧‍👦 Coverage Type</label>
              <select>
                <option>Individual</option>
                <option>Family (2 members)</option>
                <option>Family (4 members)</option>
                <option>Corporate Group</option>
              </select>
            </div>

            <div className="form-group">
              <label>🏥 Sum Insured</label>
              <select>
                <option>₹2,00,000</option>
                <option>₹5,00,000</option>
                <option>₹10,00,000</option>
                <option>₹25,00,000</option>
                <option>₹50,00,000</option>
              </select>
            </div>

            <button className="calculate-btn" onClick={handleCalculatePremium}>Calculate Premium →</button>
          </div>

          <div className="calculator-result">
            <div className="result-card">
              <h3>Estimated Monthly Premium</h3>
              <div className="premium-amount">₹1,250</div>
              <p>Starting from ₹999/month</p>
              <button className="get-quote-btn" onClick={handleGetQuote}>Get Detailed Quote</button>
            </div>
          </div>
        </div>
      </section>

      {/* CLAIMS PROCESS */}
      <section className="claims-section">
        <h2>🔄 Simple Claims Process</h2>
        <p>How to file and get your insurance claims approved</p>

        <div className="claims-timeline">
          <div className="timeline-step">
            <div className="step-number">1</div>
            <h4>Visit Our Clinic</h4>
            <p>Come to any of our partnered clinics for treatment</p>
          </div>

          <div className="timeline-arrow">→</div>

          <div className="timeline-step">
            <div className="step-number">2</div>
            <h4>Show Insurance Card</h4>
            <p>Present your insurance card at reception</p>
          </div>

          <div className="timeline-arrow">→</div>

          <div className="timeline-step">
            <div className="step-number">3</div>
            <h4>Cashless Treatment</h4>
            <p>Get treatment without paying upfront</p>
          </div>

          <div className="timeline-arrow">→</div>

          <div className="timeline-step">
            <div className="step-number">4</div>
            <h4>Claim Processed</h4>
            <p>Insurance company settles directly with clinic</p>
          </div>
        </div>
      </section>

      {/* INSURANCE PLANS */}
      <section className="plans-section">
        <h2>🛡️ Our Insurance Plans</h2>
        <p>Comprehensive coverage options tailored for your healthcare needs</p>

        <div className="insurance-grid">
          {plans.map((plan, index) => (
            <div className="insurance-card" key={index}>
              <img src={plan.img} alt={plan.title} loading="lazy" />

              <h3>{plan.title}</h3>
              <p className="insurance-desc">{plan.desc}</p>

              <ul>
                {plan.points.map((point, i) => (
                  <li key={i}>✔ {point}</li>
                ))}
              </ul>

              <button className="insurance-btn" onClick={() => handleGetQuote()}>Know More</button>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="partners-section">
        <h2>🤝 Our Insurance Partners</h2>
        <p>Trusted partnerships with leading insurance companies</p>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-card" onClick={() => handlePartnerClick(partner)}>
              <div className="partner-logo">🏢</div>
              <h4>{partner}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <h2>⭐ What Our Customers Say</h2>
        <p>Real experiences from satisfied health insurance customers</p>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">{testimonial.avatar}</div>
                <div>
                  <h4>{testimonial.name}</h4>
                  <p className="role">{testimonial.role}</p>
                </div>
              </div>
              <div className="rating">
                {"★".repeat(testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.message}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <h2>❓ Frequently Asked Questions</h2>

        <div className="faq-container">
          <div className="faq-item">
            <h4>💰 How much does health insurance cost?</h4>
            <p>Premiums start from ₹999/month depending on coverage amount and family size.</p>
          </div>

          <div className="faq-item">
            <h4>⏰ How long does claim approval take?</h4>
            <p>Cashless claims are approved within 30 minutes during clinic hours.</p>
          </div>

          <div className="faq-item">
            <h4>🏥 Which hospitals are covered?</h4>
            <p>All our clinic locations and 1000+ network hospitals across India.</p>
          </div>

          <div className="faq-item">
            <h4>📋 What documents are needed for claims?</h4>
            <p>Just your insurance card and ID proof. We handle the rest.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="insurance-cta">
        <h2>Ready to Secure Your Health?</h2>
        <p>Get personalized insurance quotes and expert guidance</p>

        <div className="cta-buttons">
          <button className="cta-primary" onClick={handleFreeQuote}>Get Free Quote</button>
          <button className="cta-secondary" onClick={handleCallExpert}>Call Insurance Expert</button>
        </div>
      </section>

    </div>
  );
}
