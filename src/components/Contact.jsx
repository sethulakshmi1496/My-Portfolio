import React from "react";
import "./Contact.css";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <section className="contact-section">
        <h2 className="contact-title">Connect With Me</h2>

        <div className="contact-grid">
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <p>sethulakshmi.pydevv@gmail.com</p>
          </div>

          <div className="contact-item">
            <FaLinkedin className="contact-icon" />
            <a
              href="https://www.linkedin.com/in/sethulakshmiks"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.linkedin.com/in/sethulakshmiks
            </a>
          </div>

          <div className="contact-item">
            <FaGithub className="contact-icon" />
            <a
              href="https://github.com/sethulakshmi1496"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/sethulakshmi1496
            </a>
          </div>
        </div>

        <h1 className="contact-name">SETHULAKSHMI K. S.</h1>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <p>© 2025 Sethulakshmi. All rights reserved.</p>
      </footer>
    </>
  );
}
