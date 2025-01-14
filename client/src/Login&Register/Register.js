import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

function Register() {
    const [values, setValues] = useState({
        Uname: "",
        email: "",
        password: "",
        cPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [apiError, setApiError] = useState(""); // State to display API error messages
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleProfilePicChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleValidation = async (e) => {
        e.preventDefault();
        setApiError(""); // Clear previous API errors
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const formData = new FormData();
            formData.append("username", values.Uname);
            formData.append("email", values.email);
            formData.append("password", values.password);
            if (profilePic) {
                formData.append("profilePic", profilePic);
            }

            try {
                const response = await axios.post(
                    "http://localhost:5000/api/register",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                console.log(response.data);
                navigate("/login");
            } catch (error) {
                // Display API error messages
                const errorMsg =
                    error.response?.data?.error || "An error occurred. Please try again.";
                setApiError(errorMsg);
                console.error(error);
            }
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
            error.password = "Password must be 6-20 characters, include at least one digit, one uppercase, and one lowercase letter.";
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

                    <input
                        type="file"
                        accept="image/*"
                        className="inputs"
                        onChange={handleProfilePicChange}
                    />
                    <br /><br />

                    {apiError && <p className="error">{apiError}</p>}

                    <button type="submit" className="btn">REGISTER</button>

                    <p>Already have an account? <a href="/login">Login</a></p>
                </form>
            </div>
        </div>
    );
}

export default Register;
