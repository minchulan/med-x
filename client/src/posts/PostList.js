import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import { PostContext } from "../context/post";
import { ErrorsContext } from "../context/error";
import PostCard from "./PostCard";
import "./PostList.css";
import LoadingSpinner from "../LoadingSpinner";

// EXPLORE PAGE
const PostList = ({ loading }) => {
  const { loggedIn } = useContext(UserContext);
  const { posts, deletePost } = useContext(PostContext);
  const { setErrors } = useContext(ErrorsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/login");
    }
    setErrors([]);
  }, [loading, loggedIn, navigate, setErrors]);

  const postCards =
    posts &&
    posts.map((post) => (
      <PostCard key={post.id} post={post} deletePost={deletePost} />
    ));

  if (!posts) return <LoadingSpinner />;

  return (
    <div className="post-list-container">
      <h2>Posts </h2>
      <div className="post-list">{postCards}</div>
    </div>
  );
};

export default PostList;
