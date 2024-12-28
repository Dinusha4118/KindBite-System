import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HowItWorks.css";
import logo from "../images/kindbite.png";

const HowItWorks = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const navigate = useNavigate();

  const handleLearnMoreClick = (content, image) => {
    setPopupContent({ content, image });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const goToHomepage = () => {
    navigate("/");
  };

  const goToServices = () => {
    navigate("/services");
  };

  const goToAbout = () => {
    navigate("/about");
  };

  const goToTeem = () => {
    navigate("/Teempage");
  };

  const goToAc = () => {navigate("/AccountType")}
 

  return (
    <div className="how-it-works-page">
      {/* Header */}
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="FoodLink Logo" className="logo-image" />
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <span onClick={goToHomepage} className="nav-link-button">Home</span>
            </li>
            <li>
              <span onClick={goToAbout} className="nav-link-button">About</span>
            </li>
            <li>
              <span onClick={goToServices} className="nav-link-button">Services</span>
            </li>
            <li>
              <span onClick={goToTeem} className="nav-link-button">Teem</span>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#blog-feed">Blog Feed</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
        <button className="singin" onClick={goToAc}>Select Account Type</button>
        <a href="#contact" className="contact-button">Contact</a>
      </header>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h1 className="title">Empowering food donations made easy</h1>
        <div className="how-it-works-content">
          <div className="how-it-works-item">
            <img
              src={require("../images/food-listing.jpg")}
              alt="Food Listing"
              className="how-it-works-image"
            />
            <h2>Food listing</h2>
            <p>Easily list your surplus food items to help those in need.</p>
            <button
              className="learn-more"
              onClick={() =>
                handleLearnMoreClick(
                  "Food listing helps individuals and organizations share surplus food effectively. With just a few clicks, you can list available items for donation.",
                  require("../images/food-listing.jpg")
                )
              }
            >
              Learn more
            </button>
          </div>
          <div className="how-it-works-item">
            <img
              src={require("../images/requesting-donations.jpg")}
              alt="Requesting Donations"
              className="how-it-works-image"
            />
            <h2>Requesting donations</h2>
            <p>Request food donations seamlessly to meet your needs.</p>
            <button
              className="learn-more"
              onClick={() =>
                handleLearnMoreClick(
                  "Requesting donations allows those in need to connect with food donors effortlessly. Submit a request and get assistance promptly.",
                  require("../images/requesting-donations.jpg")
                )
              }
            >
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClosePopup}>
              &times;
            </button>
            <div className="popup-content">
              <img
                src={popupContent.image}
                alt="Popup"
                className="popup-image"
              />
              <div className="popup-text">
                <h2>Details</h2>
                <p>{popupContent.content}</p>
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>About KINDBITE</h2>
            <p>
              kindbite connects surplus food from restaurants and suppliers
              with communities in need. Our mission is to reduce food waste
              while addressing food insecurity.
            </p>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
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

export default HowItWorks;
