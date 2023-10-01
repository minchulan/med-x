import React, { useState, useContext } from "react";
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { ErrorsContext } from "./context/error";

const Signup = () => {
    const { signup } = useContext(UserContext);
    const { errors } = useContext(ErrorsContext)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
      const newUser = {
          username,
          email,
          password
      };

      signup(newUser)
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
            autoComplete="off"
            // required
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
            // required
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
            autoComplete="off"
            // required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
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
