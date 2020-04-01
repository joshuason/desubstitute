import React from 'react';
import KeyComponent from './KeyComponent';

const Cipherkey = ({ cipherkey, onCipherKeyChanged }) => {
  const ckArray = Object.entries(cipherkey);
  //console.log('cipherkey', ckArray);

  const handleKeyValueChanged = (keyId, value) => {
    console.log(`${keyId}: ${value}`);
    onCipherKeyChanged({...cipherkey, [keyId]: value});
  }

  return (
    <div id="Cipherkey">
      <h2>Cipherkey</h2>
      <div id="Ciphertable">
        {ckArray.map(key => (
          <KeyComponent
            key={key[0]}
            keyOfValue={key[0]}
            value={key[1]}
            onValueChanged={handleKeyValueChanged}
          />
          ))}
      </div>
    </div>
  );
}

export default Cipherkey;
