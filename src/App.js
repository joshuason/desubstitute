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
        />
        <Suggestions
          output={output}
        />
        <Info />
      </div>
      <Autosolver
        input={input}
        cipherKey={cipherKey}
      />
    </div>
  );
}

function getDecipheredText(cipherKey, text) {
  return text.split('').map(char => getDecipheredChar(cipherKey, char)).join('');
}

function getDecipheredChar(cipherKey, char) {
  return cipherKey[char.toLowerCase()] || char;
}

export default App;
