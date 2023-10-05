import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import { PostContext } from "../context/post";
import NotFound from "../NotFound";
import CommentForm from "../comments/CommentForm";
import "./PostDetails.css";
import CommentCard from "../comments/CommentCard";

const PostDetails = () => {
  const { posts } = useContext(PostContext);
  const [post, setPost] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const { id } = useParams();
  const postId = parseInt(id);

  console.log(post)

  useEffect(() => {
    const foundPost = posts.find((post) => post.id === postId);
    setPost(foundPost);
  }, [id, postId, posts]);

  if (!post) return <NotFound />;

  const commentCount = post.comments.length;
  const singularOrPlural = commentCount === 1 ? "comment" : "comments";

  const commentCards =
    showComments &&
    post.comments.map((comment) => (
      <div className="comment-card" key={comment.id}>
        <CommentCard comment={comment} />
      </div>
    ));

  const addComment = (newCommentText) => {
    const newComment = {
      id: Math.random(), // hard coded dummy data
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

  return (
    <div className="post-details-container">
      <h1 className="post-header">{post.title}</h1>
      <p className="post-author">
        By: <NavLink to={`/user/${post.user.id}`}>{post.user.username}</NavLink>
      </p>
      <p className="post-content">{post.content}</p>
      <p
        className="comment-count"
        onClick={() => setShowComments(!showComments)}
      >
        {commentCount} {singularOrPlural}
      </p>
      {showComments && <CommentForm onSubmit={addComment} />}
      {showComments && <ul className="comments-list">{commentCards}</ul>}
    </div>
  );
};

export default PostDetails;
