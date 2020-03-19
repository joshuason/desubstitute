import React from 'react';

const Notifications = props => {
  /*
  const { digraphs, fanalysis, trigraphs } = props.inputAnalysis;
  const fArray = (fanalysis) && Object.entries(fanalysis);
  const diArray = (digraphs) && Object.entries(digraphs);
  const triArray = (trigraphs) && Object.entries(trigraphs);
  */
  const quicksort = (array, low, high) => {
    if (low < high) {
      let pi = high; // pivot index
      let pivot = array[pi]; // pivot

      // iterate through array
      for (let i = low; i < high; i++) {
        // if pivot is bigger than current value
        let pointer = array[i];
        if (pivot[1] < pointer[1]) {
          let swap = array[pi-1]; // store value before pivot in swap
          array[pi-1] = pivot; // move value in pivot to the left
          array[pi] = swap; // store swap in previous pivot location
          pi--;
        }
      }

      //console.log('Lower', array.splice(low, pi-1));
      //console.log('Higher', array.splice(pi+1, high));
      quicksort(array, low, pi-1);
      quicksort(array, pi+1, high);
    }
  }

  const array = [['a',3], ['b',8], ['c',1], ['d',6], ['e',5], ['f',4], ['g',7], ['h',2], ['i',9], ['j',0]];
  quicksort(array, 0, array.length-1);
  console.log('Quicksort: ', array);


  return (
    <div id="Notifications">

    </div>
  );
}

export default Notifications;

const quicksort = (pivot, prepivot = [], postpivot = []) => {
  if (pivot.length === 1 && prepivot.length === 0 && postpivot.length ===0) {
    return pivot;
  }

}

const array = [["a",3], ["b",8], ["c",1], ["d",2], ["e",5]]
