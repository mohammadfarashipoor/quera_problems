import React from "react";
import AddComment from "./components/AddComment";
import Comments from "./container/Comments";
import Post from "./components/Post";
import "./App.css";
import Rate from "./components/Rate";
function App() {
  return (
    <div className="app">
      <Post />
      <Rate />
      <AddComment />
      <Comments />
    </div>
  );
}

export default App;
