import React, { useState, useEffect } from 'react';
import './App.css';

import Cipherkey from './components/Cipherkey'
import Input from './components/Input'
import Output from './components/Output'
import Notifications from './components/Notifications'
import Options from './components/Options'

const App = () => {
  const examplekey = 'zebracdfghijklmnopqstuvwxy'
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
  //On key update, update output;
  useEffect(() => {
    /*
    const arrExamplekey = examplekey.split('');
    const k = cipherkey;
    Object.keys(cipherkey).map((key, value) => {
      k[key] = arrExamplekey[value];
      return key;
    });
    setCipherkey(k);
    */
  }, []);

  const [input, setInput] = useState("");
  //On input update, update output;
  useEffect(() => {
    setOutput(preAnalPrep(input));
  }, [input]);

  const [output, setOutput] = useState("");
  //On output update, update key;
  useEffect(() => {
    console.log(analyseText(output).fanalysis);
  }, [cipherkey, output]);

  // Apply 'options' to text, prior to analysis ie scrub/sanitise text
  const preAnalPrep = text => {
    const arrNewOutput = text.toLowerCase().split('')
      .filter(char => Object.keys(cipherkey).includes(char)); // Only chars that appear in cipherkey is included
    const newOut = arrNewOutput.join('');
    return newOut;
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

  return (
    <div className="App">
      <Cipherkey
        cipherkey={cipherkey}
        setCipher={setCipherkey}
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
