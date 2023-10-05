import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import "./PostCard.css";

const calculateTimeAgo = (createdAt) => {
  const currentTime = new Date();
  const postTime = new Date(createdAt);
  const timeDifference = Math.abs(currentTime - postTime);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  }
};

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { id, title, user, summary, created_at } = post;
  const timeAgo = calculateTimeAgo(created_at);

  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  console.log(post)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleEditClick = () => {
    // Implement edit functionality
  };

  const handleDeleteClick = () => {
    // Implement delete functionality
  };

  return (
    <div className={`post-card ${menuVisible ? "menu-visible" : ""}`}>
      <NavLink to={`/posts/${id}`}>
        <h2 className="post-card-title">{title}</h2>
      </NavLink>
      <div className="post-card-meta">
        <span>Posted by u/{user.username}</span>
        <span>{timeAgo}</span>
      </div>
      <p className="post-card-content">{summary}</p>
      {currentUser && currentUser.id === post.user.id && (
        <div className="post-card-actions">
          <button className="kebab-icon" onClick={toggleMenu}>
            ⋮
          </button>
          <div
            className={`menu-options ${menuVisible ? "visible" : ""}`}
            ref={menuRef}
          >
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;

// useLocation hook to conditionally display comments here only if we are in the show page

