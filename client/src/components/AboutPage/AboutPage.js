import React from "react";
import "./Homepage.css"; // Reuse your existing CSS
import { useNavigate } from "react-router-dom";
import logo from "../images/kindbite.png"; // Adjust the path based on your project structure


const AboutPage = () => {
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate("/");
  };

  const goToServices = () => {
    navigate("/services");
  };

  return (
    <div className="about-page">
      {/* Header */}
      <header className="navbar">
        <div className="logo">
                  <img src={logo} alt="FoodLink Logo" className="logo-image" />
        </div>
        <nav>
          <ul className="nav-links">
            <li><span onClick={goToHomepage} className="nav-link-button">Home</span></li>
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

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>Reduce waste, feed the hungry</h2>
          <p>
            FoodLink is a dynamic platform based in Gampaha, LK, dedicated to reducing food waste and fighting food insecurity.
            We connect food donors such as restaurants, supermarkets, and event organizers with volunteers and communities in need.
            Our platform allows donors to easily list surplus food, while recipients can request donations. Volunteers play a vital role
            in facilitating logistics. With real-time notifications, donation tracking, and valuable analytics, FoodLink ensures food distribution is
            efficient, impactful, and sustainable.
          </p>
          <a href="#contact" className="about-button">Get in touch</a>
        </div>
        <div className="about-image">
          <img src={require("../images/about.png")} alt="Food Donation Box" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>About KINDBITE</h2>
            <p>Kindbite connects surplus food from restaurants and suppliers with communities in need. Our mission is to reduce food waste while addressing food insecurity.</p>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><span onClick={goToHomepage} className="nav-link-button">Home</span></li>
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

export default AboutPage;
