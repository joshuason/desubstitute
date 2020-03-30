import React from 'react';

const Notifications = props => {
  console.log(props);
  /*
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
  */

  /*
  const { bigrams, unigrams, trigrams } = props.charAnalysis;
  const fArray = (unigrams) && Object.entries(unigrams).sort((a, b) => b[1] - a[1]);
  const biArray = (bigrams) && Object.entries(bigrams).sort((a, b) => b[1] - a[1]);
  const triArray = (trigrams) && Object.entries(trigrams).sort((a, b) => b[1] - a[1]);

  //fArray && fArray.length !== 0 && console.log('fArray sorted:', fArray.sort((a, b) => b[1] - a[1]));
  console.log('fArray:', fArray);
  console.log('biArray:', biArray);
  console.log('triArray:', triArray);

  // Method that interprets the results of the analysis according to english letter frequencies
  // const interpret = analysisArray => {
  //
  // }
  */
  return (
    <div id="Notifications">

    </div>
  );
}

export default Notifications;

/*
const quicksort = (array, low, high) => {
  if (pivot.length === 1 && prepivot.length === 0 && postpivot.length ===0) {
    return pivot;
  }

}

const testarray = [['a',3], ['b',8], ['c',1], ['d',6], ['e',5], ['f',4], ['g',7], ['h',2], ['i',9], ['j',0]];
let sortedArray = array.sort((a, b) => b[1] - a[1]);
console.log('Using Array.sort():', sortedArray);
*/
