import React from "react";
import { useState } from "react";

const Menu = ({
  editorMode,
  setEditorMode,
  createDownload,
  handleClick,
  importData,
  setMsgs,
}) => {
  const [menuActive, setMenuActive] = useState(false);
  const [resetConfirmCounter, setResetConfirmCounter] = useState(0);

  return (
    <>
      <div
        id="menu"
        onMouseEnter={() => setMenuActive(true)}
        onMouseLeave={() => setMenuActive(false)}
        className={`${(menuActive || editorMode !== "unset") && "active"}`}
      >
        <span id="left">
          <span
            id="name"
            tabIndex="0"
            className={`item ${
              (menuActive || editorMode !== "unset") && "active"
            }`}
          >
            Flowtab
          </span>
          {editorMode === "unset" && menuActive && (
            <>
              <span
                className="item"
                tabIndex="0"
                onClick={() => {
                  setEditorMode("links");
                }}
              >
                Edit Links
              </span>
              <span
                className="item"
                tabIndex="0"
                onClick={() => {
                  setEditorMode("style");
                }}
              >
                Edit Styling
              </span>
              <span className="item">
                <label
                  onClick={() => {
                    setMsgs([
                      "Select a file to import data",
                      "Note: this resets your current data",
                    ]);
                  }}
                >
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file-input"
                    onChange={importData}
                  />
                  Import
                </label>
              </span>
              <span
                className="item"
                onClick={() => {
                  createDownload();
                  setMsgs(["All your links, notes and styling are exported!"]);
                }}
              >
                Export
              </span>
            </>
          )}
        </span>
        {editorMode === "links" && (
          <>
            <span className="right">
              <span
                className="item"
                tabIndex="0"
                onClick={() => {
                  handleClick(editorMode, "close");
                  setMsgs(["Done!"]);
                }}
              >
                Close
              </span>
              <span
                className="item"
                tabIndex="0"
                onClick={() => {
                  handleClick(editorMode, "save");
                  setMsgs([
                    "All changes saved!",
                    "You can safely close the editor",
                  ]);
                }}
              >
                Save
              </span>
            </span>
          </>
        )}
        {editorMode === "style" && (
          <>
            <span className="right">
              <span
                className="item"
                tabIndex="0"
                onClick={() => {
                  if (resetConfirmCounter === 0) {
                    setResetConfirmCounter(1);
                    setMsgs([
                      "This resets all the styling to default",
                      "Click again to confirm",
                    ]);
                  } else {
                    handleClick(editorMode, "reset");
                    setMsgs(["Okay! Just making sure."]);
                    setResetConfirmCounter(0);
                  }
                }}
              >
                {resetConfirmCounter === 0 ? "Reset" : "Yep, Reset"}
              </span>
              <span
                className="item"
                tabIndex="0"
                onClick={() => {
                  handleClick(editorMode, "close");
                  setMsgs(["Done!"]);
                }}
              >
                Close
              </span>
              <span
                className="item"
                tabIndex="0"
                onClick={() => {
                  handleClick(editorMode, "save");
                  setMsgs([
                    "All changes saved!",
                    "You can safely close the editor",
                  ]);
                }}
              >
                Save
              </span>
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Menu;
