import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

const CommentCard = ({ comment, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useContext(UserContext);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSaveEdit = () => {
    // Call the onEdit function passed as a prop with the updated content
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Call the onDelete function passed as a prop with the comment id
    onDelete(comment.id);
  };

  const isOwner = comment.user.id === currentUser.id;

  return (
    <div className="comment-card">
      <p>By: {comment.user.username}</p>
      {isEditing ? (
        <div>
          <textarea
            className="comment-textarea"
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
          {/* Show edit and delete buttons only if the current user is the author of the comment */}
          {isOwner && (
            <div className="comment-actions">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
