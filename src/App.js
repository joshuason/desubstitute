import React, { Component } from 'react';
import './App.css';

import Cipherkey from './components/Cipherkey'
import Input from './components/Input'
import Output from './components/Output'
import Notifications from './components/Notifications'
import Options from './components/Options'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Cipherkey />
        <Input />
        <Output />
        <Notifications />
        <Options />
      </div>
    );
  }
}

export default App;
