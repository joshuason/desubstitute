import React from 'react';
import './Input.css';

const Input = ({ value, onValueChanged }) => {

  return (
    <div className="Input">
      Input:
      <textarea
        type="text"
        value={value}
        onChange={(e) => onValueChanged(e.target.value)}
      />
    </div>
  );
}

export default Input;
