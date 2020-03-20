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
  //const examplekey = 'zebracdfghijklmnopqstuvwxy'

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
  const [input, setInput] = useState("");
  const [workarea, setWorkarea] = useState("");
  const [output, setOutput] = useState("");
  const [inputAnalysis, setInputAnalysis] = useState({});

  const usePrevious = value => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  //On input update, update workarea and initialise key, analyse characters;
  useEffect(() => {
    // Apply 'options' to text, prior to analysis ie scrub/sanitise text, returns string
    const preAnalPrep = text => {
      const textInArr = text.toLowerCase().split('')
        // Only chars that appear in cipherkey is included
        .filter(char => Object.keys(cipherkey).includes(char));
      const textOut = textInArr.join('');
      return textOut;
    }
    // Analyse input, returns objects
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
    setInputAnalysis(analyseText(preAnalPrep(input)));
    // ? decipher before going to workarea ?
    setWorkarea(decipher(input));
  }, [input, cipherkey]);

  //On workarea update, update output and key, analyse for words;
  useEffect(() => {
    setOutput(workarea);
  }, [workarea]);

  return (
    <div className="App">
      <Cipherkey
        cipherkey={cipherkey}
        setCipherkey={setCipherkey}
      />
      <Input
        value={input}
        onChange={value => setInput(value)}
      />
      <Textarea
        value={workarea}
        onChange={value => setWorkarea(value)}
        title={"Workarea:"}
      />
      <Output
        value={output}
      />
      <Notifications
        inputAnalysis={inputAnalysis}
      />
      <Options />
    </div>
  );
}

export default App;
