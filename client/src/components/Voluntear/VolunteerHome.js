import React from "react";
import "./VolHome.css";
import Logo from "../images/kindbite.png";
import Avatar from "../images/avatar.jpeg";
import level from "../images/ss1.png"

function VolunteerHome() {
  return (
    <div className="container">
      <div className="nav">
        <header className="navbar">
          <div className="logo">
            <img src={Logo} alt="FoodLink Logo" className="logo-image" />
          </div>
          <nav>
            <ul className="nav-links">
              <li><a href="/">Dashboard</a></li>
              <li><a href="/order">Orders</a></li>
              <li><a href="/eran">Eranings</a></li>
            </ul>
          </nav>
          <button className="signin">Select Account Type</button>
          <a href="#contact" className="contact-button">Contact</a>
        </header>
      </div>

      <div className="Level">  
        <div className="level-body">
          <h3>Level Overview</h3>

          <div className="level-show-box">
            <img src={Avatar} alt="Avatar" className="avatar" />
          
            
              <img src={level} alt="Level" className="level-ss" />
            

          </div>
        </div>
      </div>




    </div>
  );
}

export default VolunteerHome;