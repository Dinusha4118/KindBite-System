import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Auth.css';
import axios from 'axios';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/signin', { email, password });
        alert(response.data.message);
      } catch (error) {
        alert(error.response.data.error);
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
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="auth-button"
            type="submit"
          >
            Sign In
          </motion.button>
        </form>
        <div className="theme-toggle" onClick={toggleTheme}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
