import React, { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "./context/user";
import { ErrorsContext } from "./context/error";
import "./Login.css";

const Login = ({ loading }) => {
  const { login } = useContext(UserContext);
  const { setErrors } = useContext(ErrorsContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { email, password } = formData;

  useEffect(() => {
    return () => {
      setErrors([]);
    };
  }, [setErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          login(data);
          setErrors([]);
          navigate("/posts");
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
