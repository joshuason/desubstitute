import React from 'react';

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
const cornell_bigramFrequency = {
  th: 0.0152,
  he: 0.0128,
  in: 0.0094,
  er: 0.0094,
  an: 0.0082,
  re: 0.0068,
  nd: 0.0063,
  at: 0.0059,
  on: 0.0057,
  nt: 0.0056,
  ha: 0.0056,
  es: 0.0056,
  st: 0.0055,
  en: 0.0055,
  ed: 0.0053,
  to: 0.0052,
  it: 0.0050,
  ou: 0.0050,
  ea: 0.0047,
  hi: 0.0046,
  is: 0.0046,
  or: 0.0043,
  ti: 0.0034,
  as: 0.0033,
  te: 0.0027,
  et: 0.0019,
  ng: 0.0018,
  of: 0.0016,
  al: 0.0009,
  de: 0.0009,
  se: 0.0008,
  le: 0.0008,
  sa: 0.0006,
  si: 0.0005,
  ar: 0.0004,
  ve: 0.0004,
  ra: 0.0004,
  ld: 0.0002,
  ur: 0.0002,
}

const Notifications = ({charAnalysis}) => {
  const { monograms, bigrams, trigrams } = charAnalysis;

  const monogramAnalysis = analyseInput(cornell_letterFrequency, monograms);
  const bigramAnalysis = analyseInput(cornell_bigramFrequency, bigrams);
  // const trigramAnalysis = analyseInput(controldata, trigrams);

  // const inputAnalyses = { monogramAnalysis, bigramAnalysis, trigramAnalysis };
  // const inputInterpretation = interpret(inputAnalyses);
  // const outputAnalysis = {};

  /*
    // sorted human readable percentages (ie Strings);
    const unigramPercentages = getPercentagesOfObj(monograms);
    const bigramPercentages = getPercentagesOfObj(bigrams);
  */
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

function getPercentagesOfObj(obj) {
  return objToArray(obj).sort((a, b) => b[1] - a[1]).map(item =>
    [item[0], numToPercentage(item[1])]
  );
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
