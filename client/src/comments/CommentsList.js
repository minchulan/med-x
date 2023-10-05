import React from 'react';
import { NavLink } from 'react-router-dom';

const CommentList = ({ comments }) => {
  return (
    <ul className="comments-list">
      {comments.map((comment) => (
        <li key={comment.id} className="comment-card">
          <p className="comment-text">
            Comment by{" "}
            <NavLink to={`/profile/${comment.user.id}`}>
              {comment.user.username}
            </NavLink>
            : {comment.text}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList