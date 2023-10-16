import React, { useState, useEffect } from "react";
import "./LikeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ postId, liked, post }) => {
  console.log(post)
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
        console.log(data);
        setLikesCount(data.likes_count);
        setShowButtons(true);
      })
      .catch((error) => {
        // Handle error if the request fails
        console.error("Error liking post:", error);
      });
  };

const handleUnlike = () => {
  // Make a DELETE request to unlike the post
  fetch(`/posts/${postId}/likes/${post.like_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data); // Log the response data to see the actual response

      // Check if the response contains likes_count
      if (data.likes_count !== undefined) {
        // Update likesCount with the new value from the response
        setLikesCount(data.likes_count);
      } else {
        // Handle error if the response does not contain likes_count
        console.error("Invalid server response:", data);
      }

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
          <button
            onClick={handleLike}
            className={`like-button ${liked ? "liked" : ""}`}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="thumbs-up-icon" />
          </button>
          <button
            onClick={handleUnlike}
            className={`like-button ${liked ? "" : "disliked"}`}
          >
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
