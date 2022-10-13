import React, { useState } from "react";
import Group from "./components/Group";
import Notes from "./components/Notes";
import Interface from "./components/Interface";
import "./styling/style.css";
import { useRef } from "react";
import { useEffect } from "react";

const defaultStyling = `--font-family: monospace;
--links-text-color: #ffffff;
--group-title-color: #a3a3a3;
--background-color: #181818;
--notes-title-color: #a3a3a3;
--notes-text-color: #ffffff;
--notes-background: #1c1c1c;
--notes-border: 2px solid #1c1c1c;
--notes-background-hover: #1c1c1c;
--notes-border-hover: 2px solid #1c1c1c;
--editor-text-color: #1c1c1c;
--editor-background: #ffffff;
--menu-text-color: #a3a3a3;
--menu-text-hover-color: #ffffff;
--scrollbar-color: #333333;
--scrollbar-hover-color: #444444;`;

const defaultLinks = `>Links
GitHub (https://github.com/mohanvpatta/flow-tab)
Hello (http://100r.co/site/home.html)
>Music
Study Playlist (https://www.youtube.com/watch?v=tpWLeUt_7Cc&list=PLx65qkgCWNJIs3FPaj8JZhduXSpQ_ZfvL)
---
>Work
My Other Projects (https://eisen.vercel.app/,https://github.com/mohanvpatta/resurrect)`;

const dateToYMD = (date) => {
  const strArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = date.getDate();
  const m = strArray[date.getMonth()];
  const y = date.getFullYear();
  return "" + (d <= 9 ? "0" + d : d) + "-" + m + "-" + y;
};

const _retrive = (name) => {
  if (localStorage.getItem(name)) {
    return JSON.parse(localStorage.getItem(name));
  }
  return null;
};

const _commit = (name, content) => {
  localStorage.setItem(name, JSON.stringify(content));
};

function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

function App() {
  const [rawLinks, setRawLinks] = useState(_retrive("links") || defaultLinks);
  const [notes, setNotes] = useState(_retrive("notes") || "");
  const [style, setStyle] = useState(_retrive("style") || defaultStyling);
  const [editorMode, setEditorMode] = useState("unset");
  const [msgs, setMsgs] = useState([]);
  const editorRef = useRef(null);

  const _parseGroup = (str) => {
    str = str.trim();

    if (str === "" || str === "\n") return;
    const lines = str.split("\n");

    let name = "";
    if (!lines[0].includes("(")) {
      name = lines[0];
    }

    const itemReg = /([a-z A-Z 0-9]*)\((.*)\)/;
    const items = [];
    for (const line of lines) {
      const match = itemReg.exec(line);
      if (match && match.length === 3) {
        if (match[2].includes(",")) {
          items.push({
            name: match[1],
            type: "flow",
            links: match[2].split(","),
          });
        } else {
          items.push({
            name: match[1],
            type: "link",
            href: match[2],
          });
        }
      }
    }
    return {
      name: name,
      contents: items,
    };
  };

  const importData = (event) => {
    setMsgs(["Data has been imported!"]);
    const input = event.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0]);
    }
  };

  const placeFileContent = (file) => {
    console.log(file);
    readFileContent(file).then((content) => {
      content = JSON.parse(content);
      console.log(content);
      setNotes(content.notes);
      setRawLinks(content.rawLinks);
      setStyle(content.style);
    });
  };

  const _parseGroups = (str) => {
    str = str.trim();
    if (str === "") return;
    const groups = [];
    const grpsStrs = str.split(">");
    for (let grpStr of grpsStrs) {
      grpStr = grpStr.trim();
      if (grpStr !== "") {
        groups.push(_parseGroup(grpStr));
      }
    }
    return groups;
  };

  const parseLinks = (str) => {
    if (str === "") return [[], []];
    const secStrs = str.split("---");
    const sections = secStrs.map((secStr) => _parseGroups(secStr));
    return sections;
  };

  const applyColors = (style) => {
    const colors = parseStyle(style);
    for (const color of colors) {
      document
        .querySelector(":root")
        .style.setProperty(`--${color.key}`, color.value);
    }
  };

  const parseStyle = (style) => {
    const styles = style
      .split("\n")
      .filter((line) => line !== "")
      .map((line) => {
        let [key, value] = line.split(":");
        const match = /--(.*)/g.exec(key);
        value = value.trim().split(";")[0];
        return {
          key: match[1],
          value: value,
        };
      });
    return styles;
  };

  const links = parseLinks(rawLinks);
  applyColors(style);

  const handleAction = (item, action) => {
    switch (action) {
      case "save":
        if (item === "links") {
          setRawLinks(editorRef.current.value || "");
        }
        if (item === "style") {
          setStyle(editorRef.current.value || defaultStyling);
        }
        if (item === "notes") {
          setNotes(_retrive("notes") || "");
        }
        break;
      case "reset":
        setStyle(defaultStyling);
        break;
      case "close":
        setEditorMode("unset");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    _commit("links", rawLinks);
  }, [rawLinks]);

  useEffect(() => {
    _commit("style", style);
  }, [style]);

  useEffect(() => {
    _commit("notes", notes);
  }, [notes]);

  const createDownload = () => {
    const filename = `flowtab-${dateToYMD(new Date())}.json`;
    const blob = new Blob(
      [
        JSON.stringify({
          rawLinks: rawLinks,
          notes: notes,
          style: style,
        }),
      ],
      {
        type: "text/json",
      }
    );

    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(
      ":"
    );

    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(event);
    link.remove();
  };

  return (
    <div id="app">
      <div id="grid">
        <div id="links">
          <div className="section" id="s01">
            {links[0] &&
              links[0].map((group, i) => (
                <Group
                  name={group.name}
                  contents={group.contents}
                  key={i}
                ></Group>
              ))}
          </div>
          <div className="section" id="s02">
            {links[1] &&
              links[1].map((group, i) => (
                <Group
                  name={group.name}
                  contents={group.contents}
                  key={i}
                ></Group>
              ))}
          </div>
        </div>
        <div id="notes">
          {
            <Notes
              notes={notes}
              setNotes={setNotes}
              handleAction={handleAction}
            ></Notes>
          }
        </div>
      </div>
      <Interface
        rawLinks={rawLinks}
        style={style}
        editorMode={editorMode}
        importData={importData}
        setEditorMode={setEditorMode}
        handleAction={handleAction}
        createDownload={createDownload}
        editorRef={editorRef}
        msgs={msgs}
        setMsgs={setMsgs}
      ></Interface>
    </div>
  );
}

export default App;
