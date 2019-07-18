import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useFetch } from "./hooks";
import LogForm from './login';

function App() {

  const [data, loading] = useFetch(
    'http://localhost:3001/testAPI'
  );

  const [authUser, setAuthUser] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Header-left"><img src={logo} className="App-logo" alt="logo" /></div>
        <div className="Header-center">SneezyMUD... under construction</div>
        <LogForm authUser={authUser} setAuthUser={setAuthUser}/>
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
