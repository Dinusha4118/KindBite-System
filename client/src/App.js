import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import AboutPage from "./components/AboutPage/AboutPage"; // Import the AboutPage component
import Services from "./components/Services/Services";
import Teempage from "./components/Teempage/Teempage";
import HowItWorks from "./components/HowItWorks/HowItWorks";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} /> {/* Add AboutPage route */}
        <Route path="/services" element={<Services />} />
        <Route path="/Teempage" element={<Teempage />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
      </Routes>
    </Router>
  );
};

export default App;
