import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import the CSS file for styling

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={handleChange}
            value={password}
            name="password"
            id="password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
