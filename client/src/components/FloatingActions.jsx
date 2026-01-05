import "./FloatingActions.css";

export default function FloatingActions() {
  return (
    <div className="floating-actions">
      {/* WhatsApp */}
      <a
        href="https://api.whatsapp.com/send?phone=6383485665&text=Hi! I want to book an appointment."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
        title="Chat on WhatsApp"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </a>
    </div>
  );
}
