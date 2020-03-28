import React, { useState, useEffect, useRef } from 'react';
/*import axios from 'axios';*/
import './App.css';

import Cipherkey from './components/Cipherkey';
import Input from './components/Input';
import Output from './components/Output';
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
  const [translateKey, setTranslateKey] = useState({});

  const [input, setInput] = useState("");
  const [workarea, setWorkarea] = useState("");
  const [output, setOutput] = useState("");

  const [inputAnalysis, setInputAnalysis] = useState({});

  // const usePrevious = value => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }

  //On input update, update workarea and initialise key, analyse characters;
  useEffect(() => {
    // Analyse input, returns object
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

      const fanalysis = analyse(text, 1);
      const bigrams = analyse(text, 2);
      const trigrams = analyse(text, 3);
      /*
      const doubles = searchDoubles(text);
      const initialLetters = searchInitialLetters(text);
      const finalLetters = searchFinalLetters(text);
      const words = searchWords(text);

      const fanalysis_total = Object.values(fanalysis).reduce((acc, value) => acc + value, 0);
      const bigram_total = Object.values(bigrams).reduce((acc, value) => acc + value, 0);
      const trigram_total = Object.values(trigrams).reduce((acc, value) => acc + value, 0);
      /*
      console.log(fanalysis, bigrams, trigrams);
      console.log(`Totals: ${fanalysis_total}, ${bigram_total}, ${trigram_total}`);
      */
      return {
        fanalysis,
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
    // Translate input to Workarea
    let tKey = {};
    const translate = text =>
      text.split('').map(char => {
        if (!Number.isInteger(tKey[char])) {
          tKey[char] = Object.keys(tKey).length;
        }
        return tKey[char];
      });

    setTranslateKey(tKey);
    setWorkarea(translate(input));
    setInputAnalysis(analyseText(input));
  }, [input]);

  //On workarea update, update output and key, analyse for words;
  useEffect(() => {
    setOutput(workarea);
  }, [workarea]);

  // On cipherkey update, update workarea
  /*
  useEffect(() => {
    // Decipher input using cipherkey
    const decipher = text => {
      const textInArr = text.split('');
      const textOutArr = textInArr.map(char =>
        (cipherkey[char.toLowerCase()])
        ? cipherkey[char.toLowerCase()]
        : char
      );
      const textOut = textOutArr.join('');
      return textOut;
    }
    setWorkarea(w => decipher(w));
  }, [cipherkey]);
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
        value={workarea}
        onChange={value => setWorkarea(value)}
        tk={[translateKey, setTranslateKey]}
        ck={[cipherkey, setCipherkey]}
      />
      {/*
      <Output
        value={output}
      />
      */}
      <Notifications
        inputAnalysis={inputAnalysis}
      />
      <Options />
    </div>
  );
}


export default App;
