// src/components/OrderForm.jsx
import React, { useState, useEffect } from "react";
import "./OrderForm.css";
import { send } from "@emailjs/browser";

const defaultFields = {
  name: "",
  email: "",
  phone: "",
  service: "",
  subOption: "",
  deadline: "",
  budget: "",
  documentsNeeded: "",
  paymentMethod: "COD",
  message: "",
};

export default function OrderForm() {
  const [form, setForm] = useState(defaultFields);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const svc = params.get("service");
    if (svc) setForm((f) => ({ ...f, service: decodeURIComponent(svc) }));
  }, []);

  /* ✅ ALL SERVICES / PACKAGES (NO DEPARTMENTS HERE) */
  const subOptions = [
    // Mini Projects
    "Python Mini Projects",
    "AI / ML Mini Projects",
    "IoT Mini Projects",
    "Web Development Mini Projects",
    "AR / VR Unity Mini Projects",

    // Final Year Projects
    "Final Year Project (Complete)",
    "Final Year Project + Documentation",
    "Final Year Project + PPT & Viva",
    "Final Year Project + Deployment",

    // Document Services
    "Resume Building",
    "Portfolio Creation",
    "Mini Project Report",
    "Final Year Project Report",
    "IEEE Paper Formatting",

    // Design Services
    "Logo Designing",
    "Poster / Banner Designing",
    "College Event Poster Kit",
    "Business Card Design",
    "Brochure / Flyer Design",

    // Website & App Services
    "Personal Portfolio Website",
    "Business Website",
    "E-commerce Mini Website",
    "Landing Page Website",
    "Simple Android App",

    // Tech Support Services
    "Domain Setup",
    "Hosting Setup",
    "GitHub Upload",
    "Cloud Deployment",
    "Website Bug Fixing",

    // Packages
    "Student Starter Package (Resume + Portfolio + Mini Project)",
    "Final Year Package (Project + Report + PPT + Viva)",
    "Design Package (Logo + Poster + ID Card + Brochure)",
    "Developer Package (Website + App + Deployment)",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    return form.name && form.email && form.phone && form.service;
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validate()) {
      alert("Please fill Name, Email, Phone and Department.");
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
          service: form.service,
          sub_option: form.subOption,
          deadline: form.deadline,
          budget: form.budget,
          documents_needed: form.documentsNeeded,
          payment_method: form.paymentMethod,
          message: form.message,
        },
        "Pk6Bfm980E5eHf41v"
      );

      alert("Order sent successfully!");
      setForm(defaultFields);
    } catch (error) {
      alert("Failed to send order. Please try WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const makeWhatsAppLink = () => {
    const text = `
📌 New Order Request

Department: ${form.service}
Service / Package: ${form.subOption || "-"}
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Budget: ${form.budget || "-"}
Deadline: ${form.deadline || "-"}
Documents: ${form.documentsNeeded || "-"}
Payment: ${form.paymentMethod}

Message:
${form.message || "-"}
    `;
    return `https://wa.me/919994940613?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="order-section">
      <div className="order-card">
        <h2 className="order-title">Place Your Order</h2>

        <form className="order-form" onSubmit={sendEmail}>
          <input
            name="name"
            placeholder="Your Full Name *"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={handleChange}
            required
          />

          {/* ✅ DEPARTMENT SELECT */}
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            required
          >
            <option value="">Select Department *</option>
            <option value="AI & DATA SCIENCE">AI & DATA SCIENCE</option>
            <option value="CSE / IT / EEE / ECE">CSE / IT / EEE / ECE</option>
            <option value="MECHANICAL / CIVIL">MECHANICAL / CIVIL</option>
            <option value="B.SC / BCA">B.SC / BCA</option>
          </select>

          {/* ✅ ALL SERVICES / PACKAGES */}
          <select
            name="subOption"
            value={form.subOption}
            onChange={handleChange}
          >
            <option value="">Select Service / Package</option>
            {subOptions.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <input
            name="deadline"
            placeholder="Deadline (date / weeks)"
            value={form.deadline}
            onChange={handleChange}
          />

          <input
            name="budget"
            placeholder="Budget (e.g. 3000 INR)"
            value={form.budget}
            onChange={handleChange}
          />

          <input
            name="documentsNeeded"
            placeholder="Documents / Files needed"
            value={form.documentsNeeded}
            onChange={handleChange}
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Online">Online Payment</option>
          </select>

          <textarea
            name="message"
            placeholder="Additional Requirements"
            rows="4"
            value={form.message}
            onChange={handleChange}
          />

          <div className="form-actions">
            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Order (Email)"}
            </button>

            <a
              className="whatsapp-btn"
              href={makeWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send via WhatsApp
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
