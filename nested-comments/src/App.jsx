import React from "react";
import CommentList from "./components/CommentList";

const App = ({ comments }) => {
  // You should reformat comments based on requirements
  function sortCommentsWithDepth(comments) {
    if(!comments){
      return undefined
    }
    const commentMap = new Map();

    // ساخت نقشه کامنت‌ها بر اساس id
    comments.forEach(comment => {
      commentMap.set(comment.id, comment);
    });

    // تابع بازگشتی برای محاسبه عمق کامنت‌ها
    function calculateDepth(comment) {
      let depth = 0;
      let parentComment = commentMap.get(comment.parentId);
      while (parentComment) {
        depth++;
        parentComment = commentMap.get(parentComment.parentId);
      }
      return depth;
    }

    // تابع بازگشتی برای ساخت درخت کامنت‌ها
    function buildCommentTree(comment) {
      const parentComment = commentMap.get(comment.parentId);
      if (parentComment) {
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        if(!parentComment.replies.includes(comment)){
          parentComment.replies.push(comment);
        }
      } else {
        sortedComments.push(comment);
      }
    }

    const sortedComments = [];

    comments.forEach(comment => {
      comment.depth = calculateDepth(comment);
      buildCommentTree(comment);
    });

    return sortedComments;
  }


  const sortedCommentsWithDepth = sortCommentsWithDepth(comments);

  return <CommentList comments={sortedCommentsWithDepth} />;
};

export default App;
