import React, { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "./context/user";
import "./Login.css";

const Login = ({ loading }) => {
  const { login, loggedIn } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  useEffect(() => {
    if (!loading && loggedIn) {
      navigate("/");
    }

    return () => {
      setError(null);
    };
  }, [loading, loggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          console.log(data);
          login(data);
          setError(null);
          navigate("/posts");
        });
      } else {
        resp.json().then((data) => {
          console.log(data.error);
          setError(data.error);
        });
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
    <div className="login-form">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            onChange={handleChange}
            value={email}
            name="email"
            id="email"
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            value={password}
            name="password"
            id="password"
            autoComplete="on"
          />
        </div>
        <div className="form-group checkbox-group">
          <label>show password:</label>
          <input
            type="checkbox"
            onChange={() => setShowPassword((prev) => !prev)}
            checked={showPassword}
          />
        </div>

        <button type="submit">Log In</button>
      </form>

      {error && <div className="error-container">{error}</div>}

      <br />
      <>
        <small>
          <b>Don't have an account? {"   "}</b>
          <u>
            <NavLink to="/signup">Sign up</NavLink>
          </u>
        </small>
      </>
    </div>
  );
};

export default Login;
