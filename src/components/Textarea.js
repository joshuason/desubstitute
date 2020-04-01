import React, { useRef } from 'react';

const Textarea = ({value, onValueChanged}) => {

  const highlightDiv = useRef(null);

  return (
    <div id="Textarea">
    Workarea:
      <div className="container">
        <div
          ref={highlightDiv}
          className="textarea"
          style={textboxStyle}
        >
          {value}
        </div>
        <textarea
          value={value}
          style={textareaStyle}
          onChange={e => onValueChanged(e.target.value.toUpperCase())}
          // onClick={e => handleSelect(e)}
          // onBlur={e => handleBlur(e)}
          // onScroll={e => handleScroll(e)}
          // onKeyDown={e => handleKeyDown(e)}
          // onKeyUp={e => console.log('Caret at: ', e.target.selectionStart)}
          // onPaste={e => handlePaste(e)}
        />
      </div>
    </div>
  );
}

/*
//-- METHODS --//
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
// Returns true if valid letter
function isValidKey(key) {
  (key.length === 1) && (key.match(/[a-z]/i));
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
/*
const highlightStyle = {
  backgroundColor: "yellow"
}

const casperStyle = {
  color: "grey",
  backgroundColor: "lightgrey",
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
}
*/

export default Textarea;
