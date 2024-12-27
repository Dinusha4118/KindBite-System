import React from "react";
import { useNavigate } from "react-router-dom";
import "../Services/Services.css";
import logo from "../images/kindbite.png"; // Adjust the path based on your project structure


const Teempage = () => {
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate("/");
  };

  const goToAbout = () => {
    navigate("/about");
  };

  const goToServices = () => {
    navigate("/services");
  };
  
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
            <li><span onClick={goToServices} className="nav-link-button">Services</span></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#blog-feed">Blog Feed</a></li>
          </ul>
        </nav>
        <button className="singin" onClick={singin}>SignIn</button>
        <button className="singup" onClick={singout}>SignUp</button>
        <a href="#contact" className="contact-button">Contact</a>
      </header>

      {/* Teem Header */}
      <header className="services-header">
        <h3>Our Mission-Driven network</h3>
        <h1>Connecting food donors with communities</h1>
      </header>

      {/* Services Cards */}
      <div className="services-cards">
        <div className="service-card">
          <img src={require("../images/sanuka.png")} alt="founder" />
          <h3>shamith de silva</h3>
          <p>Founder & CEO</p>
          <p>A passionate advocate for food sustainability, Shamith leads Kindbite's mission with vision and dedication.</p>
          <button className="reed">READ MORE</button>
        </div>
        <div className="service-card">
          <img src={require("../images/sara.png")} alt="OP" />
          <h3>Sakuni Rajapaksha</h3>
          <p>Operations Manager</p>
          <p>Sakuni expertly manages operations, optimizing food distribution for maximum community impact.</p>
          <button className="reed">READ MORE</button>
        </div>
        <div className="service-card">
          <img src={require("../images/wilum.png")} alt="Real-Time Tracking" />
          <h3>Sudesh Siriwardhana</h3>
          <p>Community Engagement Coordinator</p>
          <p>Sudesh fosters community connections, empowering individuals to join the fight against food waste.</p>
          <button className="reed">READ MORE</button>
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

export default Teempage;
