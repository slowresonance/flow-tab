/*global chrome*/
import React from "react";

const Flow = ({ name, links }) => {
  const handleClick = () => {
    links.map((link) => chrome.tabs.create({ url: link }, () => {}));
  };
  return (
    <a
      className="flow item"
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      href={`https://flow.tab/🪝opening a flow with ${links.length} links`}
    >
      {name}
    </a>
  );
};

export default Flow;
