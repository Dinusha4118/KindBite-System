import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    password: "",
    location: "",
    foodType: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/recipient/signup", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="form">
    <div className="form-container">
      <h2>Recipient Signup</h2>
      <form onSubmit={handleSubmit} className="animated-form">
        <input
          type="text"
          name="organizationName"
          placeholder="Organization Name"
          value={formData.organizationName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="foodType"
          placeholder="Food Type Needed"
          value={formData.foodType}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
    </div>
  );
};

export default SignupForm;
