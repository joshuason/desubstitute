import React, { useState, useEffect, useRef } from 'react';

const Textarea = ({value, title, onChange}) => {

  const [highlight, setHighlight] = useState({chars: null, isValid: false});
  const [casper, setCasper] = useState({char: null, selection: null});
  const highlightDiv = useRef(null);

  useEffect(() => {
    // if (!highlight.isValid) {
    //   return;
    // }
  }, [highlight]);

  // Sets highlight
  const handleSelect = e => {

    const {selectionStart, selectionEnd} = e.target;
    const selected = value.substring(selectionStart, selectionEnd);
    console.log(selectionStart, selectionEnd, selected);
    setHighlight({chars: selected, isValid: (selected.length !== 0)});
  }

  // Syncs the highlight div to the textarea
  const handleScroll = e => {
    var scrollTop = e.target.scrollTop;
    highlightDiv.current.scrollTop = scrollTop;
  }

  // Resets highlight on blur
  const handleBlur = e => {
    setHighlight({chars: null, isValid: false});
    setCasper({char: null, selection: null});
    e.target.setSelectionRange(0,0);
  }

  const handleChange = e => {
    const { value } = e.target;
    onChange(value);
    // Allow single entry edits
    // Not multiple eg highlight multiple and edit or pasting

  }

  const handleKeyDown = e => {
    if (e.key === 'Backspace') {
      if (highlight.chars) {
        return;
      }
      const {selectionStart, selectionEnd} = e.target;
      if (casper.char) {
        e.target.setSelectionRange(selectionStart+1, selectionEnd+1);
        setCasper({char: null, selection: null});
        return;
      }
      e.preventDefault();
      console.log(e.key);
      const char = (selectionStart === selectionEnd)
      ? value.substring(selectionStart, selectionEnd-1)
      : null;
      if (char) {
        const selection = [selectionStart-1, selectionEnd];
        setCasper({char, selection});
        console.log(char, selection);
      }
      (selectionStart !== 0) && e.target.setSelectionRange(selectionStart-1, selectionEnd-1);
    }
  }

/* // If highlighted, paste may replace one char
  const handlePaste = e => {
    e.preventDefault();
    return false;
  }
*/
  //onClick
  //onMouseOver

/* // Returns an array of strings split into fragments
  before and after highlighted fragment for rendering highlights */
  const highlighted = () => {
    let ta = value; // text array
    let arr = [];
    let i = 0;
    while (highlight.isValid && ta.includes(highlight.chars)) {
      let index = ta.indexOf(highlight.chars);
      let pre = ta.substring(0, index);
      (pre.length) ? arr.push(pre, highlight.chars) : arr.push(highlight.chars);
      ta = ta.substring(index + highlight.chars.length);
      console.log('while:', i++);
    }
    (ta.length) && arr.push(ta);
    return arr;
  }

  return (
    <div id="Textarea">
    {title}
      <div className="container">
        <div
          ref={highlightDiv}
          className="textarea"
          style={textboxStyle}
        >
          {
            (highlight.isValid)
            ? highlighted().map((word, index) => {
                if (word === highlight.chars)
                  return <span key={word+index} style={highlightStyle}>{word}</span>
                return word
              })
            : (casper.char)
              ? value.split('').map((char, index) =>
                  (char === casper.char)
                  ? <span key={char+index} style={casperStyle}>{char}</span>
                  : char
                )
              : value
          }
        </div>
        <textarea
          value={value}
          style={textareaStyle}
          onChange={e => handleChange(e)}
          onClick={e => handleSelect(e)}
          onBlur={e => handleBlur(e)}
          onScroll={e => handleScroll(e)}
          onKeyDown={e => handleKeyDown(e)}
          //onPaste={e => handlePaste(e)}
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
  letterSpacing: "0.1rem",
}

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



export default Textarea;
