// src/components/OrderForm.jsx
import React, { useState, useEffect } from "react";
import "./OrderForm.css";
import { send } from "@emailjs/browser";
import { Phone, Mail, CheckSquare } from "lucide-react";

const defaultFields = {
  name: "",
  email: "",
  phone: "",
  deadline: "",
  budget: "",
  documentsNeeded: "",
  paymentMethod: "COD",
  message: "",
  service: "",
  subOption: "",
};

export default function OrderForm() {
  const [form, setForm] = useState(defaultFields);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // parse service from URL
    const params = new URLSearchParams(window.location.search);
    const svc = params.get("service");
    if (svc) setForm((f) => ({ ...f, service: decodeURIComponent(svc) }));
  }, []);

  // Option lists (you can expand or map more complex ones)
  const subOptionsMap = {
    "Mini Projects (All Departments)": [
      "Python mini projects",
      "AI/ML models",
      "IoT prototypes",
      "AR/VR Unity demos",
      "Web mini projects",
    ],
    "Final Year Projects (B.E / B.Tech / Arts / Diploma)": [
      "AI & Data Science",
      "CSE / IT / ECE / EEE",
      "Mechanical / Civil",
      "B.Sc / BCA",
    ],
    "Document Services (Fast, Easy & High Profit)": [
      "Portfolio creation",
      "Resume building",
      "Mini project report",
      "Final year project report",
    ],
    "Design Services": [
      "Logo designing",
      "Poster / banner designing",
      "College event poster kits",
      "Business card",
    ],
    "Website & App Services": [
      "Personal portfolio website",
      "Business website",
      "E-commerce mini website",
      "Simple Android app",
    ],
    "Tech Support Services": [
      "Hosting setup",
      "Domain setup",
      "GitHub upload",
      "Cloud deployment",
    ],
    "Student Starter Package": ["Portfolio", "Resume", "Mini project", "Report"],
    "Final Year Package": ["Project", "Documentation", "PPT + Viva", "Deployment"],
    "Design Package": ["Logo", "Poster", "ID card", "Brochure"],
    "Developer Package": ["Website", "App", "Deployment", "Domain + Hosting"],
  };

  const currentOptions =
    subOptionsMap[form.service] || Object.values(subOptionsMap).flat();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.service) return false;
    return true;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!validate()) {
      alert("Please fill name, email, phone and service.");
      return;
    }
    setSending(true);

    const templateParams = {
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
    };

    try {
      // Replace with your EmailJS service/template/user IDs (setup steps below)
      await send(
        "service_up8e6co", // <-- service ID
        "template_975r8ez", // <-- template ID
        templateParams,
        "Pk6Bfm980E5eHf41v" // <-- public key (user id)
      );
      alert("Order sent successfully! We will contact you soon.");
      setForm(defaultFields);
    } catch (err) {
      console.error("Email send error:", err);
      alert(
        "Failed to send order via email. The WhatsApp option is available below. Also check EmailJS configuration."
      );
    } finally {
      setSending(false);
    }
  };

  const makeWhatsAppLink = () => {
    const text = `Hi, I want to place an order.
Service: ${form.service}
Sub-option: ${form.subOption || "-"}
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Budget: ${form.budget || "-"}
Deadline: ${form.deadline || "-"}
Docs needed: ${form.documentsNeeded || "-"}
Payment: ${form.paymentMethod}
Message: ${form.message || "-"}

Please contact me.`;
    const phone = "919994940613x"; // replace with your receiving WhatsApp number (with country code, no +)
    return `https://wa.me/919994940613?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="order-section">
      <div className="order-card">
        <h2 className="order-title">Place Your Order</h2>
        <p className="order-sub">Service: <strong>{form.service || "Choose from Services"}</strong></p>

        <form className="order-form" onSubmit={sendEmail}>
          <label>
            Your full name *
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label>
            Email *
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Phone *
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </label>

          <label>
            Select Service
            <input name="service" value={form.service} onChange={handleChange} />
          </label>

          <label>
            Sub-option / Package
            <select name="subOption" value={form.subOption} onChange={handleChange}>
              <option value="">-- Select --</option>
              {currentOptions.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </label>

          <div className="row">
            <label>
              Deadline
              <input name="deadline" value={form.deadline} onChange={handleChange} placeholder="YYYY-MM-DD or weeks" />
            </label>

            <label>
              Budget
              <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. 3000 INR" />
            </label>
          </div>

          <label>
            Needed record / documents for this project?
            <input name="documentsNeeded" value={form.documentsNeeded} onChange={handleChange} placeholder="Files, repo links etc." />
          </label>

          <label>
            Payment method
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              <option value="COD">COD</option>
              <option value="Online">Online Payment</option>
            </select>
          </label>

          <label>
            Message / Requirements
            <textarea name="message" value={form.message} onChange={handleChange} rows="5" />
          </label>

          <div className="form-actions">
            <button type="submit" disabled={sending}>{sending ? "Sending..." : "Send Order (Email)"}</button>

            <a className="whatsapp-btn" href={makeWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              Send via WhatsApp
            </a>
          </div>
        </form>

        <p className="note">We will reply to email or WhatsApp. Choose your preferred method.</p>
      </div>
    </section>
  );
}
