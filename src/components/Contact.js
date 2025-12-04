// src/components/Contact.jsx
import React, { useState } from "react";
import "./Contact.css";
import { send } from "@emailjs/browser";
import { Linkedin, Instagram, Github, Mail } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please provide name, email and message.");
      return;
    }
    setSending(true);

    try {
      await send(
        "service_up8e6co",
        "template_975r8ez",
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: form.message,
        },
        "Pk6Bfm980E5eHf41v"
      );
      alert("Message Sent Successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed… Try Again. Or use WhatsApp link below.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">CONTACT</h2>

      <div className="contact-body">
        <div className="contact-left">
          <h3 className="left-title">Reach Us</h3>

          <div className="icon-list">
            <a href="https://www.linkedin.com/in/jeya-suriya-suriya-852349329/" target="_blank" rel="noopener noreferrer" className="icon-circle"><Linkedin size={28} /></a>

            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kagidhakappal25@gmail.com" target="_blank" rel="noopener noreferrer" className="icon-circle"><Mail size={28} /></a>

            <a href="https://www.instagram.com/jeya_suriya_m_v?igsh=MWc3dzh5a2gzaDJkOQ==" target="_blank" rel="noopener noreferrer" className="icon-circle"><Instagram size={28} /></a>

            <a href="https://github.com/jeya-gif" target="_blank" rel="noopener noreferrer" className="icon-circle"><Github size={28} /></a>
          </div>
        </div>

        <div className="divider"></div>

        <div className="contact-right">
          <h3 className="right-title">Special Queries</h3>

          <form className="query-form" onSubmit={sendEmail}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Your email" type="email" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" />
            <textarea required placeholder="Write your query here..." name="message" value={form.message} onChange={handleChange}></textarea>

            <div style={{display:"flex", gap:12}}>
              <button type="submit" disabled={sending}>{sending ? "Sending..." : "Send Message"}</button>
              <a href="https://wa.me/919994940613" target="_blank" rel="noopener noreferrer" style={{background:"transparent",border:"1px solid rgba(255,255,255,0.06)",color:"white",padding:"12px 16px",borderRadius:10,textDecoration:"none"}}>Send via WhatsApp</a>
            </div>
          </form>
        </div>
      </div>

      <div className="contact-footer">
        <p>© 2025 Kagidha Kappal. All rights reserved.</p>
        <p>Fold your dreams. Make them Float.</p>
      </div>
    </section>
  );
}
