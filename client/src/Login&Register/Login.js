import React from "react";
import "./login.css";


function Login() {
    return (
        
      <div className="login">

        <div className="login-header">
          <h1>LOGIN</h1>
            <input type="text" placeholder="Username" className="inputs" /><br /><br />
            <input type="password" placeholder="Password"  className="inputs"/><br /><br />

            <a href="/"><button className="btn" >LOGIN</button></a>

            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    );
}

export default Login;