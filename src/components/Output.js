import React from 'react';

const Output = ({value}) => {

  return (
    <div id="Output">
      <label>
        Output:
        <div style={{textAlign: "left", paddingTop: "1rem"}}>
          {value}
        </div>
      </label>
    </div>
  );
}

export default Output;
