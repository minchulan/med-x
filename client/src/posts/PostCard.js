import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import PostMeta from "./PostMeta";
import "./PostCard.css";
import { PostContext } from "../context/post";
import comment from "../asset/comment.png"

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { currentUser, loggedIn } = useContext(UserContext);
  const { deletePost } = useContext(PostContext);
  const { id, title, user, content, created_at } = post;
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const commentCount = post.comments.length;
  const singularOrPlural = commentCount === 1 ? "comment" : "comments";

  const handlePostClick = () => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      navigate(`/posts/${id}`);
    }
  };

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
    fetch(`/posts/${post.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) => deletePost(data));
  };

  return (
    <div className={`post-card ${menuVisible ? "menu-visible" : ""}`}>
      <div onClick={handlePostClick}>
        <h2 className="post-card-title">{title}</h2>
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
