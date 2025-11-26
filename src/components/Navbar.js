import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  // Add shadow to navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <div className="navbar-logo">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Kagidha Kappal Logo" />
      </div>

      {/* Navigation Links */}
      <ul className="navbar-menu">
        <li>
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={800}
            offset={-80}
            className="nav-link"
            activeClass="active"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={800}
            offset={-80}
            className="nav-link"
            activeClass="active"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="services"
            spy={true}
            smooth={true}
            duration={800}
            offset={-80}
            className="nav-link"
            activeClass="active"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            duration={800}
            offset={-80}
            className="nav-link"
            activeClass="active"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
