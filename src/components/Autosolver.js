import React from 'react';

const alphabetArray = [...Array(26).keys()].map(num => String.fromCharCode(num+97));

const Autosolver = ({input, cipherKey}) => {

  autosolve(input);
  return (
    <div className="Autosolver">
      <button onClick={(input, cipherKey) => autosolve(input, cipherKey)} />
    </div>
  );
}

function autosolve(input, cipherKey) {
  // if (!cipherKey) {
    hillClimbingAlgorithm(input);
  // } else {
  //   myAlgorithm(input, cipherKey);
  // }
}

function hillClimbingAlgorithm(input) {
  let parent = generateRandomParentKey();
  let fitness = measureFitness(decipher(input, parent));
  for (let i = 0; i < 10; i++) {
    const newParentKey = changeKeySlightly(parent);
    const newFitness = measureFitness(decipher(input, newParentKey));
    if (newFitness > fitness) {
      parent = newParentKey;
      fitness = newFitness;
      i = 0;
    }
  }
}

function decipher(input, key) {
  return input.toLowerCase().split('').map(char => key[char]).join('');
}

function measureFitness(decipheredText) {

}

function changeKeySlightly(key) {
  const genRandom = () => Math.floor(Math.random() * alphabetArray.length);
  let randomPair = [genRandom(), genRandom()];
  while (randomPair[0] === randomPair[1]) {
    randomPair = [genRandom(), genRandom()];
  }
  const keysToSwap = Object.keys(key).filter((keyItem, ind) => randomPair.includes(ind));
  const swap = key[keysToSwap[0]];
  const newKey = {
    ...key,
    [keysToSwap[0]]: key[keysToSwap[1]],
    [keysToSwap[1]]: swap,
  };
  return newKey;
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
