import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import PostMeta from "./PostMeta";
import "./PostCard.css";
import { PostContext } from "../context/post";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { deletePost } = useContext(PostContext);
  const { id, title, user, summary, created_at } = post;

  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
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
    navigate(`/posts/${post.id}/edit`);
  };

  const handleDeleteClick = () => {
    // Implement delete functionality
    fetch(`/posts/${post.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => console.log(resp))
    
  };

  return (
    <div className={`post-card ${menuVisible ? "menu-visible" : ""}`}>
      <NavLink to={`/posts/${id}`}>
        <h2 className="post-card-title">{title}</h2>
      </NavLink>
      <PostMeta username={user.username} createdAt={created_at} />
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
