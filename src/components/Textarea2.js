import React, { useState, useEffect, useRef } from 'react';

const Textarea = ({value, onChange, ck}) => {

  const [cipherkey, setCipherkey] = ck;

  //-- LOCAL STATES --//
  const [highlight, setHighlight] = useState({chars: null, isValid: false});
  const [casper, setCasper] = useState({char: null, selection: null});

  const highlightDiv = useRef(null);

  const resetCasper = () => {
    setCasper({char: null, selection: null});
  }
  const resetHighlight = () => {
    setHighlight({chars: null, isValid: false});
  }


  //-- HANDLE METHODS --//
  // Sets highlight
  const handleSelect = e => {
    resetCasper();
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
    resetHighlight();
    resetCasper();
    e.target.setSelectionRange(0,0);
  }

  const handleChange = e => {
    const val = e.target.value;
    onChange(val);
  }

  const handleKeyDown = e => {
    const {selectionStart, selectionEnd} = e.target;
    if (e.key === 'Backspace') {
      if (highlight.chars) {
        resetHighlight();
        return;
      }
      if (casper.char) {
        e.target.setSelectionRange(selectionStart+1, selectionEnd+1);
        resetCasper();
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
    } else if (casper.char) {
      // Set key[casper.char] = e.key

      if (isValidKey(e.key)) {
        console.log(`Replacing ${casper.char}'s with ${e.key}'s`)
        setCipherkey({...cipherkey, [casper.char.toLowerCase()]: e.key});
        console.log(selectionStart);
        e.preventDefault();
      }
      resetCasper();
    } else if (highlight.chars) {
      resetHighlight();
    }
  }


  // Returns an array of strings split into fragments
  function highlighted(value) {
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
          onChange={e => handleChange(e)}
          onClick={e => handleSelect(e)}
          onBlur={e => handleBlur(e)}
          onScroll={e => handleScroll(e)}
          onKeyDown={e => handleKeyDown(e)}
          onKeyUp={e => console.log('Caret at: ', e.target.selectionStart)}
          //onPaste={e => handlePaste(e)}
        />
      </div>
    </div>
  );
}

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

const casperStyle = {
  color: "grey",
  backgroundColor: "lightgrey",
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
}



export default Textarea;
