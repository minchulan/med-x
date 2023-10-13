// MiniaturePostCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./MiniaturePostCard.css"; // Create a CSS file for styling

const MiniaturePostCard = ({ id, summary }) => {
  return (
    <div className="miniature-post-card">
      <Link to={`/posts/${id}`}>{summary}</Link>
    </div>
  );
};

export default MiniaturePostCard;
