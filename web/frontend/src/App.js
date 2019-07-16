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
        SneezyMUD... under construction
      </header>
      {loading ? (
        "Loading..."
      ) : (
        <div> <h2>Zones</h2>
          <ul>
            {data.map(z => <li>{z.zone_name}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
