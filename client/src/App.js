import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import AboutPage from "./components/AboutPage/AboutPage"; // Import the AboutPage component
import Services from "./components/Services/Services";
import Login from "./Login&Register/Login";
import Register from "./Login&Register/Register";
import Teempage from "./components/Teempage/Teempage";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import DonorPage from "./components/DonorPage/DonorPage";
import SignIn from './components/donorAuth/SignIn';
import SignUp from './components/donorAuth/SignUp';


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
        <Route path="/Teempage" element={<Teempage />} />
        <Route path="/HowItWorks" element={<HowItWorks />} />
        <Route path="/DonorPage" element={<DonorPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </Router>
  );
};

export default App;
