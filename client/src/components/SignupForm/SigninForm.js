import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./Form.css";

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // React Router's navigation hook

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/recipient/signin",
        { email, password }
      );
      alert(response.data.message);

       // Assuming the API returns `businessName` along with the response
       const { Recipient } = response.data;

       // Navigate to DonorDashboard with email and businessName
       navigate('/Dashboard', { state: { email, Recipient } });
      
    } catch (error) {
      setMessage(error.response?.data?.error || "Signin failed");
    }
  };

  return (
    <div className="form">
      <div className="form-container">
        <h2>Recipient Signin</h2>
        <form onSubmit={handleSubmit} className="animated-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Signin</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default SigninForm;
