import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./register.css";

function Register() {
    const [values, setValues] = useState({
        Uname: "",
        email: "",
        password: "",
        cPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleValidation = (e) => {
        e.preventDefault(); // Prevent form submission
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        // If there are no errors, navigate to the login page
        if (Object.keys(validationErrors).length === 0) {
            console.log("Form submitted successfully");
            navigate("/login"); // Navigate to /login
        }
    };

    function Validation(values) {
        let error = {};
        const email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const pass_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (values.Uname === "") {
            error.Uname = "Please enter your username";
        }

        if (values.email === "") {
            error.email = "Please enter your email";
        } else if (!email_pattern.test(values.email)) {
            error.email = "Please enter a valid email";
        }

        if (values.password === "") {
            error.password = "Please enter your password";
        } else if (!pass_pattern.test(values.password)) {
            error.password = "Please enter a valid password";
        }

        if (values.cPassword === "") {
            error.cPassword = "Please confirm your password";
        } else if (values.password !== values.cPassword) {
            error.cPassword = "Passwords do not match";
        }

        return error;
    }

    return (
        <div className="register">
            <div className="register-header">
                <h1>REGISTER</h1>
                <form onSubmit={handleValidation}>
                    <input
                        type="text"
                        placeholder="Username"
                        name="Uname"
                        className="inputs"
                        value={values.Uname}
                        onChange={handleChange}
                    />
                    {errors.Uname && <p className="error">{errors.Uname}</p>}
                    <br /><br />

                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="inputs"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <br /><br />

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="inputs"
                        value={values.password}
                        onChange={handleChange}
                        onFocus={() => setShowPasswordPopup(true)}
                        onBlur={() => setShowPasswordPopup(false)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    {showPasswordPopup && (
                        <div className="popup">
                            Password must be 6-20 characters long, contain at least one numeric digit, one uppercase, and one lowercase letter.
                        </div>
                    )}
                    <br /><br />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="cPassword"
                        className="inputs"
                        value={values.cPassword}
                        onChange={handleChange}
                    />
                    {errors.cPassword && <p className="error">{errors.cPassword}</p>}
                    <br /><br />

                    <button type="submit" className="btn">REGISTER</button>

                    <p>Already have an account? <a href="/login">Login</a></p>
                </form>
            </div>
        </div>
    );
}

export default Register;