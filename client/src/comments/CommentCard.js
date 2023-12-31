import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import PostMeta from "../posts/PostMeta";
import "./CommentCard.css";
import LoadingSpinner from "../LoadingSpinner";

const CommentCard = ({ comment, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { currentUser } = useContext(UserContext);

  if (!comment || !comment.user || !comment.user.id) {
    return <LoadingSpinner />;
  };

  const username = comment.user ? comment.user.username : "";
  const id = comment.id || "";
  const isOwner = comment?.user?.id === currentUser?.id;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    // Call the onEdit function passed as a prop with the updated content
    onEdit(id, editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Call the onDelete function passed as a prop with the comment id
    onDelete(id);
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className={`comment-card ${isOwner ? "owner" : ""}`}>
      <PostMeta username={username} createdAt={comment.created_at} />
      {isOwner && (
        <div className="comment-menu">
          <button className="menu-button" onClick={toggleMenu}>
            <b>⋮</b>
          </button>
          {isMenuVisible && (
            <div>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      )}
      {isEditing ? (
        <div>
          <textarea
            className="comment-textarea"
            id="editedContent"
            name="editedContent"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="comment-buttons">
            <button onClick={handleSaveEdit}>Save</button>
            <button className="cancel" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>{comment.content}</p>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
