import React, { useRef, useState } from 'react';

const Textarea = ({value, onValueChanged}) => {

  const [selection, setSelection] = useState(null);
  const highlightDiv = useRef(null);

  const highlightLocations = getHighlights(value, selection);
  const highlightsInChunks = reduceOverlaps(highlightLocations);
  const valueInChunks = getValueInChunks(value, highlightsInChunks);
  (valueInChunks) && console.log(valueInChunks);
  //const valueToRender = highlightLocations && getValueToBeRendered(value, highlightLocations);


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
    Output:
      <div className="container">
        <div
          ref={highlightDiv}
          className="highlights"
          style={textboxStyle}
        >
          {
            (valueInChunks)
            ? valueInChunks.map(chunk => {
                if (highlightsInChunks.includes(chunk)) {
                  return (
                    <span style={highlightStyle}>
                      {value.substring(chunk[0], chunk[1])}
                    </span>
                  );
                }
                return value.substring(chunk[0], chunk[1])
              })
            : value
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

// Returns all highlights inlcuding overlaps
function getHighlights(text, selected) {
  if (!selected) return null;
  const { length: tLength } = text;
  const { length: hLength } = selected;
  const locations = text.split('').reduce((acc, cur, begin, arr) => {
    const end = begin + hLength;
    if ((end <= tLength) && (arr.slice(begin, end).join('') === selected)) {
      acc.push([begin, end]);
    }
    return acc;
  }, []);
  console.log(`${selected} occurs ${locations.length} time(s)...`, locations);
  return locations;
}

// Returns array of overlapping hightlights and single occurences
function reduceOverlaps(highlightLocations) {
  if (!highlightLocations) return null;
  const array = highlightLocations.reduce((acc, cur, ind, arr) => {
    const recentEntry = acc[acc.length-1];

    const start = cur[0];
    const end = cur[1];

    if (recentEntry && (recentEntry[1] > cur[0])) {
      recentEntry[1] = cur[1];
    } else {
      acc.push([start, end]);
    }
    return acc;
  }, []);
  console.log(`... in ${array.length} "chunk(s)"`, array);
  return array;
}

// Returns array of all fragments (highlights and not)
function getValueInChunks(text, chunks) {
  if (!chunks) return null;
  const textBlocks = chunks.reduce((acc, cur, ind, arr) => {
    let recentEntry = acc[acc.length-1];
    // Push item before first cur item, if any
    if (!recentEntry && (cur[0] > 0)) {
      acc.push([0, cur[0]]);
      recentEntry = acc[acc.length-1];
    }
    if (recentEntry && recentEntry[1] < cur[0]) {
      acc.push([(recentEntry[1] || 0), cur[0]]);
    }
    recentEntry = acc[acc.length-1];
    // Push cur
    if ((cur[0] === 0) || (cur[0] === recentEntry[1])) {
      acc.push(cur);
    }
    return acc;
  }, []);
  // Push item after final chunk
  if (textBlocks[textBlocks.length-1][1] !== text.length) {
    textBlocks.push([textBlocks[textBlocks.length-1][1], text.length])
  }
  return textBlocks;
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
