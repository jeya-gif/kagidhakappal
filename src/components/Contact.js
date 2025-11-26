import React, { useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";

// Importing Logos from lucide-react
import { Linkedin, Instagram, Github, Mail } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ message: "" });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_xxxxxx",
        "template_xxxxxx",
        { message: form.message },
        "public_key_xxxxxx"
      )
      .then(
        () => alert("Message Sent Successfully!"),
        () => alert("Failed… Try Again.")
      );
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">CONTACT</h2>

      <div className="contact-body">
        
        {/* LEFT SIDE — SOCIAL ICONS */}
        <div className="contact-left">
          <h3 className="left-title">Reach Us</h3>

          <div className="icon-list">

            {/* LINKEDIN — FULLY WORKING */}
            <a
              href="https://www.linkedin.com/in/jeya-suriya-suriya-852349329/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-circle"
            >
              <Linkedin size={28} />
            </a>

            {/* GMAIL — OPENS COMPOSE WINDOW */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=kagidhakappal25@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-circle"
            >
              <Mail size={28} />
            </a>

            {/* INSTAGRAM — FULL PROFILE */}
            <a
              href="https://www.instagram.com/jeya_suriya_m_v?igsh=MWc3dzh5a2gzaDJkOQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="icon-circle"
            >
              <Instagram size={28} />
            </a>

            {/* GITHUB — CORRECT USERNAME */}
            <a
              href="https://github.com/jeya-gif"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-circle"
            >
              <Github size={28} />
            </a>

          </div>
        </div>

        {/* MIDDLE LINE */}
        <div className="divider"></div>

        {/* RIGHT SIDE — QUERY BOX */}
        <div className="contact-right">
          <h3 className="right-title">Special Queries</h3>

          <form className="query-form" onSubmit={sendEmail}>
            <textarea
              required
              placeholder="Write your query here..."
              value={form.message}
              onChange={(e) => setForm({ message: e.target.value })}
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <div className="contact-footer">
        <p>© 2025 Kagidha Kappal. All rights reserved.</p>
        <p>Fold your dreams. Make them Float.</p>
      </div>
    </section>
  );
}
