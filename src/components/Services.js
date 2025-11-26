import React, { useState, useEffect } from "react";
import "./Services.css";

const servicesData = [
  {
    title: "Academic Writing Services",
    points: [
      "Leave Letter Creation",
      "College Report Writing",
      "Project Documentation",
      "Assignment Writing",
    ],
  },
  {
    title: "Portfolio & Resume Services",
    points: [
      "Resume Building",
      "Portfolio Website Creation",
      "LinkedIn Profile Setup",
    ],
  },
  {
    title: "Mini Project Development",
    points: [
      "Python Mini Projects",
      "Machine Learning Mini Projects",
      "Unity/AR Demo Projects",
      "Web Mini Projects (HTML/CSS/JS)",
    ],
  },
  {
    title: "Design & Presentation",
    points: [
      "PowerPoint Creation",
      "Poster Design",
      "Template Design",
    ],
  },
  {
    title: "Technical Support",
    points: [
      "GitHub Setup",
      "Website Hosting Help",
      "Debugging & Project Fixing",
    ],
  },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextService = () => {
    setCurrentIndex((prev) => (prev + 1) % servicesData.length);
  };

  const prevService = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? servicesData.length - 1 : prev - 1
    );
  };

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextService();
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="services" className="services-section">
      <h2 className="services-title">SERVICES</h2>

      <div className="carousel-wrapper">
        <button className="nav-btn left" onClick={prevService}>‹</button>

        <div className="big-circle">
          <div key={currentIndex} className="service-bubble">
            <h3>{servicesData[currentIndex].title}</h3>
            <ul>
              {servicesData[currentIndex].points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <button className="nav-btn right" onClick={nextService}>›</button>
      </div>
    </section>
  );
}
