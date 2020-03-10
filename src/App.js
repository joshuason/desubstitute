import React, { useState } from 'react';
import './App.css';

import Cipherkey from './components/Cipherkey'
import Input from './components/Input'
import Output from './components/Output'
import Notifications from './components/Notifications'
import Options from './components/Options'

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

  return (
    <div className="App">
      <Cipherkey cipherkey={cipherkey}/>
      <Input />
      <Output />
      <Notifications />
      <Options />
    </div>
  );
}

export default App;
