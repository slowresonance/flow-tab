import React from "react";
import { useState } from "react";
import Message from "./Message";
import Menu from "./Menu";

const Interface = ({
  rawLinks,
  style,
  editorRef,
  editorMode,
  handleAction,
  setEditorMode,
  createDownload,
}) => {
  const [msgs, setMsgs] = useState([]);
  const handleClick = (mode, action) => {
    handleAction(mode, action);
  };

  const content = editorMode === "links" ? rawLinks : style;

  return (
    <div id="interface">
      {msgs !== [] && <Message msgs={msgs} setMsgs={setMsgs}></Message>}
      {editorMode !== "unset" && (
        <div id="editor">
          <textarea
            name="editor"
            id=""
            cols="30"
            rows="10"
            spellCheck="false"
            autoComplete="chrome-off"
            defaultValue={content}
            ref={editorRef}
          ></textarea>
        </div>
      )}
      <Menu
        editorMode={editorMode}
        setEditorMode={setEditorMode}
        createDownload={createDownload}
        handleClick={handleClick}
        setMsgs={setMsgs}
      ></Menu>
    </div>
  );
};

export default Interface;
