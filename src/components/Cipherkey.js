import React from 'react';
import KeyComponent from './KeyComponent';

const CipherKey = ({ cipherKey, onCipherKeyChanged }) => {
  const cipherKeyArray = Object.entries(cipherKey);

  const handleKeyValueChanged = (keyId, value) => {
    console.log(`${keyId}: ${value}`);
    onCipherKeyChanged({...cipherKey, [keyId]: value});
  }

  return (
    <div id="CipherKey">
      <h2>Cipher Key</h2>
      <div id="CipherTable">
        {cipherKeyArray.map(key => (
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

export default CipherKey;
