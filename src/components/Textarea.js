import React, { useRef, useState, useEffect } from 'react';

const Textarea = ({value, onValueChanged}) => {

  const [selection, setSelection] = useState("");
  const highlightDiv = useRef(null);
  const highlightLocations = selection && getHighlights(value, selection);

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

function getHighlights(text, selected) {
  const { length: tLength } = text;
  const { length: hLength } = selected;
  const locations = text.split('').reduce((acc, cur, begin, arr) => {
    const end = begin + hLength;
    if ((end <= tLength) && (arr.slice(begin, end).join('') === selected)) {
      acc.push([begin, end]);
    }
    return acc;
  }, []);
  console.log("locations",locations);
  return locations;
}

/*
function getOverlappedHighlights(highlightLocations) {
  const obj = highlightLocations.reduce((acc, cur, idx, src) => {
    const length = cur[1] - cur[0]; // or pass length as argument
    const value = src.filter(arr => {})
    acc = {...acc, [cur]: value}
    return acc;
  }, []);
  return obj;
}
*/

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
