import React from "react";
import "./register.css";

function Register() { 
    return (
    
        <div className="register">
            <div className="register-header">
                <h1>REGISTER</h1>
                <input type="text" placeholder="Username" className="inputs" /><br /><br />
                <input type="email" placeholder="Email" className="inputs" /><br /><br />
                <input type="password" placeholder="Password" className="inputs" /><br /><br />
                <input type="password" placeholder="Confirm Password" className="inputs" /><br /><br />
                <a href="/login"><button className="btn" >REGISTER</button></a>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
}

export default Register;