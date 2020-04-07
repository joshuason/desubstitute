import React from 'react';

const Notifications = ({charAnalysis}) => {
  const cornell_letterFrequency = {
    e: 0.1202,
    t: 0.0910,
    a: 0.0812,
    o: 0.0768,
    i: 0.0731,
    n: 0.0695,
    s: 0.0628,
    r: 0.0602,
    h: 0.0593,
    d: 0.0432,
    l: 0.0398,
    u: 0.0288,
    c: 0.0271,
    m: 0.0261,
    f: 0.0230,
    y: 0.0211,
    w: 0.0209,
    g: 0.0203,
    p: 0.0182,
    b: 0.0149,
    v: 0.0111,
    k: 0.0069,
    x: 0.0017,
    q: 0.0011,
    j: 0.0010,
    z: 0.0007,
  }

  console.log(charAnalysis);
  const { unigrams, bigrams, trigrams } = charAnalysis;

  const unigramPercentages = objToArray(unigrams).sort((a, b) => b[1] - a[1]).map(item => {
      return [item[0], numToPercentage(item[1])]
    });

  const inputAnalysis = analyseInput(cornell_letterFrequency, unigrams);
  const outputAnalysis = {};

  console.log(unigramPercentages);

  return (
    <div id="Notifications">
      {/*
        (unigramPercentages)
        && unigramPercentages.map(item => {
          return <p>{item[0]}: {item[1]}</p>
        })
        */
      }
    </div>
  );
}

function objToArray(obj) {
  return Object.entries(obj);
}

function objToSortedArray(obj) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

function numToPercentage(num) {
  return `${(num * 100).toFixed(2)}%`
}

function getDeviation(control, variable) {
  return (control - variable) ** 2;
}

function analyseInput(control, data) {
  const control_sortedArray = objToSortedArray(control);
  const data_sortedArray = objToSortedArray(data);

  if (!control_sortedArray || !data_sortedArray) {
    return null;
  }

  const dataLength = data_sortedArray.length;
  const lowerBound = 5; // Also cast_size ::end
  const upperBound = dataLength - lowerBound; // ::begin
  const mid = Math.floor(lowerBound / 2);
  const deviation = data_sortedArray.reduce((acc, cur, ind, arr) => {
    const begin = (ind - mid > 0)
      ? (ind - mid < upperBound)
        ? ind - mid
        : upperBound
      : 0;
    const end = (ind + mid + 1 < dataLength)
      ? (ind + mid + 1 > lowerBound)
        ? ind + mid + 1
        : lowerBound
      : dataLength;

    const subControl =  control_sortedArray.slice(begin, end);
    const deviationArray = subControl.map(item =>
      [item[0], getDeviation(cur[1], item[1])]
    ).sort((a, b) => a[1] - b[1]);
    acc[cur[0]] = deviationArray;
    return acc;
  }, {});

  return deviation;
}

export default Notifications;
