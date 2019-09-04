import React from 'react';
import { useFetch } from "./hooks";

const Zones = ({state}) => {

    const [data, loading] = useFetch(
        'http://localhost:3001/testAPI'
      );

    function selectZone(index){
        console.log("selected zone ", index);
        console.log(state);
        //console.log(params.state);
        
        state.setZone(index);
        state.setMode('zone');
    }

    function getColor(bottom, top){
        console.log(state);
        if (state.authUser.blocks) {
            if (bottom >= state.authUser.blocks.blockastart && top <= state.authUser.blocks.blockaend ||
                bottom >= state.authUser.blocks.blockbstart && top <= state.authUser.blocks.blockbend) {
                    return 'lightBlue';
            }
        }
        return 'darkgrey'
    }

    return (
      <div>
        { loading ? <p> "Loading..."</p>
        : 
          <div> <h2>Zones</h2>
            <ul>
              {data.map(z => 
                  <li key={z.zone_nr} onClick={()=>selectZone(z.zone_nr)} style={{color:getColor(z.bottom,z.top)}}>
                      {z.zone_name} Vnums: {z.bottom} - {z.top} {z.zone_enabled ? '' : '(disabled)' }
                  </li>
                  )
              }
            </ul>
          </div>
        
      }
      </div>
    );
}

export default Zones