import React from 'react';
import { useFetch } from './hooks';
import SneezyColor from './sneezycolor';

const Mobs = ({state}) => {

    const [data, loading] = useFetch(
        'http://localhost:3001/mobs/' + state.zone
      );

    function selectMob(index){
        console.log("selected zone ", index);
        console.log(state);
        //console.log(params.state);
        
        state.setMob(index);
        state.setMode('zone');
    }

    return (
        <div>
            { loading ? (
            "Loading..."
                ) : (
                    <div> <h2>Mobs</h2>
                    <ul>
                        {data.map(m => 
                            <li key={m.vnum} onClick={()=>selectMob(m.vnum)} style={{color:'darkGray'}}>
                                <SneezyColor text={m.short_desc} /> ({m.level}) {m.response ? ('*'): null }
                            </li>
                            )
                        }
                    </ul>
                    </div>
                )
            }
        </div>
    );
}

export default Mobs