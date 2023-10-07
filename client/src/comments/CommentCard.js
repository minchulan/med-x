import React from "react";

const CommentCard = ({ comment }) => {
    console.log(comment)
  return (
    <div>
          <p>By: {comment.user.username}{comment.created_at}</p>
      <p>{comment.content}</p>
    </div>
  );
};

export default CommentCard;
