import React, {useEffect, useRef, useState} from "react";
import AddComment from "./components/AddComment";
import Comments from "./container/Comments";
import Post from "./components/Post";
import "./App.css";
import Rate from "./components/Rate";
function App() {
    const [replayState,setReplayState]=useState({replayTo:'',replayStatus:false})
    const refAddComment = useRef(null)
    useEffect(() => {
        if(replayState.replayStatus){
            refAddComment.current.scrollIntoView()
        }
    }, [replayState]);
    return (
    <div className="app">
      <Post />
      <Rate />
      <AddComment refAddComment={refAddComment} replayState={replayState} setReplayState={setReplayState}/>
      <Comments replayState={replayState} setReplayState={setReplayState}/>
    </div>
  );
}

export default App;
