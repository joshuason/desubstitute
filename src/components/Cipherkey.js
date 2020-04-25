import React from 'react';
import KeyComponent from './KeyComponent';

const CipherKey = ({ cipherKey, onCipherKeyChanged }) => {

  const handleKeyValueChanged = (keyId, value) => {
    console.log(`${keyId}: ${value}`);
    onCipherKeyChanged({...cipherKey, [keyId]: value});
  }
  
  const cipherKeyArray = Object.entries(cipherKey);
  const cipherKeyRender = cipherKeyArray.map(key => (
    <KeyComponent
      key={key[0]}
      keyOfValue={key[0]}
      value={key[1]}
      onValueChanged={handleKeyValueChanged}
    />
  ));

  return (
    <div className="CipherKey">
      <label>
        Cipher Key:
        <div className="CipherTable">
          {cipherKeyRender}
        </div>
      </label>
    </div>
  );
}

export default CipherKey;
