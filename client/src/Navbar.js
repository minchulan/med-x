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
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/user" activeClassName="active">
              User Page
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" activeClassName="active">
              Sign up
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName="active">
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
`activeClassName` is a prop provided by React Router's NavLink component.
*/
