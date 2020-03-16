import React, { useState, useEffect } from 'react';

const Textarea = ({value, onChange}) => {

  const [highlight, setHighlight] = useState({chars: null, isValid: false});
  const [textarea, setTextarea] = useState("");
/*
  const [selection, setSelection] = useState({});
*/
  useEffect(() => {
    setTextarea(value);
  }, [value]);

  useEffect(() => {
    setHighlight({chars: null, isValid: false});
  }, [textarea]);

  useEffect(() => {
    if (!highlight.isValid) {
      return;
    }
  }, [highlight]);

  const handleSelect = e => {
    const {selectionStart, selectionEnd} = e.target;
    const selected = textarea.substring(selectionStart, selectionEnd);
    console.log(selectionStart, selectionEnd, selected);
    setHighlight({chars: selected, isValid: (selected.length !== 0)});
  }

  const handleChange = e => {
    const { value } = e.target;
    setTextarea(value);
  }

  return (
    <div id="Textarea">
    Textarea:
      <div className="container">
        <div
          className="textarea"
          style={textboxStyle}>
          {textarea}
        </div>
        <textarea
          value={textarea}
          style={textareaStyle}
          onChange={e => handleChange(e)}
          onClick={e => handleSelect(e)}
          onBlur={() => setHighlight({chars: null, isValid: false})}
        />
      </div>
    </div>
  );
}

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
  caretColor: "rgba(0, 0, 0, 100)",
}

export default Textarea;
