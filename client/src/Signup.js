import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/user";
import "./Signup.css";
import { ErrorsContext } from "./context/error";

const Signup = () => {
  const { login, setCurrentUser } = useContext(UserContext);
  const { setErrors } = useContext(ErrorsContext);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setErrors([]);
    };
  }, [setErrors]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "", 
  });

  const { username, email, password } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          login(data);
          setCurrentUser(data);
          console.log(data);
          navigate("/");
        }
      });
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
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={password}
            autoComplete="off"
          />
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
