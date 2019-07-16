import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useFetch } from "./hooks";

function App() {

  const [data, loading] = useFetch(
    'http://localhost:3001/testAPI'
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {loading ? (
        "Loading..."
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
}

export default App;
