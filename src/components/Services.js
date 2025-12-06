import React from "react";
import { useNavigate } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import { useCarousel } from "../hooks/useCarousel";
import { navigateToOrder } from "../utils/navigation";
import "./Services.css";

/**
 * Services component
 * Displays a carousel of service offerings with navigation
 */
export default function Services() {
  const navigate = useNavigate();
  const { currentIndex, next, previous } = useCarousel(servicesData.length, 5000);

  const currentService = servicesData[currentIndex];

  const handleOrderClick = () => {
    navigateToOrder(navigate, currentService.title);
  };

  return (
    <section id="services" className="services-section">
      <h2 className="services-title">SERVICES</h2>

      <div className="carousel-wrapper">
        <button className="nav-btn left" onClick={previous}>‹</button>

        <div className="big-circle">
          <div
            key={currentService.id}
            className="service-bubble clickable"
            onClick={handleOrderClick}
            title="Click to place an order for this service"
          >
            <h3>{currentService.title}</h3>
            <ul>
              {currentService.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <div className="bubble-cta">Place Order →</div>
          </div>
        </div>

        <button className="nav-btn right" onClick={next}>›</button>
      </div>
    </section>
  );
}