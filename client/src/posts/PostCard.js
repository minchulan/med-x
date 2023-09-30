import React from "react";
import "./PostCard.css"; 
const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-content">{post.content}</p>
    </div>
  );
};

export default PostCard;
