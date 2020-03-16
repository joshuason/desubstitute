import React, { useState, useEffect } from 'react';
/*import axios from 'axios';*/
import './App.css';

import Cipherkey from './components/Cipherkey';
import Input from './components/Input';
import Output from './components/Output';
import Notifications from './components/Notifications';
import Options from './components/Options';
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
  const [_cipherkey, set_cipherkey] = useState({});

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
  //On key update, update output;

  useEffect(() => {

  }, [cipherkey]);

  const [input, setInput] = useState("");
  //On input update, update output;
  useEffect(() => {
    setOutput(input);

    // Apply 'options' to text, prior to analysis ie scrub/sanitise text
    const preAnalPrep = text => {
      const textInArr = text.toLowerCase().split('')
        .filter(char => Object.keys(cipherkey).includes(char)); // Only chars that appear in cipherkey is included
      const textOut = textInArr.join('');
      return textOut;
    }

    //Function to analyse input and output
    const analyseText = text => {
      const fanalysis = frequencyAnalysis(text);
      /*
      const digraphs = searchDigraphs(text);
      const trigraphs = searchTrigraphs(text);
      const doubles = searchDoubles(text);
      const initialLetters = searchInitialLetters(text);
      const finalLetters = searchFinalLetters(text);
      const words = searchWords(text);
      */
      return {
        fanalysis,
        /*
        digraphs,
        trigraphs,
        doubles,
        initialLetters,
        finalLetters,
        words
        */
      };
    }

    const frequencyAnalysis = text => {
      const newObj = {};
      text.split('')
        // Only chars that appear in cipherkey is counted (filter may be redundant)
        // .filter(char => Object.keys(cipherkey).includes(char))
        .map(char => {
          (newObj[char])
          ? newObj[char] += (1 / text.length)
          : newObj[char] = (1 / text.length);
          return char;
        });
      return newObj;
    }

    console.log(analyseText(preAnalPrep(input)).fanalysis);
  }, [input, cipherkey]);

  const [output, setOutput] = useState("");
  //On output update, update key;
  useEffect(() => {
    const curOutput = output;

    // Decipher
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

    setOutput(decipher(curOutput));
  }, [output, cipherkey]);

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
      <Output
        value={output}
        onChange={value => setOutput(value)}
      />
      <Notifications />
      <Options />
    </div>
  );
}

export default App;
