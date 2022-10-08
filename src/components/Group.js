import React from "react";
import Link from "./Link";
import Flow from "./Flow";

const Group = ({ name, contents }) => {
  const renderSwitch = (item, i) => {
    switch (item.type) {
      case "link":
        return <Link name={item.name} href={item.href} key={i}></Link>;
      case "flow":
        return <Flow name={item.name} links={item.links} key={i}></Flow>;
      default:
        return;
    }
  };
  return (
    <div className="group">
      {name && <div className="title">{name}</div>}
      {contents && contents.map((item, i) => renderSwitch(item, i))}
    </div>
  );
};

export default Group;
