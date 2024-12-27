import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import AboutPage from "./components/AboutPage/AboutPage"; // Import the AboutPage component
import Services from "./components/Services/Services";
import Login from "./Login&Register/Login";
import Register from "./Login&Register/Register";
import "./App.css";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} /> {/* Add AboutPage route */}
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
