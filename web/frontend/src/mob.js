import React from 'react';
import { useFetch } from "./hooks";
import Mobs from './mobs';
import SneezyColor from './sneezycolor';

const Mob = ({state}) => {

    const [data, loading] = useFetch(
        'http://localhost:3001/mob/' + state.mob
      );

    return (
      <div style={{color:'white'}}>
        <h2>Mob</h2>
        <ul>
            <li>Names:{data.name}</li>
            <li>Short Description: {data.short_desc}</li>
            <li>Vnum: {data.vnum}</li>
            <li>Enabled: {data.zone_enabled ? 'true' : 'false'}</li>
            <li>Reset mode: {data.reset_mode}</li>
            <li>Lifespan: {data.lifespan}</li>
            <li>Age: {data.age}</li>
            { data.response?
                <li> Responses:
                    <textarea rows='100' cols='80'>{data.response}</textarea>
                </li>
                : null 
            }
        </ul>
      </div>
    );
}

export default Mob