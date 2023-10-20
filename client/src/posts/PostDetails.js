import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { PostContext } from "../context/post";
import CommentForm from "../comments/CommentForm";
import "./PostDetails.css";
import CommentCard from "../comments/CommentCard";
import LikeButton from "../LikeButton";
import comment from "../asset/comment.png";
import LoadingSpinner from "../LoadingSpinner";
import { UserContext } from "../context/user";

const PostDetails = ({ loading }) => {
  const { posts, setPosts } = useContext(PostContext);
  const { currentUser, setCurrentUser, loggedIn } = useContext(UserContext);
  const { id } = useParams();
  const postId = parseInt(id);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const comments = post?.comments || [];
  const commentCount = comments.length;
  const singularOrPlural = commentCount === 1 ? "comment" : "comments";

  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/login")
    }

    const selectPost = posts.find((post) => post.id === postId);
    setPost(selectPost);

  }, [currentUser, loading, loggedIn, navigate, postId, posts]);



  // EDIT COMMENT
  const handleEditComment = (commentId, editedContent) => {
    fetch(`/posts/${post.id}/comments/${commentId}`, {
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

  // DELETE COMMENT
  const handleDeleteComment = (commentId) => {
    fetch(`/comments/${commentId}`, {
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

  // ADD COMMENT
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
          comments: [newComment, ...post.comments],
        };
        // Update the posts state with the updated post object
        const updatedPosts = posts.map((p) =>
          p.id === postId ? updatedPost : p
        );
        setPosts(updatedPosts);
        // Update currentUser state to reflect new comment
        const updatedUser = {
          ...currentUser,
          comments: [...currentUser.comments, newComment],
        };
        setCurrentUser(updatedUser);
      });
  };

  // RENDER COMMENT CARDS
  const commentCards =
    post &&
    post.comments.map((comment) => (
      <div className="comment-card" key={comment.id}>
        {comment && (
          <CommentCard
            key={comment.id}
            comment={comment}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
            currentUser={currentUser}
          />
        )}
      </div>
    ));

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
        {currentUser && <LikeButton post={post} username={currentUser.username} />}
      </div>

      <CommentForm onSubmit={addComment} post_id={post.id} />
      <ul className="comments-list">{commentCards}</ul>
    </div>
  );
};

export default PostDetails;
