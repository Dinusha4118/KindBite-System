import React from "react";
import { useNavigate } from "react-router-dom";
import "./accountType.css";
import logo from "../images/kindbite.png"; // Adjust the path based on your project structure


const AccountType = () => {
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
    navigate("/SignIn")
 }

 const singin1 = () => {
    navigate("/login")
 }

 const singout = () => {
    navigate("/SignUp")
 }

 const singout1 = () => {
    navigate("/Register")
 }

 const singToIn = () => {
  navigate("/recipient-signin")
}

const singToUp = () => {
  navigate("/recipient-signup")
}
 

  return (
    <div className="ac-page">
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
        <button className="singin" onClick={singin}>Select Account Type</button>
        <a href="#contact" className="contact-button">Contact</a>
      </header>

      {/* Services Header */}
      <header className="ac-header">
        <h3>Connecting Communities</h3>
        <h1>Register or SignIn Your Account</h1>
      </header>

      {/* Services Cards */}
      <div className="ac-cards">
        <div className="ac-card">
          <img src={require("../images/vola.jpg")} alt="Food Donation Platform" />
          <h3>Donor Account Type</h3>
          <button className="singin1" onClick={singin}>SignIn</button>
          <button className="singin1" onClick={singout}>SignUp</button>
        </div>
        <div className="ac-card">
          <img src={require("../images/dele.jpg")} alt="Volunteer Coordination" />
          <h3>Volunteer Account Type</h3>
          <button className="singin1" onClick={singin1}>SignIn</button>
          <button className="singin1" onClick={singout1}>SignUp</button>
        </div>
        <div className="ac-card">
          <img src={require("../images/NGO.jpeg")} alt="Real-Time Tracking" />
          <h3>Recipient Account Type</h3>
          <button className="singin1" onClick={singToIn}>SignIn</button>
          <button className="singin1" onClick={singToUp}>SignUp</button>
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

export default AccountType;
