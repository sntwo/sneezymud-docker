import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useFetch } from "./hooks";
import LogForm from './login';
import Zones from './zones';
import Zone from './zone';
import BreadCrumb from './breadcrumb';


function App() {

  ////////////////////////////////////////////////
  // state hooks... to be passed around in state
  const [authUser, setAuthUser] = useState([]);
  // supported modes (will be) zones, zone, mobs, mob, rooms, room, objs, obj
  // currently only displaying by zone is in
  const [mode, setMode] = useState('zones');
  const [zone, setZone] = useState(-1);
  const [mob, setMob] = useState(-1);
  const [obj, setObj] = useState(-1);
  const [info, setInfo] = useState(''); //info is not descriptive, need to move away from this
  const state = {
    authUser: authUser,
    setAuthUser: setAuthUser,
    mode: mode,
    setMode: setMode,
    info: info,
    setInfo: setInfo,
    zone: zone,
    setZone: setZone,
    mob: mob,
    setMob: setMob,
    obj: obj,
    setObj: setObj
  }
  //////////////////////////////////////////////////

  function renderSwitch() {
    switch(mode) {
      case 'zones':
        return <Zones state={state}/>;
      case 'zone':
        return <Zone state={state}/>
      default:
        return 'Bad render mode';
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Header-left"><img src={logo} className="App-logo" alt="logo" /></div>
        <div className="Header-center">SneezyMUD... under construction</div>
        <LogForm authUser={authUser} setAuthUser={setAuthUser}/>
      </header>
      <BreadCrumb state={state}/>
      {renderSwitch()}
    </div>
  );
}

export default App;
