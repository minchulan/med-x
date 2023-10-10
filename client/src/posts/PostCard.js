import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import PostMeta from "./PostMeta";
import "./PostCard.css";
import { PostContext } from "../context/post";
import comment from "../asset/comment.png"

const PostCard = ({ post }) => {
  const { currentUser, loggedIn } = useContext(UserContext);
  const { deletePost } = useContext(PostContext);
  const { id, title, user, content, created_at } = post;
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const commentCount = post.comments.length;
  const singularOrPlural = commentCount === 1 ? "comment" : "comments";

  // LOGGED IN AUTHORIZATION 
  const handlePostClick = () => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      navigate(`/posts/${id}`);
    }
  };

  // HAMBURGER TOGGLE MENU - EDIT & DELETE
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

  // EDIT POST => Navigates to post edit
  const handleEditClick = () => {
    navigate(`/posts/${post.id}/edit`);
  };

  // DELETE POST 
  const handleDeleteClick = () => {
    fetch(`/posts/${post.id}`, {
      method: "DELETE",
    })

    deletePost(post.id);
  };

  return (
    <div className={`post-card ${menuVisible ? "menu-visible" : ""}`}>
      <div onClick={handlePostClick}>
        <h2 className="hover-underline-animation">{title}</h2>
      </div>
      <PostMeta username={user.username} createdAt={created_at} />
      <p className="post-card-content">{content}</p>
      <div className="comment-count-container">
        <img src={comment} alt="Comment Icon" className="comment-icon" />{" "}
        {commentCount} {singularOrPlural}
      </div>
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
