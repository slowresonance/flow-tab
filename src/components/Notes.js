import React, { useRef, useState, useEffect } from "react";

const Notes = ({ notes, setNotes }) => {
  const textareaRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(notes);

  useEffect(() => {
    textareaRef.current.style.height = "0px";
    const scrollHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = scrollHeight + "px";
  }, [currentValue]);

  // + 23

  const handleBlur = () => {
    setNotes(currentValue);
  };

  return (
    <>
      <div className="title">Notes</div>
      {
        <textarea
          tabIndex="5"
          ref={textareaRef}
          name="notes"
          spellCheck="false"
          autoComplete="chrome-off"
          id=""
          defaultValue={currentValue}
          onChange={(e) => {
            setCurrentValue(e.target.value);
          }}
          onBlur={handleBlur}
        ></textarea>
      }
    </>
  );
};

export default Notes;
