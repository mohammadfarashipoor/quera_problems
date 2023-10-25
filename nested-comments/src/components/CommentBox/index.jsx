import React from "react";
import "./_styles.scss";

const CommentBox = ({comment}) => {

    return (
        <>
            <div data-testid={comment.id} className="comment-box" style={{marginLeft:`${comment.depth*16}px`}}>
                <p className="comment-box__user">
                    {comment.user.firstName} {comment.user.lastName}
                </p>
                <p className="comment-box__description">{comment.info.description}</p>
            </div>
            {/*{*/}
            {/*    comment.replies && comment.replies.map((el) => (*/}
            {/*        <CommentBox key={el.id}  comment={el}/>*/}
            {/*    ))*/}
            {/*}*/}
        </>
    );
};

export default CommentBox;
