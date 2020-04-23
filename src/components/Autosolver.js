import React, { useState, useEffect } from 'react';
import { text } from '../data/english_quadgrams.txt'

const alphabetArray = [...Array(26).keys()].map(num => String.fromCharCode(num+97));
const quadgramDataPromise = fetch('english_quadgrams.txt')
  .then(response => response.text())
  .then(data => processRaw(data));

function processRaw(rawData) {
  const newArr = rawData.split('\n')
    .map(line => line.split(' '))
  return Object.fromEntries(newArr);
}

console.log(text);

const Autosolver = ({input, cipherKey}) => {
  const [isWarned, setIsWarned] = useState(false);
  const [keyFound, setKeyFound] = useState(null);

  useEffect(() => {
    console.log('Key Changed:', keyFound);
  }, [keyFound]);

  const handleClick = () => {
    if (isWarned) {
      autosolve(input).then(res => setKeyFound(res));
    } else {
      setIsWarned(true);
    }
  }
  // autosolve(input);
  return (
    <div className="Autosolver">
      <button onClick={handleClick}>
        autosolve
      </button>
      {
        (isWarned) && <p style={{color: 'red'}}>WARNING: resource intensive!</p>
      }
    </div>
  );
}

function autosolve(input, cipherKey) {
  // if (!cipherKey) {
    return hillClimbingAlgorithm(input);
  // } else {
  //   myAlgorithm(input, cipherKey);
  // }
}

async function hillClimbingAlgorithm(input) {
  let parent = generateRandomParentKey();
  let fitness = await measureFitness(decipher(input, parent));
  if (fitness) {
    console.log('Original:', parent, fitness);
    for (let i = 0; i < 2000; i++) {
      const newParentKey = changeKeySlightly(parent);
      const newFitness = await measureFitness(decipher(input, newParentKey));
      // console.log('Key:', parent, 'Fitness:', fitness);
      // console.log('NEW: \n Key:', newParentKey, 'Fitness', newFitness);
      (i % 100 === 0) && console.log(i);
      if (newFitness && newFitness > fitness) {
        parent = newParentKey;
        fitness = newFitness;
        i = 0;
      }
    }
  }
  console.log('Result:', parent, fitness);
  return parent;
}

/*
function weightedHillClimbingAlgorithm(input, weights) {

}
*/

function decipher(input, key) {
  return input.toLowerCase().split('').map(char => key[char]).join('');
}

async function measureFitness(decipheredText) {
  const quadgramData = await quadgramDataPromise;
  const _total = Object.values(quadgramData)
    .reduce((acc, val, ind) => (Number(val)) ? acc + Number(val) : acc, 0);
  const _floorProb = 0.1/_total;
  const _logFloorProb = Math.log10(_floorProb);
  const { length } = decipheredText;

  const quadFitness = decipheredText.split('')
    .reduce((acc, char, ind) => {
      if (ind + 4 <= length) {
        const quadFrag = decipheredText.slice(ind, ind+4).toUpperCase();
        if (quadgramData[quadFrag]) {
          const prob = quadgramData[quadFrag]/_total;
          const logProb = Math.log10(prob)
          return acc + logProb;
        } else {
          return acc + _logFloorProb;
        }
      }
      return acc;
    }, 0);

  return quadFitness;
  // Use quadgrams (Total: 4224127912)
  // floor_probability (0.1/total || 1/(10*total))
  // Measure... split decipheredText into chunks of quadgrams
  // ... and get the logprobability
  // If no logprobability, return log of floor_probability
  // Add up the logprobabilities
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
