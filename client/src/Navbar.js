import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
    const { loggedIn, logout } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const loggedInLinks = () => {
        return (
          <>
            <li>
              <NavLink to="/posts">Posts</NavLink>
            </li>
            <li>
              <NavLink to="/posts/new">Create Post</NavLink>
            </li>
            <li>
              <NavLink to="/me">Profile</NavLink>
            </li>
            <li>
              <NavLink to="#"><button className="small-button" onClick={handleLogout}>Logout</button></NavLink>
            </li>
          </>
        );
    };

    const loggedOutLinks = () => {
        return (
          <>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        );
    };

    return (
      <div className="navbar-container">
        <h1>MedX</h1>
        <nav className="nav-links">
          <ul>
            <li>
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            { loggedIn ? loggedInLinks() : loggedOutLinks() }
          </ul>
        </nav>
      </div>
    );
};

export default Navbar;

/*
`activeClassName is a prop provided by React Router's NavLink component.

Links by default make get request
*/
