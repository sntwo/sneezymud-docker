import React from 'react';
import { useFetch } from './hooks';
import SneezyColor from './sneezycolor';

const Objs = ({state}) => {

    const [data, loading] = useFetch(
        'http://localhost:3001/objs/' + state.zone
      );

    function selectObj(index){
        console.log("selected zone ", index);
        console.log(state);
        //console.log(params.state);
        
        state.setObj(index);
        state.setMode('zone');
    }

    function get_bits(a, p, n) {
        let x = (a >> (p + 1 - n));
        let y = ~(~0 << n);
        return x & y;
    }

    return (
        <div>
            { loading ? (
            "Loading..."
                ) : (
                    <div> <h2>Objects</h2>
                    <ul>
                        {data.map(o => 
                            <li key={o.vnum} onClick={()=>selectObj(o.vnum)} style={{color:'darkGray'}}>
                                <SneezyColor text={o.short_desc} /> {o.type == 5 ? 'Level ' + get_bits(o.val1,7,8) / 4  + ' WEAPON' : null}
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

export default Objs