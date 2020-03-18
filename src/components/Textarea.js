import React, { useState, useEffect, useRef } from 'react';

const Textarea = ({value, title, onChange}) => {

  const [highlight, setHighlight] = useState({chars: null, isValid: false});
  const highlightDiv = useRef(null);
/*
  const [selection, setSelection] = useState({});
*/

  useEffect(() => {
    if (!highlight.isValid) {
      return;
    }
  }, [highlight]);

  const handleSelect = e => {
    const {selectionStart, selectionEnd} = e.target;
    const selected = value.substring(selectionStart, selectionEnd);
    console.log(selectionStart, selectionEnd, selected);
    setHighlight({chars: selected, isValid: (selected.length !== 0)});
  }

  const highlighted = () => {
    let ta = value;
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

  const handleScroll = (e) => {
    var scrollTop = e.target.scrollTop;
    //console.log(scrollTop);
    highlightDiv.current.scrollTop = scrollTop;
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
                  return <span key={word+index} style={{backgroundColor: "yellow"}}>{word}</span>
                return word
              })
            : value
          }
        </div>
        <textarea
          value={value}
          style={textareaStyle}
          onChange={e => onChange(e.target.value)}
          onClick={e => handleSelect(e)}
          onBlur={() => setHighlight({chars: null, isValid: false})}
          onScroll={(e) => handleScroll(e)}
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
  color: "rgba(255, 255, 255, 0)",
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
  cursor: "text",
}

export default Textarea;
