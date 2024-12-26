import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="navbar">
      <div className="logo">FOODLINK</div>
      <nav>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#blog-feed">Blog Feed</a></li>
        </ul>
      </nav>
      <a href="#contact" className="contact-button">Contact</a>
    </header>
  );
};

export default Header;
