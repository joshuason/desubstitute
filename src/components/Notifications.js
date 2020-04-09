import React from 'react';
import data from '../data/frequencies'

const {
  // // Use Cornell for whitespace dependent
  // cornell_monogram,
  // cornell_bigram,
  // Use PC for whitespace independent
  pc_monogram,
  pc_bigram,
  pc_trigram
} = data;

const Notifications = ({charAnalysis}) => {
  const { monograms, bigrams, trigrams } = charAnalysis;

  // Could refactor below as a custom hook [useAnalyseInput(charAnalysis)]
  const monogramAnalysis = analyseInput(pc_monogram, monograms);
  const bigramAnalysis = analyseInput(pc_bigram, bigrams);
  const trigramAnalysis = analyseInput(pc_trigram, trigrams);

  const inputAnalyses = { monogramAnalysis, bigramAnalysis, trigramAnalysis };
  // const inputInterpretation = interpretInput(inputAnalyses);
  // const outputAnalysis = {};

  // sorted human readable percentages (ie Strings);
  const monogramPercentages = getPercentagesOfObj(monograms);
  const bigramPercentages = getPercentagesOfObj(bigrams);
  const trigramPercentages = getPercentagesOfObj(trigrams);

  const inputPercentages = { monogramPercentages, bigramPercentages, trigramPercentages};

  console.log('Raw', charAnalysis);
  console.log('Raw (-h)', inputPercentages);
  console.log('Churned', inputAnalyses);
  console.log('Inverted', invertAnalysisObj(getInversePercentagesOfAnalysis(monogramAnalysis)));
  console.log('Inverted', getInversePercentagesOfAnalysis(trigramAnalysis));

  return (
    <div id="Notifications">
      {

      }
    </div>
  );
}

function objToArray(obj) {
  return Object.entries(obj);
}

function arrayToObj(arr) {
  return Object.fromEntries(arr);
}

function getKeysFromObj(obj) {
  return Object.keys(obj);
}

function objToSortedArray(obj) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

function numToPercentage(num) {
  return `${(num * 100).toFixed(2)}%`
}

function getPercentagesOfObj(obj) {
  return objToSortedArray(obj).map(item =>
    [item[0], numToPercentage(item[1])]
  );
}

function invertAnalysisObj(obj) {
  const arr = objToArray(obj);

  const inverse = arr.reduce((acc, cur, ind, arr) => {
    const product = cur[1].map(metaItem => [metaItem[0], [cur[0], metaItem[1]]]);
    product.forEach(element => {
      // console.log(element)
      acc = {
        ...acc,
        [element[0]]: (acc[element[0]]) ? [[element[1][0], element[1][1]],
          ...acc[element[0]]] : [[element[1][0], element[1][1]]],
      };
    });
    return acc;
  }, {});

  return inverse;
}

function getInversePercentagesOfAnalysis(obj) {
  const keys = getKeysFromObj(obj);
  const newObj = keys.reduce((acc, key, ind, arr) => {
    acc = {
      ...acc,
      [key]: obj[key].map(item => [item[0], 1 - item[1]]),
    };
    return acc;
  }, {});
  return newObj;
}

function getDeviation(control, sample) {
  return (control - sample) ** 2;
}

function analyseInput(control, sample, radius = 2) {
  const controlSortedArray = objToSortedArray(control);
  const sampleSortedArray = objToSortedArray(sample);

  if (!controlSortedArray || !sampleSortedArray) {
    return null;
  }

  const { length } = controlSortedArray;
  const sampleSlice = sampleSortedArray.slice(0, length);
  //const radius = 2;
  const diameter = 2 * radius;
  const deviation = sampleSlice.reduce((acc, cur, ind, arr) => {
    const begin = (ind - radius > 0)
      ? (ind - radius < length - diameter)
        ? ind - radius
        : length - diameter - 1
      : 0;
    const end = (ind + radius < length)
      ? (ind + radius > diameter)
        ? ind + radius + 1
        : diameter + 1
      : length;

    const controlSlice = controlSortedArray.slice(begin, end);
    const deviationArray = controlSlice.map(item =>
      [item[0], getDeviation(item[1], cur[1])]
    ).sort((a, b) => a[1] - b[1]);

    if (deviationArray.length) {
      acc[cur[0]] = deviationArray;
    } else {
      console.log('Something went wrong in deviationArray');
    }

    return acc;
  }, {});

  return deviation;
}

function interpretInput(analyses, occurences) {
  const { monogramAnalysis } = analyses;
  const { monograms } = occurences;

  const interpretation = {};

  return interpretation;
}

export default Notifications;
