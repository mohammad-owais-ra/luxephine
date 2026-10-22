"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [sent, setSent] = useState(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setSent(false);
      formRef.current?.reset();
    }, 3000);
  }

  return (
    <form className="contact-form" id="contactForm" ref={formRef} onSubmit={onSubmit}>
      <div className="form-group">
        <input type="text" id="name" placeholder="Your Name" required />
        <span className="form-line"></span>
      </div>
      <div className="form-group">
        <input type="email" id="email" placeholder="Email Address" required />
        <span className="form-line"></span>
      </div>
      <div className="form-group">
        <textarea id="message" placeholder="Your Message" rows={4} required></textarea>
        <span className="form-line"></span>
      </div>
      <button
        type="submit"
        className="btn-primary"
        style={sent ? { background: "transparent", color: "#E8C87E" } : undefined}
      >
        {sent ? "Sent ✓" : "Send Inquiry"}
      </button>
    </form>
  );
}
