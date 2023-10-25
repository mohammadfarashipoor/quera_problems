import React from "react";
import "./_styles.scss";

const CommentBox = ({ comment }) => {
  return (
    <div data-testid={comment.id} className="comment-box">
      <p className="comment-box__user">
        {comment.user.firstName} {comment.user.lastName}
      </p>
      <p className="comment-box__description">{comment.info.description}</p>
    </div>
  );
};

export default CommentBox;
