import React from "react";
import classnames from "classnames";
import CommentBox from "../CommentBox";
import "./_styles.scss";
import EmptyList from "../EmptyList";

export const ComponentNest = ({comment}) => {
    return (
        <>
            {comment.depth !== 0 ? <CommentBox key={comment.id} comment={comment}/> : null}

            {
                comment.replies && comment.replies.map((el) => (
                        <ComponentNest key={el.id} comment={el}/>
                    )
                )
            }
        </>
    )

}
const CommentList = ({
                         comments
                     }) => {

    if (!comments || comments.length === 0) {
        return <EmptyList/>
    }
    return (
        <div className="root-list">
            {comments.map((el, idx) => (
                    <>
                        <div
                            data-testid="comment-wrapper"
                            className={classnames({
                                // Should be true for root comment
                                "root-comment": !el.parentId,
                            })}
                            key={el.id}
                        >
                            <CommentBox comment={el}/>
                        </div>

                        {el?.replies?.length !== 0 ? <ComponentNest comment={el}/> : null}

                    </>

                )
            )}
        </div>
    );
};

export default CommentList;
