import React, { useContext, useState } from "react";
import "./LikeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { PostContext } from "./context/post";

const LikeButton = ({ post, username }) => {
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
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        if (isLiked) {
          updatePostUnlikesCount(post.id, data.likes_count, username);
        } else {
          updatePostLikesCount(post.id, data.likes_count, username);
        }
        setIsLiked(!isLiked);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className={`like-count ${isLiked ? "liked" : ""}`}
      onClick={handleLikeToggle}
    >
      <FontAwesomeIcon icon={faThumbsUp} className={"thumbs-up-icon"} />
      {isLiked ? "Liked" : "Like"}: {post?.likes_count}
    </div>
  );
};

export default LikeButton;