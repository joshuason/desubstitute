import React, { useState, useEffect } from 'react';

const Textarea = ({value, title, onChange}) => {

  const [highlight, setHighlight] = useState({chars: null, isValid: false});
  const [textarea, setTextarea] = useState("");
  const highlightDiv = React.createRef();
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
    onChange(value);
  }

  const highlighted = () => {
    let ta = textarea;
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
            : textarea
          }
        </div>
        <textarea
          value={textarea}
          style={textareaStyle}
          onChange={e => handleChange(e)}
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
