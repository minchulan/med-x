import React, { useContext, useState } from "react";
import "./LikeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { PostContext } from "./context/post";

const LikeButton = ({ post }) => {
  const { updatePostLikesCount, updatePostUnlikesCount } =
    useContext(PostContext);
  const [isLiked, setIsLiked] = useState(post?.liked || false);
  const [loading, setLoading] = useState(false);

  const handleLikeToggle = () => {
    if (loading) {
      return; // Prevent multiple requests while waiting for a response
    }

    setLoading(true);
    const endpoint = isLiked
      ? `/posts/${post.id}/likes/${post.like_id}`
      : `/posts/${post.id}/likes`;

    const method = isLiked ? "DELETE" : "POST";

    fetch(endpoint, {
      method: method,
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (isLiked) {
          updatePostUnlikesCount(post.id, data.likes_count);
        } else {
          updatePostLikesCount(post.id, data.likes_count);
        }
        setIsLiked(!isLiked); // Toggle isLiked state
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
    })
  };

  return (
    <div
      className={`like-count ${isLiked ? "liked" : ""}`}
      onClick={handleLikeToggle}
    >
      <FontAwesomeIcon icon={faThumbsUp} className={"thumbs-up-icon"} />
      {isLiked ? "Liked" : "Like"}: {post?.likes_count || 0}
    </div>
  );
};

export default LikeButton;

/*
  To handle the like increment logic, you would typically do this on the server-side when a successful like request is made. The server should handle the logic of updating the likes count in the database and then send back the updated count to the client.

  if `isLiked` is TRUE or FALSE: 
    - If the post is already liked (isLiked is true), it sends a DELETE request to unlike the post.
    - If the post is not liked (isLiked is false), it sends a POST request to like the post.

  Updating Global State:
    - It calls updateLikeCount(post.id, data.likes_count) from PostContext to update the like count for the specific post in the global state.

    - It calls updateUserLikeCount(post.id) or updateUserUnlikeCount(post.id) from UserContext to update the currentUser state based on the postId.

    - The LikeButton component updates both the posts state and the currentUser state based on the server response after 'liking' or 'un-liking' a post.
*/
