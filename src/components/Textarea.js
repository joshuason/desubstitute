import React, { useState, useEffect } from 'react';

const Textarea = ({value, onChange}) => {

  const [highlight, setHighlight] = useState({chars: null, isValid: false});
  const [selection, setSelection] = useState({});

  const onClick = (e) => {
    setSelection(window.getSelection());
    const c = selection.toString();
    const v = (c.length === 1);
    setHighlight({chars: c, isValid: v});
    console.log('click')
  }

  const onKeyPress = (e) => {
    const keyPressed = e.key;
    let newValue = (highlight.isValid)
    ? value.replace(highlight.char, keyPressed)
    : value.substring(0, selection.focusOffset) + keyPressed
      + value.substring(selection.focusOffset);
    onChange(newValue);
  }

  return (
    <div id="Textarea">
    Textarea:
      <div
        className="textarea"
        style={textbox}
        tabindex="0"
        onClick={(e) => onClick(e)}
        onKeyPress={(e) => onKeyPress(e)}>
        <p style={{margin: "0"}}>
          {value}
        </p>
      </div>
    </div>
  );
}

const textbox = {
  width: "100%",
  height: "150px",
  margin: "0",
  borderRadius: "0",
  border: "1px solid black",
  textAlign: "left",
  fontFamily: "courier",
  fontSize: "13px"
}

export default Textarea;
