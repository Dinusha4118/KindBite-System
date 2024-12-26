import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import logo from "../images/kindbite.png"; // Adjust the path based on your project structure

const Homepage = () => {
  const navigate = useNavigate();

  const goToServices = () => {
    navigate("/services");
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="FoodLink Logo" className="logo-image" />
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><span onClick={goToServices} className="nav-link-button">Services</span></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#blog-feed">Blog Feed</a></li>
          </ul>
        </nav>
        <a href="#contact" className="contact-button">Contact</a>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Waste not, want not</h1>
        <p>Join the fight against food waste</p>
        <button className="hero-button" onClick={goToServices}>View Services</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>About KINDBITE</h2>
            <p>kindbite connects surplus food from restaurants and suppliers with communities in need. Our mission is to reduce food waste while addressing food insecurity.</p>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><span onClick={goToServices} className="nav-link-button">Services</span></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h2>Contact Us</h2>
            <p>Email: support@kindbite.com</p>
            <p>Phone: +9476 456 7893</p>
            <p>Address: 123 Jayanthi Lane, Colombo 08</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 KINDBITE. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
