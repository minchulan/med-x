import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/post";
import NotFound from "../NotFound";
import CommentForm from "../comments/CommentForm";
import "./PostDetails.css";

const PostDetails = () => {
  const [showComments, setShowComments] = useState(false);
  const [post, setPost] = useState(null);

  const { posts } = useContext(PostContext);
  const { id } = useParams();

  useEffect(() => {
    if (posts && posts.length > 0) {
      const currentPost = posts.find((post) => post.id === parseInt(id));
      setPost(currentPost);
    }
  }, [id, posts, setPost]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const addComment = (newCommentText) => {
    const newComment = {
      id: Math.random(), // Generate a unique ID for the new comment (for demo purposes)
      text: newCommentText,
    };

    // Update the post object with the new comment
    const updatedPost = {
      ...post,
      comments: [...post.comments, newComment],
    };

    // Update the post state with the updated post object
    setPost(updatedPost);
  };

  if (!post) return <NotFound />;

  const commentCount = post.comments.length;
  const commentText = commentCount === 1 ? "comment" : "comments";
  const commentCards =
    showComments &&
    post.comments.map((comment) => (
      <div className="comment-card" key={comment.id}>
        <p className="comment-text">{comment.text}</p>
      </div>
    ));

  return (
    <div className="post-details-container">
      <h1 className="post-header">{post.title}</h1>
      <p className="post-author">By: {post.user.username}</p>
      <p className="post-content">{post.content}</p>
      <p className="comment-count" onClick={toggleComments}>
        {commentCount} {commentText}
      </p>
      {showComments && <CommentForm onSubmit={addComment} />}
      {showComments && <ul className="comments-list">{commentCards}</ul>}
    </div>
  );
};

export default PostDetails;
