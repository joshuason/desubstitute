import React from 'react';

const Notifications = props => {

  const { bigrams, fanalysis, trigrams } = props.inputAnalysis;
  const fArray = (fanalysis) && Object.entries(fanalysis).sort((a, b) => b[1] - a[1]);
  const biArray = (bigrams) && Object.entries(bigrams).sort((a, b) => b[1] - a[1]);
  const triArray = (trigrams) && Object.entries(trigrams).sort((a, b) => b[1] - a[1]);

  //fArray && fArray.length !== 0 && console.log('fArray sorted:', fArray.sort((a, b) => b[1] - a[1]));
  console.log('fArray:', fArray);
  console.log('biArray:', biArray);
  console.log('triArray:', triArray);

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
