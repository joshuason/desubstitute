import React, { useState, useEffect, useRef } from 'react';
/*import axios from 'axios';*/
import './App.css';

import Cipherkey from './components/Cipherkey';
import Input from './components/Input';
import Notifications from './components/Notifications';
import Options from './components/Options';
import Textarea from './components/Textarea';
/*
const PATH_BASE = 'https://api.datamuse.com';
const PATH_WORDS = '/words';
const PARAM_SPELLEDLIKE = 'sp=';
const PARAM_LEFTCONTEXT = 'lc=';
const PARAM_RIGHTCONTEXT = 'rc=';
const PATH_SUGGESTIONS = '/sug';
const PARAM_STRING = 's=';
*/
const App = () => {
  // State variables
  const [cipherkey, setCipherkey] = useState({
    a: '',
    b: '',
    c: '',
    d: '',
    e: '',
    f: '',
    g: '',
    h: '',
    i: '',
    j: '',
    k: '',
    l: '',
    m: '',
    n: '',
    o: '',
    p: '',
    q: '',
    r: '',
    s: '',
    t: '',
    u: '',
    v: '',
    w: '',
    x: '',
    y: '',
    z: '',
  });
  //const [translateKey, setTranslateKey] = useState({});

  const [input, setInput] = useState("");
  const [workarea, setWorkarea] = useState("");
  const translation = useTranslation(input);
  const analysis = useAnalysis(input);

/*
  useEffect(() => {
    const invTranslateKey = (invertKey(translatekey));
    // const array = (translation) && translation.map(it => (
    //   cipherkey[invTranslateKey[it].toLowerCase()]
    //   || invTranslateKey[it]
    // ));
    setWorkarea();
  }, [translation])
*/
  return (
    <div className="App">
      <Cipherkey
        cipherkey={cipherkey}
        setCipherkey={setCipherkey}
      />
      <Input
        value={input}
        onChange={value => setInput(value.toUpperCase())}
      />
      <Textarea
        value={translation.translation}
        onChange={value => setWorkarea(value)}
        ck={[cipherkey, setCipherkey]}
      />
      <Notifications
        charAnalysis={analysis}
      />
      <Options />
    </div>
  );
}

function useTranslation(input) {
  const [translatekey, setTranslatekey] = useState({});
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    let tKey = {};
    const translate = text =>
      text.split('').map(char => {
        if (!Number.isInteger(tKey[char])) {
          tKey[char] = Object.keys(tKey).length;
        }
        return tKey[char];
      });

    setTranslation(translate(input));
    setTranslatekey(tKey);
  }, [input]);

  return {
    translation,
    translatekey
  };
}

function useAnalysis(text) {
  const analyseText = text => {

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

    const unigrams = analyse(text, 1);
    const bigrams = analyse(text, 2);
    const trigrams = analyse(text, 3);
    /*
    const doubles = searchDoubles(text);
    const initialLetters = searchInitialLetters(text);
    const finalLetters = searchFinalLetters(text);
    const words = searchWords(text);

    const unigrams_total = Object.values(unigrams).reduce((acc, value) => acc + value, 0);
    const bigram_total = Object.values(bigrams).reduce((acc, value) => acc + value, 0);
    const trigram_total = Object.values(trigrams).reduce((acc, value) => acc + value, 0);
    /*
    console.log(unigrams, bigrams, trigrams);
    console.log(`Totals: ${unigrams_total}, ${bigram_total}, ${trigram_total}`);
    */
    return {
      unigrams,
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
  return analyseText(text);
}

// Returns inverted key
function invertKey(key) {
  return Object.fromEntries(Object.entries(key).map(([k, v]) => ([v, k])));
}

export default App;

// const usePrevious = value => {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }
