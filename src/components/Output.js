import React from 'react';
import './Output.css';

const Output = ({ value }) => {

  return (
    <div className="Output">
      Output:
      <div className="Output-container">
        {value}
      </div>
    </div>
  );
}

export default Output;
