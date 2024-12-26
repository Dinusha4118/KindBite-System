import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import AboutPage from "./components/AboutPage/AboutPage"; // Import the AboutPage component
import Services from "./components/Services/Services";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} /> {/* Add AboutPage route */}
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
};

export default App;
