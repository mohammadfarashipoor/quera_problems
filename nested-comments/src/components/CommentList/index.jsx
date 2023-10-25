import React from "react";
import classnames from "classnames";
import CommentBox from "../CommentBox";
import "./_styles.scss";

const CommentList = ({ comments }) => {
  return (
    <div className="root-list">
      {comments.map((el, idx) => (
        <div
          data-testid="comment-wrapper"
          className={classnames({
            // Should be true for root comment
            "root-comment": false,
          })}
          key={el.id}
        >
          {
            // Render comment and it's children here use CommentBox
          }
        </div>
      ))}
    </div>
  );
};

export default CommentList;
