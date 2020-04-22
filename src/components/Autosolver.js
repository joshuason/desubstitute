import React from 'react';

const alphabetArray = [...Array(26).keys()].map(num => String.fromCharCode(num+97));

const Autosolver = ({input, cipherKey}) => {
  generateRandomParentKey();
  return (
    <div className="Autosolver">
      <button onClick={(input, cipherKey) => autosolve(input, cipherKey)} />
    </div>
  );
}

function autosolve(input, cipherKey) {
  generateRandomParentKey();
}

function generateRandomParentKey() {
  const randomAlphabet = alphabetArray.reduce((acc, char, ind) => {
    if (ind === alphabetArray.length - 1) return acc;
    const max = alphabetArray.length - 1 - ind;
    const min = ind + 1;
    const randomInd = Math.floor(Math.random() * max) + min;
    const swap = acc[ind];
    acc[ind] = acc[randomInd];
    acc[randomInd] = swap;
    return acc;
  }, [...alphabetArray]);
  const randomAlphabetKeyArray = alphabetArray.map((char, ind) => (
    [char, randomAlphabet[ind]]
  ));
  const randomKey = Object.fromEntries(randomAlphabetKeyArray);
  console.log(randomKey);
  return randomKey;
}

export default Autosolver;
