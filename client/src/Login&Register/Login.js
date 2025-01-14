import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For API requests
import "./login.css";

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/login", values);
            console.log(response.data);

            // Redirect on successful login
            if (response.data.success) {
              const { email, username, profilePic } = response.data;
              
                  navigate("/Voldesh", { state: { email, username, profilePic } });
             
          } else {
              setErrors(response.data.error);
          }
        } catch (error) {
            setErrors(error.response?.data?.error || "An error occurred. Please try again.");
            console.error("Login Error:", error);
        }
    };

    return (
        <div className="login">
            <div className="login-header">
                <h1>LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="inputs"
                        value={values.email}
                        onChange={handleChange}
                    />
                    <br /><br />

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="inputs"
                        value={values.password}
                        onChange={handleChange}
                    />
                    <br /><br />

                    {errors && <p className="error">{errors}</p>}

                    <button type="submit" className="btn">LOGIN</button>
                </form>

                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
    );
}

export default Login;
