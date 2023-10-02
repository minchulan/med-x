import React from "react";
import { NavLink } from "react-router-dom";
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
  const { id, title, user, summary, created_at } = post;
  const timeAgo = calculateTimeAgo(created_at);

  return (
    <div className="post-card">
      <NavLink to={`/posts/${id}`}>
        <h2 className="post-title">{title}</h2>
      </NavLink>
      <div className="post-meta">
        <span>Posted by u/{user.username}</span>
        <span>{timeAgo}</span>
      </div>
      <p className="post-content">{summary}</p>
    </div>
  );
};

export default PostCard;

// useLocation hook to conditionally display comments here only if we are in the show page
