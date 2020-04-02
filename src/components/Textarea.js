import React, { useRef, useState } from 'react';

const Textarea = ({value, onValueChanged}) => {

  const [selection, setSelection] = useState("");
  const highlightDiv = useRef(null);

  const resetSelection = () => {
    setSelection("");
  }

  // Syncs the highlight div to the textarea
  const handleScroll = e => {
    var scrollTop = e.target.scrollTop;
    highlightDiv.current.scrollTop = scrollTop;
  }

  const handleSelect = e => {
    const {selectionStart, selectionEnd} = e.target;
    const selected = value.substring(selectionStart, selectionEnd);
    console.log(selectionStart, selectionEnd, selected);
    setSelection(selected);
  }

  const handleBlur = e => {
    resetSelection();
  }

  const handleMouseDown = e => {
    resetSelection();
  }

  return (
    <div id="Textarea">
    Workarea:
      <div className="container">
        <div
          ref={highlightDiv}
          className="highlights"
          style={textboxStyle}
        >
          {
            value
          }
        </div>
        <textarea
          value={value}
          style={textareaStyle}
          onChange={e => onValueChanged(e.target.value)}
          onScroll={handleScroll}
          onSelect={handleSelect}
          onBlur={handleBlur}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
}


//-- STYLES --//
const textboxStyle = {
  position: "relative",
  top: "0",
  left: "0",
  maxWidth: "100%",
  height: "150px",
  margin: "0",
  borderRadius: "0",
  border: "1px solid black",
  textAlign: "left",
  fontFamily: "courier",
  fontSize: "13px",
  overflowY: "auto",
  overflowX: "hidden",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  color: "black",
  letterSpacing: "0.1rem"
}

const textareaStyle = {
  position: "relative",
  top: "-150px",
  left: "0px",
  width: "100%",
  height: "150px",
  margin: "0",
  borderRadius: "0",
  border: "1px solid black",
  textAlign: "left",
  fontFamily: "courier",
  fontSize: "13px",
  backgroundColor: "rgba(255, 255, 255, 0)",
  color: "rgba(255, 255, 255, 0)",
  cursor: "text",
  caretColor: "black",
  letterSpacing: "0.1rem",
}

const highlightStyle = {
  backgroundColor: "yellow"
}
/*
const casperStyle = {
  color: "grey",
  backgroundColor: "lightgrey",
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
}
*/

export default Textarea;
