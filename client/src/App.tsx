import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {

  const clickHandler = async () => {
    await axios.get('/api/trigger')
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to r eload.
        </p>
        <button onClick={clickHandler}>

          Learn React
        </button>
      </header>
    </div>
  );
}

export default App;
