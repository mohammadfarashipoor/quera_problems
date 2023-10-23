import Comment from "../components/Comment";
import { dataComments } from "../data/data";
function Comments({ setName, refElement,replayState,setReplayState }) {
  return (
    <div className="wrapper">
      {dataComments.map(({ id, name, message, children }) => (
        <Comment
          key={id}
          id={id}
          name={name}
          message={message}
          children={children}
          setName={setName}
          refElement={refElement}
          replayState={replayState}
          setReplayState={setReplayState}
        />
      ))}
    </div>
  );
}

export default Comments;
