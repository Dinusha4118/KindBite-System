import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import "./Homepage.css";
import logo from "../images/kindbite.png"; // Adjust the path based on your project structure

const Homepage = () => {
  const navigate = useNavigate();

  const goToServices = () => {
    navigate("/services");
  };

  const goToAbout = () => {
    navigate("/about");
  };

  const goToTeem = () => {
    navigate("/Teempage");
  };

  const goToHow = () => {
    navigate("/HowItWorks");
  };

  const goToAc = () => {
    navigate("/AccountType");
  };

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="homepage"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src={logo} alt="FoodLink Logo" className="logo-image" />
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <span onClick={goToAbout} className="nav-link-button">
                About
              </span>
            </li>
            <li>
              <span onClick={goToServices} className="nav-link-button">
                Services
              </span>
            </li>
            <li>
              <span onClick={goToTeem} className="nav-link-button">
                Teem
              </span>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              <span onClick={goToHow} className="nav-link-button">
                How it works
              </span>
            </li>
            <li>
              <a href="#blog-feed">Blog Feed</a>
            </li>
          </ul>
        </nav>
        <motion.button
          className="singin"
          onClick={goToAc}
          variants={buttonVariants}
          whileHover="hover"
        >
          Select Account Type
        </motion.button>
        <motion.a
          href="#contact"
          className="contact-button"
          variants={buttonVariants}
          whileHover="hover"
        >
          Contact
        </motion.a>
      </header>

      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>Waste not, want not</h1>
        <p>Join the fight against food waste</p>
        <motion.button
          className="hero-button"
          onClick={goToServices}
          variants={buttonVariants}
          whileHover="hover"
        >
          View Services
        </motion.button>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="footer-content">
          <div className="footer-section about">
            <h2>About KINDBITE</h2>
            <p>
              kindbite connects surplus food from restaurants and suppliers with
              communities in need. Our mission is to reduce food waste while
              addressing food insecurity.
            </p>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <span onClick={goToAbout} className="nav-link-button">
                  About
                </span>
              </li>
              <li>
                <span onClick={goToServices} className="nav-link-button">
                  Services
                </span>
              </li>
              <li>
                <span onClick={goToTeem} className="nav-link-button">
                  Teem
                </span>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
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
      </motion.footer>
    </motion.div>
  );
};

export default Homepage;
