import React, { useContext, useState } from "react";
import { UserContext } from "../context/user";
import "./CommentForm.css";

const CommentForm = ({ onSubmit }) => {
  const { currentUser } = useContext(UserContext);
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      // Prevent submitting empty comments
      return;
    }
    onSubmit(comment);
    setComment("");
  };

  return (
    <div className="comment-form-container">
      <p className="comment-form-header">Comment as {currentUser.username}</p>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={comment}
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
