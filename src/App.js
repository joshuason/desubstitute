import React, { useState, useEffect } from 'react';
import './App.css';

import CipherKey from './components/CipherKey';
import Input from './components/Input';
import Output from './components/Output';
import Analysis from './components/Analysis';
import Suggestions from './components/Suggestions';
import Info from './components/Info';
import Autosolver from './components/Autosolver';

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
  const analysis = useAnalysis(input);

  useEffect(() => {
    setInput("LIVITCSWPIYVEWHEVSRIQMXLEYVEOIEWHRXEXIPFEMVEWHKVSTYLXZIXLIKIIXPIJVSZEYPERRGERIMWQLMGLMXQERIWGPSRIHMXQEREKIETXMJTPRGEVEKEITREWHEXXLEXXMZITWAWSQWXSWEXTVEPMRXRSJGSTVRIEYVIEXCVMUIMWERGMIWXMJMGCSMWXSJOMIQXLIVIQIVIXQSVSTWHKPEGARCSXRWIEVSWIIBXVIZMXFSJXLIKEGAEWHEPSWYSWIWIEVXLISXLIVXLIRGEPIRQIVIIBGIIHMWYPFLEVHEWHYPSRRFQMXLEPPXLIECCIEVEWGISJKTVWMRLIHYSPHXLIQIMYLXSJXLIMWRIGXQEROIVFVIZEVAEKPIEWHXEAMWYEPPXLMWYRMWXSGSWRMHIVEXMSWMGSTPHLEVHPFKPEZINTCMXIVJSVLMRSCMWMSWVIRCIGXMWYMX");
  }, []);

  const output = getDecipheredText(cipherKey, input);

  return (
    <div className="App">
      <h1>Desubstitute</h1>
      <CipherKey
        cipherKey={cipherKey}
        onCipherKeyChanged={setCipherKey}
      />
      <div className="GridPanel">
        <Input
          value={input}
          onValueChanged={setInput}
        />
        <Output
          value={output}
        />
        <Analysis
          input={input}
          analysis={analysis}
        />
        <Suggestions
          output={output}
        />
        <Info />
      </div>
      <Autosolver
        input={input}
        cipherKey={cipherKey}
        analysis={analysis}
      />
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

function getDecipheredText(cipherKey, text) {
  return text.split('').map(char => getDecipheredChar(cipherKey, char)).join('');
}

function getDecipheredChar(cipherKey, char) {
  return cipherKey[char.toLowerCase()] || char;
}

export default App;
