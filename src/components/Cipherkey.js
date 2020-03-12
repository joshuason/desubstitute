import React from 'react';

const Cipherkey = ({ cipherkey }) => {
  const ckArray = Object.entries(cipherkey);
  //console.log('cipherkey', ckArray);

  return (
    <div id="Cipherkey">
      <h2>Cipherkey</h2>
      <div id="Ciphertable">
        {
          (cipherkey)
          ? ckArray.map(key => {
              return <span key={key[0]}>{key[0]}: {key[1]} | </span>
            })
          : null
        }
      </div>
    </div>
  );
}

export default Cipherkey;
