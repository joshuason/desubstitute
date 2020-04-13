/*  NOTES:
|
|   [ ] Bug: editing is fine only with caplocks enabled
|   [ ]
|__________________________________*/

import React, { useState, useEffect } from 'react';
/*import axios from 'axios';*/
import './App.css';

import CipherKey from './components/CipherKey';
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
  const [cipherKey, setCipherKey] = useState({
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
  const analysis = useAnalysis(input);

  useEffect(() => {
    setInput("LIVITCSWPIYVEWHEVSRIQMXLEYVEOIEWHRXEXIPFEMVEWHKVSTYLXZIXLIKIIXPIJVSZEYPERRGERIMWQLMGLMXQERIWGPSRIHMXQEREKIETXMJTPRGEVEKEITREWHEXXLEXXMZITWAWSQWXSWEXTVEPMRXRSJGSTVRIEYVIEXCVMUIMWERGMIWXMJMGCSMWXSJOMIQXLIVIQIVIXQSVSTWHKPEGARCSXRWIEVSWIIBXVIZMXFSJXLIKEGAEWHEPSWYSWIWIEVXLISXLIVXLIRGEPIRQIVIIBGIIHMWYPFLEVHEWHYPSRRFQMXLEPPXLIECCIEVEWGISJKTVWMRLIHYSPHXLIQIMYLXSJXLIMWRIGXQEROIVFVIZEVAEKPIEWHXEAMWYEPPXLMWYRMWXSGSWRMHIVEXMSWMGSTPHLEVHPFKPEZINTCMXIVJSVLMRSCMWMSWVIRCIGXMWYMX");
  }, []);

  useEffect(() => {
    const cipheredText = getCipheredText(cipherKey, input);
    setWorkarea(cipheredText);
  }, [input, cipherKey]);

  const handleWorkareaChanged = (newValue) => {
    setWorkarea(newValue);
    const decipheredText = getDecipheredText(cipherKey, newValue);
    setInput(decipheredText);
  }

  return (
    <div className="App">
      <CipherKey
        cipherKey={cipherKey}
        onCipherKeyChanged={setCipherKey}
      />
      <Input
        value={input}
        onValueChanged={setInput}
      />
      <Textarea
        value={workarea}
        onValueChanged={handleWorkareaChanged}
      />
      <Notifications
        charAnalysis={analysis}
      />
      <Options />
    </div>
  );
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
    /*
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
  return analyseText(text);
}

function getCipheredText(cipherKey, decipheredText) {
  return decipheredText.split('').map(char => getCipheredChar(cipherKey, char)).join('');
}

function getCipheredChar(cipherKey, char) {
  return cipherKey[char.toLowerCase()] || char;
}

function getDecipheredText(cipherKey, cipheredText) {
  const invertedCipherKey = invertKey(cipherKey);
  return cipheredText.split('').map(char => getDecipheredChar(invertedCipherKey, char)).join('');
}

function getDecipheredChar(invertedCipherKey, char) {
  return invertedCipherKey[char.toLowerCase()] || char;
}

// Returns inverted key
function invertKey(key) {
  // probs needs to filter entries with no values
  return Object.fromEntries(Object.entries(key).map(([k, v]) => ([v.toLowerCase(), k])));
}

export default App;
