import React from "react";
import { Link } from "react-router-dom";
import "./MiniatureLikedCard.css";

const MiniatureLikedCard = ({ id, summary }) => {
  return (
    <div className="miniature-liked-card">
      <Link to={`/posts/${id}/likes`}>{summary}</Link>
    </div>
  );
};

export default MiniatureLikedCard;
