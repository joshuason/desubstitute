import React from 'react';

const Analysis = ({ input }) => {
  const analysisObj = useAnalysis(input);
  console.log(analysisObj);

  return (
    <div className="Analysis">
      Analysis
    </div>
  );
}

function useAnalysis(text) {
  const analyse = (text, value = 1) => {
    let newObj = {};
    const divisor = text.length - value + 1;
    text.split('')
      .map((char, ind, arr) => {
        let chars = (ind < divisor) && arr.slice(ind, ind+value).join('');
        (chars) && (
          (newObj[chars])
          ? newObj[chars] += (1 / divisor)
          : newObj[chars] = (1 / divisor)
        )
        return char;
      });
    return newObj;
  }

  const monograms = analyse(text, 1);
  const bigrams = analyse(text, 2);
  const trigrams = analyse(text, 3);
  /*
  const doubles = searchDoubles(text);
  const initialLetters = searchInitialLetters(text);
  const finalLetters = searchFinalLetters(text);
  const words = searchWords(text);

  const monograms_total = Object.values(monograms).reduce((acc, value) => acc + value, 0);
  const bigram_total = Object.values(bigrams).reduce((acc, value) => acc + value, 0);
  const trigram_total = Object.values(trigrams).reduce((acc, value) => acc + value, 0);

  console.log(monograms, bigrams, trigrams);
  console.log(`Totals: ${monograms_total}, ${bigram_total}, ${trigram_total}`);
  */
  return {
    monograms,
    bigrams,
    trigrams,
    /*
    doubles,
    initialLetters,
    finalLetters,
    words
    */
  };
}

export default Analysis;
