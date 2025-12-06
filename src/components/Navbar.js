import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToElement, getActiveSection } from '../utils/scroll';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  const sectionIds = ['home', 'about', 'services', 'contact'];
  const isOrderPage = location.pathname === '/order';

  // Add shadow to navbar on scroll and track active section
  useEffect(() => {
    // Only track sections if we're on the home page
    if (isOrderPage) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const active = getActiveSection(sectionIds, 100);
      if (active) {
        setActiveSection(active);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOrderPage]);

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    
    // If we're on the order page, navigate to home first, then scroll
    if (isOrderPage) {
      navigate('/');
      // Wait for navigation and DOM update, then scroll
      // Using requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToElement(sectionId, -80, 800, 10);
        });
      });
    } else {
      // We're already on home page, just scroll
      scrollToElement(sectionId, -80, 800);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <div className="navbar-logo">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Kagidha Kappal Logo" />
      </div>

      {/* Navigation Links */}
      <ul className="navbar-menu">
        <li>
          <a
            href="#home"
            onClick={(e) => handleNavClick('home', e)}
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={(e) => handleNavClick('about', e)}
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#services"
            onClick={(e) => handleNavClick('services', e)}
            className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => handleNavClick('contact', e)}
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
