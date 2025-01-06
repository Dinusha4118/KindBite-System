import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import "./Dashboard.css";

const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const { email, organizationName } = location.state || {};
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    foodNeeded: "",
    location: "",
    quantity: "",
    mobileNumber: "",
    countryCode: "+1",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/donations")
      .then((response) => setDonations(response.data))
      .catch((error) => console.error("Error fetching donations:", error));

    axios
      .get("http://localhost:5000/api/notifications")
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.foodNeeded.trim() || /\d/.test(formData.foodNeeded)) {
      newErrors.foodNeeded = "Food type is required and cannot include numbers.";
    }

    if (!formData.location.trim() || /\d/.test(formData.location)) {
      newErrors.location = "Location is required and cannot include numbers.";
    }

    if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) {
      newErrors.quantity = "Quantity must be a positive number.";
    }

    if (!formData.mobileNumber || !/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be a valid 10-digit number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage("Please fix the errors in the form.");
      return;
    }

    axios
      .post("http://localhost:5000/api/recipient/submit", formData)
      .then((response) => {
        setMessage(response.data.message);
        setFormData({
          foodNeeded: "",
          location: "",
          quantity: "",
          mobileNumber: "",
          countryCode: "+1",
        });
      })
      .catch((error) => {
        console.error("Error submitting requirements:", error);
        setMessage("Error submitting requirements.");
      });
  };

  const handleRequest = (donation) => {
    if (!organizationName) {
      setMessage("Error: Organization name is missing.");
      return;
    }

    const requestData = {
      foodType: donation.foodType,
      quantity: donation.quantity,
      location: donation.location,
      organizationName,
    };

    axios
      .post("http://localhost:5000/api/requests", requestData)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error requesting food:", error);
        setMessage("Error sending request. Please try again.");
      });
  };
  

  const handleSignOut = () => {
    navigate("/AccountType"); // Navigate to "AccountType" page
  };

  return (
    <div className="dashboard">
      <header className="header">
        <button className="signout-button" onClick={handleSignOut}>
          SIGNOUT
        </button>
        <div className="header-text">
          <h1>Welcome {organizationName } to the Recipient Portal</h1>
          <h3>Your Email is {email}</h3>
        </div>
      </header>
      <br></br>
      <br></br>
      <div className="features-container">
      <section>
          <h2>Request Food</h2>
          <table className="donations-table">
            <thead>
              <tr>
                <th>Food Type</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
               {donations.map((donation) => (
                 <tr key={donation._id}>
                  <td>{donation.foodType}</td>
                  <td>{donation.quantity}</td>
                  <td>{donation.location}</td>
                <td>
                <button
                   className="request-button"
                   onClick={() => handleRequest(donation)} // Pass the whole donation object
                >
          Request
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </section>

        <section>
          <h2>Notification Alerts</h2>
          <ul className="notifications-list">
            {notifications.map((notification) => (
              <li key={notification._id}>{notification.message}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Submit Requirements</h2>
          <form className="requirements-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="foodNeeded"
              placeholder="Food Needed (e.g., Rice, Bread)"
              value={formData.foodNeeded}
              onChange={handleChange}
              required
            />
            {errors.foodNeeded && <p className="error">{errors.foodNeeded}</p>}

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            {errors.location && <p className="error">{errors.location}</p>}

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            {errors.quantity && <p className="error">{errors.quantity}</p>}

            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              required
            >
              <option value="+1">+1 (US)</option>
              <option value="+91">+91 (India)</option>
              <option value="+94">+94 (Sri Lanka)</option>
            </select>

            <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
            {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}

            <button type="submit">Submit</button>
          </form>
          {message && <p className="message">{message}</p>}
        </section>
      </div>
      <br></br>
      <br></br>
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

export default Dashboard;
