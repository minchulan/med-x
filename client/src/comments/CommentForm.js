import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import { ErrorsContext } from "../context/error";
import "./CommentForm.css";
import { NavLink } from "react-router-dom";

const CommentForm = ({ post_id }) => {
  const { currentUser } = useContext(UserContext);
  const { addComment } = useContext(PostContext);
  const { setErrors } = useContext(ErrorsContext);
  const [content, setContent] = useState("");

  useEffect(() => {
    setErrors([]);
  }, [setErrors]);

  // Ensure currentUser exists before accessing its properties
  const user_id = currentUser ? currentUser.id : null;
  const username = currentUser ? currentUser.username : "";

  const handleCommentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/posts/${post_id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, post_id }),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          addComment(data);
        });
      } else {
        resp.json().then((data) => {
          debugger 
          setErrors(["Comment must be between 1 and 280 characters."]);
        });
      }
    });

    setContent("");
  };

  return (
    <div className="comment-form-container">
      <p className="comment-form-header">
        Comment as{" "}
        <NavLink to={`/users/${user_id}`}>u/{username}</NavLink>
      </p>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={handleCommentChange}
          placeholder="What are your thoughts?"
          className="comment-input"
        />
        <button type="submit" className="comment-submit-btn">
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
