import React, { useState } from "react";
import "./CommentForm.css";

const CommentForm = ({ onSubmit }) => {
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
      <h2 className="comment-form-header">Add a Comment</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="What are your thoughts?"
          className="comment-input"
        />
        <button type="submit" className="comment-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
