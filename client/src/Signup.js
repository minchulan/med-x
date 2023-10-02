import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./context/user";
import "./Signup.css";
import { ErrorsContext } from "./context/error";

const Signup = () => {
  const { signup } = useContext(UserContext);
  const { errors } = useContext(ErrorsContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false, // New state for Show Password functionality
  });

  const { username, email, password, showPassword } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };

    signup(newUser);
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
      {errors && errors.length > 0 && (
        <div className="error-container">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Signup;
