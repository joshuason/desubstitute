import React from 'react';
import KeyComponent from './KeyComponent';

const Cipherkey = ({ cipherkey, setCipherkey }) => {
  const ckArray = Object.entries(cipherkey);
  //console.log('cipherkey', ckArray);
  const onChange = (e, keyId) => {
    const { value } = e.target;
    console.log(`${keyId}: ${value}`);
    cipherkey[keyId] = value;
  }

  return (
    <div id="Cipherkey">
      <h2>Cipherkey</h2>
      <div id="Ciphertable">
        {
          (cipherkey)
          ? ckArray.map(key => (
            <KeyComponent
              key={key[0]}
              keyOfValue={key[0]}
              value={key[1]}
              onChange={e => onChange(e, key[0])}
            />
            ))
          : null
        }
      </div>
    </div>
  );
}

export default Cipherkey;
