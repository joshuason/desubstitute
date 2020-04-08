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
  // const inputInterpretation = interpret(inputAnalyses);
  // const outputAnalysis = {};

  // sorted human readable percentages (ie Strings);
  const monogramPercentages = getPercentagesOfObj(monograms);
  const bigramPercentages = getPercentagesOfObj(bigrams);
  const trigramPercentages = getPercentagesOfObj(trigrams);

  const inputPercentages = { monogramPercentages, bigramPercentages, trigramPercentages};

  console.log('Raw', inputPercentages);
  console.log('Churned', inputAnalyses);

  return (
    <div id="Notifications">
      {

      }
    </div>
  );
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

function getDeviation(control, sample) {
  return (control - sample) ** 2;
}

function analyseInput(control, sample) {
  const controlSortedArray = objToSortedArray(control);
  const sampleSortedArray = objToSortedArray(sample);

  if (!controlSortedArray || !sampleSortedArray) {
    return null;
  }

  const { length } = controlSortedArray;
  const sampleSlice = sampleSortedArray.slice(0, length);
  const radius = 2;
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

export default Notifications;
