import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const { email, businessName } = location.state || {};
  const [signout, setSignout] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [donationDetails, setDonationDetails] = useState({
    foodName: "",
    quantity: "",
    type: "",
    location: "",
    expirationTime: "",
  });
  const [donationHistory, setDonationHistory] = useState([]);
  const [editingDonation, setEditingDonation] = useState(null);
  const [notifications] = useState([
    "Your donation '20 Sandwiches' was picked up by Alex.",
    "New request for 10 bags of fruit received.",
  ]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/requests");
        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        } else {
          console.error("Failed to fetch requests.");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
    
    const interval = setInterval(fetchRequests, 2000); // Fetch every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

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
    const interval = setInterval(fetchDonations, 2000); // Fetch every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails({ ...donationDetails, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/donations/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDonationHistory(donationHistory.filter((donation) => donation._id !== id));
        alert("Donation deleted successfully!");
      } else {
        alert("Failed to delete donation.");
      }
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  const handleEdit = (donation) => {
    setDonationDetails({
      foodName: donation.foodType,
      quantity: donation.quantity,
      type: donation.type,
      location: donation.location,
      expirationTime: new Date(donation.expirationDate).toISOString().slice(0, 16),
    });
    setEditingDonation(donation._id);
    setShowPopup(true);
  };

  const handlePopupSubmit = async () => {
    const { foodName, quantity, type, location, expirationTime } = donationDetails;

    if (!foodName || !quantity || !type || !expirationTime) {
      alert("All fields are required.");
      return;
    }

    const url = editingDonation
      ? `http://localhost:5000/api/donations/${editingDonation}`
      : "http://localhost:5000/api/donations";
    const method = editingDonation ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodType: foodName,
          quantity: Number(quantity),
          type,
          location,
          expirationDate: new Date(expirationTime).toISOString(),
          businessName,
          email,
        }),
      });

      if (response.ok) {
        if (editingDonation) {
          setDonationHistory(
            donationHistory.map((donation) =>
              donation._id === editingDonation
                ? { ...donation, foodType: foodName, quantity, type, location, expirationDate: expirationTime }
                : donation
            )
          );
          alert("Donation updated successfully!");
        } else {
          alert("Donation added successfully!");
        }
        setEditingDonation(null);
        setShowPopup(false);
        setDonationDetails({ foodName: "", quantity: "", type: "", location: "", expirationTime: "" });
        window.location.reload(); // Auto-reload the window after adding/updating a donation
      } else {
        alert("Failed to submit donation.");
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  const handleSignout = () => {
    setSignout(true);
  };

  const handleAction = async (requestId, action) => {
    try {
      // Find the specific request by ID to get the food type
      const request = requests.find((req) => req._id === requestId);
  
      if (!request) {
        console.error("Request not found.");
        return;
      }
  
      const response = await fetch(`http://localhost:5000/api/requests/${requestId}/${action}`, {
        method: "POST",
      });
  
      if (response.ok) {
        // Send notification message to the backend
        await fetch("http://localhost:5000/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `Request for "${request.foodType}" was ${action === "accept" ? "approved" : "rejected"}.`,
          }),
        });
  
        setMessage(`Request for "${request.foodType}" ${action}ed successfully.`);
        setRequests(requests.filter((req) => req._id !== requestId)); // Remove request from UI
      } else {
        console.error("Failed to process action.");
      }
    } catch (error) {
      console.error("Error processing action:", error);
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
                <th>Donor Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.map((donation) => (
                <tr key={donation._id}>
                  <td>{donation.foodType}</td>
                  <td>{donation.quantity}</td>
                  <td>{new Date(donation.expirationDate).toLocaleDateString()}</td>
                  <td>{donation.businessName}</td>
                  <td>
                    <button onClick={() => handleEdit(donation)}>Edit</button>
                    <br></br>
                    <button onClick={() => handleDelete(donation._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="requests-section">
        <h2>Recipient Requests</h2>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Food Type</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Organization</th>
              <th>Request Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.foodType}</td>
                <td>{request.quantity}</td>
                <td>{request.location}</td>
                <td>{request.organizationName}</td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="accept-button"
                    onClick={() => handleAction(request._id, "accept")}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleAction(request._id, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {message && <p className="message">{message}</p>}
      </section>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>{editingDonation ? "Edit Donation" : "Add Donation"}</h3>
            <input
              type="text"
              name="foodName"
              placeholder="Food Name"
              value={donationDetails.foodName}
              onChange={(e) => setDonationDetails({ ...donationDetails, foodName: e.target.value })}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={donationDetails.quantity}
              onChange={(e) => setDonationDetails({ ...donationDetails, quantity: e.target.value })}
            />
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={donationDetails.type}
              onChange={(e) => setDonationDetails({ ...donationDetails, type: e.target.value })}
            />
            <input
              type="datetime-local"
              name="expirationTime"
              value={donationDetails.expirationTime}
              onChange={(e) => setDonationDetails({ ...donationDetails, expirationTime: e.target.value })}
            />
            <button onClick={handlePopupSubmit}>{editingDonation ? "Update" : "Submit"}</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

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
