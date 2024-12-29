import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const location = useLocation();
  const { email, businessName } = location.state || {};
  const [signout, setSignout] = React.useState(false); // State to trigger signout

  const donationHistory = [
    { id: 1, item: "20 Sandwiches", date: "2024-12-20", recipient: "Helping Hands" },
    { id: 2, item: "30 Bags of Bread", date: "2024-12-18", recipient: "Local Shelter" },
  ];

  const notifications = [
    "Your donation '20 Sandwiches' was picked up by Alex.",
    "New request for 10 bags of fruit received.",
  ];


  const handleSignout = () => {
    setSignout(true); // Trigger signout
  };


  // Redirect after signout
  if (signout) {
    return <Navigate to="/" />;
  }

  return (
    <div className="donor-dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {businessName || "Donor"}</h1>
        <p>Your email: {email}</p>
        <p>Your contributions make a difference!</p>
        <button className="signout" onClick={handleSignout}>SignOut</button>
      </header>
      <section className="donor-features">
        <div className="feature-section">
          <h2>Add Food Donation</h2>
          <p>List surplus food with details like quantity, type, and availability.</p>
          <button className="dashboard-button">Add Donation</button>
        </div>
        <div className="feature-section">
          <h2>Real-Time Notifications</h2>
          <ul className="notification-list">
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
        <div className="feature-section">
          <h2>Donation History</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Date</th>
                <th>Recipient</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.map((donation) => (
                <tr key={donation.id}>
                  <td>{donation.item}</td>
                  <td>{donation.date}</td>
                  <td>{donation.recipient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer1">
        <div className="footer1-content">
          <div className="footer1-section about">
            <h2>About KINDBITE</h2>
            <p>
              KINDBITE connects surplus food from restaurants and suppliers
              with communities in need. Our mission is to reduce food waste
              while addressing food insecurity.
            </p>
          </div>
          <div className="footer1-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><span className="nav-link-button">About</span></li>
              <li><span className="nav-link-button">Services</span></li>
              <li><span className="nav-link-button">Teem</span></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </div>
          <div className="footer1-section contact">
            <h2>Contact Us</h2>
            <p>Email: support@kindbite.com</p>
            <p>Phone: +9476 456 7893</p>
            <p>Address: 123 Jayanthi Lane, Colombo 08</p>
          </div>
        </div>
        <div className="footer1-bottom">
          <p>&copy; 2024 KINDBITE. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DonorDashboard;
