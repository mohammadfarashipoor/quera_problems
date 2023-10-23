import React from "react";
import SelectBox from "./SelectBox";

function AddComment({refAddComment,replayState, setReplayState}) {
    const {replayStatus, replayTo} = replayState;

    function cancelReplayAction() {
        setReplayState({replayTo: '', replayStatus: false})
    }

    return (
        <div className="ac-wrapper" ref={refAddComment}>
            <h2 className="addCommentTitle">{replayStatus ? `Write your comment in response to ${replayTo}` : 'Write your comment:'}</h2>
            <form action="" className="form">
                <input placeholder="name" type="text"/>
                <input placeholder="email" type="text"/>
                {
                    !replayStatus &&
                    <SelectBox/>
                }
                <textarea
                    placeholder="message..."
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                ></textarea>
                <button>Send</button>
                {
                    replayStatus && <button onClick={cancelReplayAction}>Cancel</button>
                }
                {/* Cancell Button */}
            </form>
        </div>
    );
}

export default AddComment;
