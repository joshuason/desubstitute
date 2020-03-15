import React from 'react';

const KeyComponent = props => {
  const { keyOfValue, value, onChange } = props;

  return (
    <span>
      {keyOfValue}:
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

export default KeyComponent;
