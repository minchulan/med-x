import React, { useContext, useState } from "react";
import "./LikeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { ErrorsContext } from "./context/error";
import { PostContext } from "./context/post";

const LikeButton = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const { setErrors } = useContext(ErrorsContext);
  const { updateLikeCount } = useContext(PostContext);

  const handleLikeToggle = () => {
    if (isLiked) {
      // Unlike the post
      fetch(`/posts/${post.id}/likes/${post.like_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Data from server:", data)
          if (data.ok) {
            setLikesCount(data.likes_count);
            console.log(data.likes_count)
            setIsLiked((isLiked) => !isLiked);
            updateLikeCount(post.id, data.likes_count);
          } else {
            setErrors(data.errors);
          }
        })
    } else {
      // Like the post
      fetch(`/posts/${post.id}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.ok) {
            console.log("Data from server:", data);
            setLikesCount(data.likes_count);
            setIsLiked((isLiked) => !isLiked);
            updateLikeCount(post.id, data.likes_count);
          } else {
            setErrors(data.errors);
          }
        })
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

*/
