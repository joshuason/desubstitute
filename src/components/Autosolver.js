import React, { useState, useEffect } from 'react';
//import { text } from '../data/english_quadgrams.txt'
import { english_quadgrams } from '../data/english_quadgrams';
import { pc_monogram } from '../data/frequencies.json';

const alphabetArray = [...Array(26).keys()].map(num => String.fromCharCode(num+97));
const quadgramDataPromise = fetch('english_quadgrams.txt')
  .then(response => response.text())
  .then(data => processRaw(data));

function processRaw(rawData) {
  const newArr = rawData.split('\n')
    .map(line => line.split(' '))
  return Object.fromEntries(newArr);
}

//console.log(text);

const Autosolver = ({input, cipherKey, analysis }) => {
  const [isWarned, setIsWarned] = useState(false);
  const [keyFound, setKeyFound] = useState(null);
  const { monograms } = analysis;
  const heuristicMatrix = getHeuristicMatrix(pc_monogram, monograms, input.length);

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

  aStarAlgorithm(input, heuristicMatrix);
  console.log(pc_monogram, monograms);
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
  return hillClimbingAlgorithm(input);
  // return aStarAlgorithm(input, getMatrix(analysis));
}

/**********************
HELPER FUNCTIONS
**********************/
function decipher(input, key) {
  return input.toLowerCase().split('').map(char => key[char]).join('');
}

function objToArr(obj) {
  return Object.entries(obj);
}

async function aStarAlgorithm(input, heuristicMatrix) {
  const genKey = () => {
    return alphabetArray.reduce((acc, cur) => ({
      ...acc,
      [cur]: cur,
    }), {});
  }
  // Distance from node to node
  const getGCost = (k) => {
    return measureFitness(decipher(input, k)) * -1;
  }
  // Distance away from end
  const getHCost = (k, h) => {
    const keyArr = objToArr(k);
    const hCost = keyArr.reduce((acc, cur, ind) => {
      const charS = cur[0].toUpperCase();
      const charC = cur[1].toUpperCase();
      const value = h[charS][charC];
      return acc + value;
    }, 0);
    return hCost;
  }

  const key = genKey();
  const priority = Infinity;
  const priorityQueue = [];
  priorityQueue.push({key, priority});

  if(priorityQueue.length) {
    const gCost = getGCost(key);
    const hCost = getHCost(key, heuristicMatrix);
    const fCost = gCost + hCost;
    console.log('k:', key, 'g:', gCost, 'h:', hCost, 'f:', fCost);
    priorityQueue.push({key, priority: fCost});
  }
  console.log(priorityQueue);
}

function getHeuristicMatrix(controlDataObj, sampleDataObj, length) {
  const controlDataArr = objToArr(controlDataObj);
  const hMatrix = controlDataArr.reduce((acc, conCur, ind) => {
    // Mapping sampe to control
    const expected = controlDataObj[conCur[0]] * length;

    const value = controlDataArr.map(samCur => {
      const counted = sampleDataObj[samCur[0]] * length || 0;
      return [samCur[0], getChiSquared(expected, counted)];
    });
    value.forEach((item) => {
      const char = item[0];
      const value = item[1];
      acc[char] = {
        ...acc[char],
        [conCur[0]]: value
      }
    });
    return acc;
  }, {});
  // console.log(hMatrix);
  return hMatrix;
}

function getChiSquared(control, sample) {
  return ((sample - control)**2) / control;
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

function measureFitness(decipheredText) {
  const _total = Object.values(english_quadgrams)
    .reduce((acc, val, ind) => (Number(val)) ? acc + Number(val) : acc, 0);
  const _floorProb = 0.1/_total;
  const _logFloorProb = Math.log10(_floorProb);
  const { length } = decipheredText;

  const quadFitness = decipheredText.split('')
    .reduce((acc, char, ind) => {
      if (ind + 4 <= length) {
        const quadFrag = decipheredText.slice(ind, ind+4).toUpperCase();
        if (english_quadgrams[quadFrag]) {
          const prob = english_quadgrams[quadFrag]/_total;
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
