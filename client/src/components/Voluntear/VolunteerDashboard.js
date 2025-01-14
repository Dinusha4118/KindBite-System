import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import "./VolunteerDashboard.css";

const VolunteerDashboard = () => {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const { email, username,profilePic } = location.state || {};
  const [impact, setImpact] = useState({ foodDelivered: 0, hoursVolunteered: 0 });

  useEffect(() => {
    // Fetch user email, tasks, and impact data (mocked here)
   
    setTasks([
      { id: 1, location: '123 Main St', type: 'Pick-up', status: 'Pending' },
      { id: 2, location: '456 Elm St', type: 'Delivery', status: 'In Progress' }
    ]);
    setImpact({ foodDelivered: 120, hoursVolunteered: 15 });
  }, []);

  const handleSignOut = () => {
    console.log('Sign out logic here');
  };

  const renderTasks = () => {
    return tasks.map((task) => (
      <div key={task.id} className="task-item">
        <h3>{task.type} Task</h3>
        <p>Location: {task.location}</p>
        <p>Status: {task.status}</p>
      </div>
    ));
  };

  const renderImpact = () => (
    <div className="impact-section">
      <h2>Your Impact</h2>
      <p>Total Food Delivered: {impact.foodDelivered} kg</p>
      <p>Hours Volunteered: {impact.hoursVolunteered}</p>
    </div>
  );

  const renderRouteOptimization = () => (
    <div className="route-section">
      <h2>Route Optimization</h2>
      <p>Suggested Route: Minimize time and fuel usage for current tasks.</p>
    </div>
  );

  const renderNewFeature = () => (
    <div className="new-feature-section">
      <h2>New Feature Placeholder</h2>
      <p>Details about the new feature will be added here.</p>
    </div>
  );

  return (
    <div className="VolunteerDashboard">
      <header className="header">
        <button className="signout-button" onClick={handleSignOut}>
          SIGNOUT
        </button>
        <div className="header-text">
          <h1>Hi {username}, Welcome to Volunteer Dashboard</h1>
          <h3>Your Email is {email}</h3>
          <img src={`http://localhost:3000${profilePic}`} alt="Profile" className="profile-pic" />
          
        </div>
      </header>
      <div className="feature2-container1">
        <section>{renderTasks()}</section>
        <section>{renderImpact()}</section>
        <section>{renderRouteOptimization()}</section>
        <section>{renderNewFeature()}</section>
      </div>
      <br />
      <br />
      <footer className="footer2">
        <div className="footer2-content">
          <div className="footer2-section about">
            <h2>About KINDBITE</h2>
            <p>
              KINDBITE connects surplus food from restaurants and suppliers
              with communities in need. Our mission is to reduce food waste
              while addressing food insecurity.
            </p>
          </div>
          <div className="footer2-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><span className="nav-link-button">About</span></li>
              <li><span className="nav-link-button">Services</span></li>
              <li><span className="nav-link-button">Team</span></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </div>
          <div className="footer2-section contact">
            <h2>Contact Us</h2>
            <p>Email: support@kindbite.com</p>
            <p>Phone: +9476 456 7893</p>
            <p>Address: 123 Jayanthi Lane, Colombo 08</p>
          </div>
        </div>
        <div className="footer2-bottom">
          <p>&copy; 2025 KINDBITE. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default VolunteerDashboard;
