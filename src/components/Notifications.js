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
const sortedData = objToArray(data)
  .filter(item => item[0].includes('pc'))
  .reduce((acc, cur) => {
    const name = cur[0];
    const array = objToSortedArray(cur[1]);
    acc[name] = array;
    return acc;
}, {});

const Notifications = ({charAnalysis, length}) => {
  const { monograms, bigrams, trigrams } = charAnalysis;
  const sortedMonograms = objToSortedArray(monograms);
  const sortedBigrams = objToSortedArray(bigrams);
  const sortedTrigrams = objToSortedArray(trigrams);

  // console.log('sorted trigrams', sortedTrigrams)
  const assumptions = useAssumptions({sortedMonograms, sortedBigrams, sortedTrigrams}, charAnalysis, length);

  return (
    <div id="Notifications">
      {

      }
    </div>
  );
}

// Helper functions //
function objToArray(obj) {
  return Object.entries(obj);
}

function objToSortedArray(obj) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

function getKeysFromObj(obj) {
  return Object.keys(obj);
}

function calcChiSquared(sampleCount, averageCount) {
  return ((sampleCount - averageCount) ** 2) / averageCount;
}

//
function useAssumptions(sortedSample, charAnalysis, length) {
  const { sortedMonograms, sortedBigrams, sortedTrigrams } = sortedSample;
  const { monograms, bigrams, trigrams } = charAnalysis;

  const assumptionBigrams = trigram => [trigram.slice(0,2), trigram.slice(1,3)];
  const assumptionMonograms = trigram => [trigram.slice(0,1), trigram.slice(1,2), trigram.slice(2,3)];

  const assessAssumption = assumptionTrigrams => {
    if (!assumptionTrigrams) return;

    const sampleAssumptions = [
      assumptionTrigrams[0],
      ...assumptionBigrams(assumptionTrigrams[0]),
      ...assumptionMonograms(assumptionTrigrams[0]),
    ]
    const controlAssumptions = [
      assumptionTrigrams[1],
      ...assumptionBigrams(assumptionTrigrams[1]),
      ...assumptionMonograms(assumptionTrigrams[1]),
    ]

    const chiSquared = sampleAssumptions.reduce((acc, item, ind) => {
      const l = length - item.length + 1;
      const sampleCount = item.length === 3 && Math.round(l * trigrams[item])
        || item.length === 2 && Math.round(l * bigrams[item])
        || item.length === 1 && Math.round(l * monograms[item]);
      const oItem = controlAssumptions[ind]
      const averageCount = item.length === 3 && l * pc_trigram[oItem]
        || item.length === 2 && l * pc_bigram[oItem]
        || item.length === 1 && l * pc_monogram[oItem];
      return acc + calcChiSquared(sampleCount, averageCount);
    }, 0);
    console.log(chiSquared);
    console.log(calcChiSquared(length*trigrams[assumptionTrigrams[0]],
      length*pc_trigram[assumptionTrigrams[1]]))
  }

  // Loop through trigrams in control data
  const newArray = sortedData.pc_trigram.map((itm, ind) => {
    const target = sortedTrigrams[ind];

    const assumption = target && [ target[0], itm[0] ]
    console.log(assumption);
    if (assumption && assumption[0] === 'XLI')
      assessAssumption(assumption);
  });

}


export default Notifications;

/*
Keywords to use:
- Candidate Keys -- a possible key

Analysis methods:
- Chi squared statistics -- measuring the goodness of fit
- Index of coincidence -- measuring the roughness of frequency distribution

Rationale for analysing trigram data:
- Useful for analysing average sized texts where quadgram data would be inadequate.
- Solivng the top 30 trigrams solves 14/26 letters and accounts for 80% of the characters.

Method:
1)  Find the 1st most popular trigram (THE)
    - Deduce from the sample which is most likely
      - Use trigram frequency
      - Use trigram variance (ie how much does the sample probability differ from the control)
      - Analyse compound bigrams, and monograms (eg TH and HE)
      - Analyse their variances
    - Remove assumption/deduction from character set
2)  Find the 2nd most pouplar trigram (AND/ING)
    - Repeat above steps with

*/
