import React, { useState } from "react";
import "./LikeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ postId, liked, setLiked, post }) => {
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [showButtons, setShowButtons] = useState(false);

  const handleLike = () => {
    // Make a POST request to like the post
    fetch(`/posts/${postId}/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setLikesCount(data.likes_count);
        setLiked(true);
        setShowButtons(true);
      })
      .catch((error) => {
        // Handle error if the request fails
        console.error("Error liking post:", error);
      });
  };

  const handleUnlike = () => {
    // Make a DELETE request to unlike the post
    fetch(`/posts/${postId}/likes`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setLikesCount(data.likes_count);
        setLiked(false);
        setShowButtons(true);
      })
      .catch((error) => {
        // Handle error if the request fails
        console.error("Error unliking post:", error);
      });
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



/*
  To handle the like increment logic, you would typically do this on the server-side when a successful like request is made. The server should handle the logic of updating the likes count in the database and then send back the updated count to the client.



*/
