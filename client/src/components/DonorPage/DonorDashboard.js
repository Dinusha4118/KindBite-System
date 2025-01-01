import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const location = useLocation();
  const { email, businessName } = location.state || {};
  const [signout, setSignout] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [donationDetails, setDonationDetails] = useState({
    foodName: "",
    quantity: "",
    type: "",
    location: "",
    expirationTime: "",
  });
  const [donationHistory, setDonationHistory] = useState([]);
  const [notifications] = useState([
    "Your donation '20 Sandwiches' was picked up by Alex.",
    "New request for 10 bags of fruit received.",
  ]);

  // Fetch Donation History
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donations");
        if (response.ok) {
          const data = await response.json();
          setDonationHistory(data);
        } else {
          console.error("Failed to fetch donations.");
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, []);

  const handleSignout = () => {
    setSignout(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails({ ...donationDetails, [name]: value });
  };

  const handlePopupSubmit = async () => {
    const { foodName, quantity, type, location, expirationTime } = donationDetails;

    // Input Validation
    if (!foodName || foodName.trim() === "") {
      alert("Food name is required.");
      return;
    }
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      alert("Quantity must be a positive number.");
      return;
    }
    if (!type || type.trim() === "") {
      alert("Food type is required.");
      return;
    }
    if (!expirationTime || new Date(expirationTime) <= new Date()) {
      alert("Expiration time must be a future date and time.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodType: foodName,
          quantity: Number(quantity),
          type,
          expirationDate: new Date(expirationTime).toISOString(),
          businessName,
          email,
          location: location || "Unknown Location",
        }),
      });

      if (response.ok) {
        alert("Donation added successfully!");
        const newDonation = await response.json();
        setDonationHistory((prev) => [...prev, newDonation]);
        setShowPopup(false);
        setDonationDetails({
          foodName: "",
          quantity: "",
          type: "",
          location: "",
          expirationTime: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to add donation: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Error submitting donation. Please try again later.");
    }
  };

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
          <button className="dashboard-button" onClick={() => setShowPopup(true)}>
            Add Donation
          </button>
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
                <th>Quantity</th>
                <th>Date</th>
                <th>Recipient</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.map((donation) => (
                <tr key={donation._id}>
                  <td>{donation.foodType}</td>
                  <td>{donation.quantity}</td>
                  <td>{new Date(donation.expirationDate).toLocaleDateString()}</td>
                  <td>{donation.businessName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Food Donation Listing</h2>
            <label>
              Food Name:
              <input
                type="text"
                name="foodName"
                value={donationDetails.foodName}
                onChange={handleInputChange}
                placeholder="e.g., Sandwiches"
                required
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={donationDetails.quantity}
                onChange={handleInputChange}
                min="1"
                required
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={donationDetails.type}
                onChange={handleInputChange}
                placeholder="e.g., Non-perishable"
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={donationDetails.location}
                onChange={handleInputChange}
                placeholder="e.g., Colombo"
                required
              />
            </label>
            <label>
              Expiration Time:
              <input
                type="datetime-local"
                name="expirationTime"
                value={donationDetails.expirationTime}
                onChange={handleInputChange}
                required
              />
            </label>
            <div className="popup-actions">
              <button onClick={handlePopupSubmit}>Submit</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
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
              <li><span className="nav-link-button">Team</span></li>
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
