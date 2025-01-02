import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/recipient/signin", formData);
      setMessage(response.data.message);
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
        <button type="submit">Signin</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
    </div>
  );
};

export default SigninForm;
