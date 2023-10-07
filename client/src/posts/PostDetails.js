import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import { PostContext } from "../context/post";
import NotFound from "../NotFound";
import CommentForm from "../comments/CommentForm";
import "./PostDetails.css";
import CommentCard from "../comments/CommentCard";

const PostDetails = () => {
  const { posts, setPosts, currentUser } = useContext(PostContext);
  const [post, setPost] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const { id } = useParams();
  const postId = parseInt(id);

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === postId);
    setPost(foundPost);
  }, [id, postId, posts]);

  if (!post) return <NotFound />;

  const commentCount = post.comments.length;
  const singularOrPlural = commentCount === 1 ? "comment" : "comments";

  const handleEditComment = (commentId, editedContent) => {
    // Send a PATCH request to update the comment content
    fetch(`/posts/${postId}/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editedContent }),
    })
      .then((resp) => resp.json())
      .then((updatedComment) => {
        // Update the post object with the updated comment
        const updatedPost = {
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === commentId ? updatedComment : comment
          ),
        };
        // Update the posts state with the updated post object
        const updatedPosts = posts.map((p) =>
          p.id === postId ? updatedPost : p
        );
        setPosts(updatedPosts);
      });
  };

  const handleDeleteComment = (commentId) => {
    // Send a DELETE request to remove the comment
    fetch(`/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    }).then((resp) => {
      if (resp.ok) {
        // Filter out the deleted comment from the comments list
        const updatedComments = post.comments.filter(
          (comment) => comment.id !== commentId
        );
        // Update the post object with the updated comments list
        const updatedPost = {
          ...post,
          comments: updatedComments,
        };
        // Update the posts state with the updated post object
        const updatedPosts = posts.map((p) =>
          p.id === postId ? updatedPost : p
        );
        setPosts(updatedPosts);
      }
    });
  };

  const commentCards =
    showComments &&
    post.comments.map((comment) => (
      <div className="comment-card" key={comment.id}>
        <CommentCard
          comment={comment}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
          currentUser={currentUser}
        />
      </div>
    ));

  const addComment = (newCommentText) => {
    fetch(`/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newCommentText }),
    })
      .then((resp) => resp.json())
      .then((newComment) => {
        // Update the post object with the new comment from the response
        const updatedPost = {
          ...post,
          comments: [...post.comments, newComment],
        };
        // Update the posts state with the updated post object
        const updatedPosts = posts.map((p) =>
          p.id === postId ? updatedPost : p
        );
        setPosts(updatedPosts);
      });
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
