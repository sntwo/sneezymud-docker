import React from 'react';
import { useFetch } from "./hooks";
import Mobs from './mobs';
import Mob from './mob';
import Objs from './objs';

const Zone = ({state}) => {

    const [data, loading] = useFetch(
        'http://localhost:3001/zone/' + state.zone
      );

    return (
      <div style={{color:'white'}}>
        <h2>Zone</h2>
        <ul>
            <li>Name:{data.zone_name}</li>
            <li>Zone number: {data.zone_nr}</li>
            <li>Vnums: {data.bottom} - {data.top}</li>
            <li>Enabled: {data.zone_enabled ? 'true' : 'false'}</li>
            <li>Reset mode: {data.reset_mode}</li>
            <li>Lifespan: {data.lifespan}</li>
            <li>Age: {data.age}</li>
            <li>Utility flag: {data.util_flag}</li>
        </ul>
        {state.mob > 0 ? 
          <Mob state={state}/>
          : <Mobs state={state}/>
        }
        <Objs state={state}/>
      </div>
    );
}

export default Zone