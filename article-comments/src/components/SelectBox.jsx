import { useEffect, useState } from "react";
function SelectBox() {
  const closeStyle = {
    padding: 0,
    height: 0,
    overflow: "hidden",
  };

  return (
    <div className="c-box">
      <input className="tpc" placeholder="topic" type="text" />
      <div className="c-selectbox">{/* Render Topic List */}</div>
    </div>
  );
}

export default SelectBox;
