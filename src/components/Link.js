import React from "react";

const Link = ({ name, href }) => {
  return (
    <div className="link item">
      <a href={href} target="_blank" rel="noreferrer">
        {name}
      </a>
    </div>
  );
};

export default Link;
