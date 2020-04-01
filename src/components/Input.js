import React from 'react';

const Input = props => {

  return (
    <div id="Input">
      <label>
        Input:
        <textarea
          type="text"
          value={props.value}
          onChange={(e) => props.onValueChanged(e.target.value.toUpperCase())}
        />
      </label>
    </div>
  );
}

export default Input;
