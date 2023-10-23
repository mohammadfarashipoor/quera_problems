import React from "react";
// import SelectBox from "./SelectBox";
function AddComment() {
  return (
    <div className="ac-wrapper">
      <h2 className="addCommentTitle">Write your comment:</h2>
      <form action="" className="form">
        <input placeholder="name" type="text" />
        <input placeholder="email" type="text" />
        {/* SelectBox */}
        <textarea
          placeholder="message..."
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button>Send</button>
        {/* Cancell Button */}
      </form>
    </div>
  );
}

export default AddComment;
