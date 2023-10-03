import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import "./Signup.css";
import { ErrorsContext } from "./context/error";

const Signup = () => {
  const { login } = useContext(UserContext);
    const { errors, setErrors } = useContext(ErrorsContext);
    
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false, // New state for Show Password functionality
  });

  const { username, email, password, showPassword } = formData;

  const handleSubmit = (e) => {
      e.preventDefault();
      
      fetch("/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password })
      })
          .then((resp) => resp.json())
          .then(data => {
              if (data.errors) {
                  setErrors(data.errors)
              } else {
                  login(data)
                  navigate("/posts")
              }  
          }) 
  };
    

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const toggleShowPassword = () => {
        setFormData({
        ...formData,
        showPassword: !showPassword,
        });
    };

    return (
        <div className="signup-form">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                onChange={handleChange}
                value={username}
                name="username"
                id="username"
                autoComplete="off"
            />
            </div>
            <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                onChange={handleChange}
                value={email}
                name="email"
                id="email"
                autoComplete="off"
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                onChange={handleChange}
                value={password}
                name="password"
                id="password"
                autoComplete="off"
            />
            <div className="checkbox-group">
                <label>show password:</label>
                <input
                type="checkbox"
                onChange={toggleShowPassword}
                checked={showPassword}
                />
            </div>
            </div>
            <button type="submit">Sign Up</button>
        </form>
        <br />
        <>
            <small>
            <b>Already have an account? {"   "}</b>
            <u>
                <NavLink to="/login">Log in</NavLink>
            </u>
            </small>
        </>
        </div>
    );
};

export default Signup;
