import React from 'react';

const KeyComponent = props => {
  const { keyOfValue, value, onChange } = props;

  return (
    <span style={keyStyle}>
      <p style={{margin: "0", textTransform: "uppercase"}}>{keyOfValue}</p>
      <input
        type="text"
        value={value}
        onChange={onChange}
        maxLength="1"
        style={inputStyle}
      />
    </span>
  );
}

const inputStyle = {
  width: "1ch",
  border: "1px solid lightgrey",
};

const keyStyle = {
  display: "inline-block",
  margin: "0 2px"
}

export default KeyComponent;
