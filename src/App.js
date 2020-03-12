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
  }, [cipherkey]);

  const [input, setInput] = useState("");
  //On input update, update output;
  useEffect(() => {
    decipher(input);
  }, [input]);

  const [output, setOutput] = useState("");
  //On output update, update key;
  useEffect(() => {
    console.log(analyseText(output).fanalysis);
  }, [cipherkey, output]);

  const decipher = text => {
    const arrNewOutput = text.toLowerCase().split('').map(letter => {
      if (cipherkey[letter]) {
        return cipherkey[letter];
      } else {
        return letter;
      }
    });
    setOutput(arrNewOutput.join(''));
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
  let newObj = {};
  let textArr = text.split('').map(char => {
    (newObj[char])
    ? newObj[char] += 1
    : newObj[char] = 1;
    return char;
  });
  let textLength = textArr.length;
  Object.keys(newObj).map(char => {
    newObj[char] = (newObj[char] / textLength);
    return char;
  });
  return newObj;
}

export default App;
