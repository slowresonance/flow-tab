import React from "react";
import { useState } from "react";
import { WindupChildren, Pause, Pace } from "windups";

const Message = ({ msgs, setMsgs }) => {
  const [tid, setTid] = useState(undefined);
  return (
    <div id="msg-board" className={`${tid && "board-active"}`}>
      <WindupChildren
        onFinished={() => {
          if (typeof tid === "number") {
            clearTimeout(tid);
          }
          setTid(setTimeout(() => setMsgs([]), 7000));
        }}
      >
        {msgs.map((msg) => (
          <Pace ms={20} key={msg}>
            <div className="msg fade-out">{msg}</div>
            <Pause ms={500} />
          </Pace>
        ))}
      </WindupChildren>
    </div>
  );
};

export default Message;
