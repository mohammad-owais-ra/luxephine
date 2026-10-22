import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-header reveal">
        <span className="section-overline">Concierge</span>
        <h2 className="section-title">Begin Your Journey</h2>
        <div className="section-divider"><span></span></div>
        <p className="section-desc">
          We invite you to experience the world of LUXEPHINE. Our connoisseurs await to guide you.
        </p>
      </div>
      <div className="contact-layout reveal">
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">✉</span>
            <div>
              <h4>Private Inquiries</h4>
              <a href="mailto:concierge@luxephine.com">contact@luxephine.com</a>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">✆</span>
            <div>
              <h4>Phone</h4>
              <a href="tel:+33123456789">+33 1 23 45 67 89</a>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">◈</span>
            <div>
              <h4>Replies within</h4>
              <p>24 hours</p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
