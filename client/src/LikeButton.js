import React, { useContext, useEffect, useState } from "react";
import "./LikeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { PostContext } from "./context/post";

const LikeButton = ({ post }) => {
  const { updatePostLikesCount, updatePostUnlikesCount } =
    useContext(PostContext);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    setIsLiked(post.liked);
    setLikesCount(post.likes_count);
  }, [post.liked, post.likes_count]);

  const handleLikeToggle = () => {
    if (isLiked) {
      fetch(`/posts/${post.id}/likes/${post.like_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setLikesCount(data.likes_count);
          updatePostLikesCount(post.id, data.likes_count);
          setIsLiked(false); // Set isLiked to false after successful unlike
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      fetch(`/posts/${post.id}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setLikesCount(data.likes_count);
          updatePostUnlikesCount(post.id, data.likes_count);
          setIsLiked(true); // Set isLiked to true after successful like
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="like-count" onClick={handleLikeToggle}>
      <FontAwesomeIcon
        icon={faThumbsUp}
        className={`thumbs-up-icon ${isLiked ? "liked" : ""}`}
      />
      Likes: {likesCount}
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
