import React from 'react';

const Output = ({value}) => {

  return (
    <div id="Output">
      <label>
        Output:
        <div style={outputStyle}>
          {value}
        </div>
      </label>
    </div>
  );
}

const outputStyle = {
  textAlign: "left",
  paddingTop: "1rem",
  wordWrap: "break-word",
}

export default Output;
