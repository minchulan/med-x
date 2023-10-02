import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/post";
import NotFound from "../NotFound";
import CommentCard from "../comments/CommentCard";
import "./PostDetails.css";

const PostDetails = () => {
  const [showComments, setShowComments] = useState(false);
  const [post, setPost] = useState(null);

  const { posts } = useContext(PostContext);
  const { id } = useParams();

    useEffect(() => {
      // Do not fetch again here.
    if (posts && posts.length > 0) {
      const currentPost = posts.find((post) => post.id === parseInt(id));
      setPost(currentPost);
    }
  }, [id, posts, setPost]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (!post) return <NotFound />;

  const commentCount = post.comments.length;
  const commentText = commentCount === 1 ? "comment" : "comments";
  const commentCards =
    showComments &&
    post.comments.map((comment) => (
      <CommentCard key={comment.id} comment={comment} post={post} />
    ));

  return (
    <div>
      <h1>Post Details</h1>
      <p onClick={toggleComments}>
        <u>{commentCount}{" "}{commentText}</u>
      </p>
      {showComments && <ul>{commentCards}</ul>}
    </div>
  );
};

export default PostDetails;
