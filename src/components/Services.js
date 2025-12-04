// src/components/Services.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- only change
import "./Services.css";
const servicesData = [
  {
    id: "mini-projects",
    title: "Mini Projects",
    points: [
      "Python mini projects",
      "AI/ML models",
      "IoT simple prototypes",
      "AR/VR Unity demos",
      "Web mini projects",
      "Mobile app mini projects",
      "Database projects",
    ],
  },
  {
    id: "final-year",
    title: "Final Year Projects",
    points: ["B.E / B.Tech / Arts / Diploma", "CSE / IT / ECE / EEE", "Mechanical / Civil", "B.Sc / BCA"],
  },
  {
    id: "document-services",
    title: "Document Services",
    points: ["Portfolio creation", "Resume building", "Mini project report", "Final year project report", "Research paper writing"],
  },
  {
    id: "design-services",
    title: "Design Services",
    points: ["Logo designing", "Poster / banner designing", "College event poster kits", "Business card"],
  },
  {
    id: "web-app-services",
    title: "Website & App Services",
    points: ["Personal portfolio website", "Business website", "E-commerce mini website", "Blog website", "Simple Android app"],
  },
  {
    id: "tech-support",
    title: "Tech Support Services",
    points: ["Hosting setup", "Domain setup", "GitHub project upload", "Cloud deployment"],
  },
  {
    id: "student-starter",
    title: "Student Starter Package",
    points: ["Portfolio", "Resume", "Mini project", "Mini project report"],
  },
  {
    id: "final-year-package",
    title: "Final Year Package",
    points: ["Final year project", "Full documentation", "PPT + Viva questions", "Deployment"],
  },
  {
    id: "design-package",
    title: "Design Package",
    points: ["Logo", "Poster", "ID card design", "Brochure"],
  },
  {
    id: "developer-package",
    title: "Developer Package",
    points: ["Website", "App", "Deployment", "Domain + hosting setup"],
  },
];
export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // <-- new

  const nextService = () => setCurrentIndex((prev) => (prev + 1) % servicesData.length);
  const prevService = () =>
    setCurrentIndex((prev) => (prev === 0 ? servicesData.length - 1 : prev - 1));

  // Autoplay
  useEffect(() => {
    const interval = setInterval(nextService, 5000);
    return () => clearInterval(interval);
  }, []);

  // Navigate to order page using React Router (no reload)
  const goToOrder = (service) => {
    const encoded = encodeURIComponent(service);
    navigate(`/order?service=${encoded}`); // <-- only change from window.location.href
  };

  return (
    <section id="services" className="services-section">
      <h2 className="services-title">SERVICES</h2>

      <div className="carousel-wrapper">
        <button className="nav-btn left" onClick={prevService}>‹</button>

        <div className="big-circle">
          <div
            key={servicesData[currentIndex].id}
            className="service-bubble clickable"
            onClick={() => goToOrder(servicesData[currentIndex].title)}
            title="Click to place an order for this service"
          >
            <h3>{servicesData[currentIndex].title}</h3>
            <ul>
              {servicesData[currentIndex].points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <div className="bubble-cta">Place Order →</div>
          </div>
        </div>

        <button className="nav-btn right" onClick={nextService}>›</button>
      </div>
    </section>
  );
}