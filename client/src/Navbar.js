import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <div className="navbar-container">
      <h1>MedX</h1>
      <nav className="nav-links">
        <ul>
          <li>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/me" className="nav-link">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="nav-link">
              Sign up
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-link">
              Log in
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

/*
`activeClassName is a prop provided by React Router's NavLink component.
*/
