import React, { useState, useEffect } from 'react';

const Textarea = ({value, onChange}) => {
/*
  const [highlight, setHighlight] = useState({chars: null, isValid: false});
  const [selection, setSelection] = useState({});
*/

  const [textarea, setTextarea] = useState("");
  useEffect(() => {
    setTextarea(value);
  }, [value]);

  const onMouseMove = (e) => {
    console.log(e);
  }

  return (
    <div id="Textarea">
    Textarea:
      <div class="container">
        <div
          className="textarea"
          style={textboxStyle}>
          {textarea}
        </div>
        <textarea
          value={textarea}
          style={textareaStyle}
          onMouseMove={e => onMouseMove(e)}
        />
      </div>
    </div>
  );
}

const textboxStyle = {
  position: "relative",
  top: "0",
  left: "0",
  width: "100%",
  height: "150px",
  margin: "0",
  borderRadius: "0",
  border: "1px solid black",
  textAlign: "left",
  fontFamily: "courier",
  fontSize: "13px",
  overflow: "auto"
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
}

export default Textarea;
