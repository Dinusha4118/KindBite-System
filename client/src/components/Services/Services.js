import React from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css";
import logo from "../images/kindbite.png"; // Adjust the path based on your project structure


const Services = () => {
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate("/");
  };

  const goToAbout = () => {
    navigate("/about");
  };

  const goToTeem = () => {
    navigate("/Teempage");
  }

  const goToHow = () => {
    navigate("/HowItWorks");
  }
  
  const singin = () => {
    navigate("/login")
 }

 const singout= () => {
   navigate("/Register")
 }

  return (
    <div className="services-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
                  <img src={logo} alt="FoodLink Logo" className="logo-image" />
       </div>
        <nav>
          <ul className="nav-links">
            <li><span onClick={goToHomepage} className="nav-link-button">Home</span></li>
            <li><span onClick={goToAbout} className="nav-link-button">About</span></li>
            <li><a href="#services">Services</a></li>
            <li><span onClick={goToTeem} className="nav-link-button">Teem</span></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><span onClick={goToHow} className="nav-link-button">how it work</span></li>
            <li><a href="#blog-feed">Blog Feed</a></li>
          </ul>
        </nav>
        <button className="singin" onClick={singin}>SignIn</button>
        <button className="singup" onClick={singout}>SignUp</button>
        <a href="#contact" className="contact-button">Contact</a>
      </header>

      {/* Services Header */}
      <header className="services-header">
        <h3>Connecting Communities</h3>
        <h1>Bridging the gap between surplus and need</h1>
      </header>

      {/* Services Cards */}
      <div className="services-cards">
        <div className="service-card">
          <img src={require("../images/food-donations.jpg")} alt="Food Donation Platform" />
          <h3>Food donation platform</h3>
          <p>Connect with local food donors and recipients effortlessly.</p>
        </div>
        <div className="service-card">
          <img src={require("../images/volunteer-coordinator.jpg")} alt="Volunteer Coordination" />
          <h3>Volunteer coordination</h3>
          <p>Become a vital part of our logistics network.</p>
        </div>
        <div className="service-card">
          <img src={require("../images/realtime.jpg")} alt="Real-Time Tracking" />
          <h3>Real-Time tracking and analytics</h3>
          <p>Stay informed with our advanced tracking system.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer1">
      <div className="footer-content">
          <div className="footer-section about">
            <h2>About KINDBITE</h2>
            <p>kindbite connects surplus food from restaurants and suppliers with communities in need. Our mission is to reduce food waste while addressing food insecurity.</p>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><span onClick={goToHomepage} className="nav-link-button">Home</span></li>
              <li><span onClick={goToAbout} className="nav-link-button">About</span></li>
              <li><a href="#Services">Services</a></li>
              <li><span onClick={goToTeem} className="nav-link-button">Teem</span></li>
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

export default Services;
