import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; 
import logo from "./asset/logo.png"

const Navbar = () => {
  const { loggedIn, logout } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const loggedInLinks = () => {
    return (
      <>
        <li>
          <Link to="/posts">Explore</Link>
        </li>
        <li>
          <Link to="/posts/new">Create Post</Link>
        </li>
        <li>
          <Link to="/me">Profile</Link>
        </li>
        <li>
          <Link to="/users">User List</Link>
        </li>
        <li>
          <Link to="#">
            <button className="small-button" onClick={handleLogout}>
              Logout
            </button>
          </Link>
        </li>
      </>
    );
  };

  const loggedOutLinks = () => {
    return (
      <>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </>
    );
  };

  return (
    <div className="navbar-container">
      <nav>
        <Link to="/">
          <img src={logo} alt="MedX logo" />
        </Link>
      </nav>
      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i>  Home
            </Link>
          </li>
          {loggedIn ? loggedInLinks() : loggedOutLinks()}
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
