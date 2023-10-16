import React, { useContext, useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { PostContext } from "../context/post";
import CommentForm from "../comments/CommentForm";
import "./PostDetails.css";
import CommentCard from "../comments/CommentCard";
import LikeButton from "../LikeButton";
import comment from "../asset/comment.png";
import LoadingSpinner from "../LoadingSpinner";

const PostDetails = ({ loading }) => {
  const { posts } = useContext(PostContext);
  const { id } = useParams();
  const postId = parseInt(id);
  const [post, setPost] = useState(null);
  const comments = post?.comments || [];
  const commentCount = comments.length;
  const singularOrPlural = commentCount === 1 ? "comment" : "comments";

  // Find post details based on postId
  useEffect(() => {
    const selectPost = posts.find((post) => post.id === postId);
    setPost(selectPost);
  }, [postId, posts]);

  if (loading || !post) return <LoadingSpinner />;

  return (
    <div className="post-details-container">
      <h1 className="post-header">{post.title}</h1>
      <p className="post-author">
        Posted by{" "}
        <NavLink to={`/users/${post.user.id}`}>u/{post.user.username}</NavLink>
      </p>
      <p className="post-content">{post.content}</p>
      <div className="counts-container">
        <p className="comment-count">
          <img src={comment} alt="Comment Icon" className="comment-icon" />{" "}
          {commentCount} {singularOrPlural}
        </p>
        <LikeButton postId={post.id} liked={post.liked} post={post} />
      </div>

      <CommentForm postId={post.id} />
      <ul className="comments-list">
        {post.comments.map((comment) => (
          <div className="comment-card" key={comment.id}>
            <CommentCard comment={comment} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PostDetails;
