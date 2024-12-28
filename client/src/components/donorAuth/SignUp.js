import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Auth.css';

//npm install framer-motion axios <- install karaganna meka


const SignUp = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    location: '',
    foodType: '',
  });

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Sign-up successful!');
      } else {
        alert(data.error || 'Sign-up failed.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={`auth-container ${darkMode ? 'dark' : 'light'}`}>
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label>Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter your business name"
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              required
            />
          </div>
          <div className="input-group">
            <label>Food Type</label>
            <input
              type="text"
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              placeholder="Enter types of food donated"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="auth-button"
            type="submit"
          >
            Sign Up
          </motion.button>
        </form>
        <div className="theme-toggle" onClick={toggleTheme}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
