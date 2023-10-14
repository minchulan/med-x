import React, { useState } from "react";
import "./LikeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ post }) => {
  const [likesCount, setLikesCount] = useState(
    post.likes ? post.likes.length : 0
  );
  const [showButtons, setShowButtons] = useState(false);

  const handleLike = () => {
    // Make a POST request to like the post
    // For example: fetch('/likeEndpoint', { method: 'POST' })
    // Update likeCount after successful request
    setLikesCount((likesCount) => likesCount + 1);
    setShowButtons(true); // Show buttons after clicking like count
  };

  const handleUnlike = () => {
    // Make a DELETE request to unlike the post
    // For example: fetch('/unlikeEndpoint', { method: 'DELETE' })
    // Update likeCount after successful request, ensuring it doesn't go below 0
    setLikesCount(Math.max(0, likesCount - 1));
    setShowButtons(true); // Show buttons after clicking like count
  };

  return (
    <div className="like-count" onClick={() => setShowButtons(!showButtons)}>
      Likes: {likesCount}
      {showButtons && (
        <div className="like-button-container">
          <button onClick={handleLike} className="like-button">
            <FontAwesomeIcon icon={faThumbsUp} className="thumbs-up-icon" />
          </button>
          <button onClick={handleUnlike} className="like-button">
            <FontAwesomeIcon icon={faThumbsDown} className="thumbs-down-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
