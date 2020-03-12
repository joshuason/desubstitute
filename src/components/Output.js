import React from 'react';

const Output = props => {
  return (
    <div id="Output">
      <label>
        Output:
        <textarea
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export default Output;
