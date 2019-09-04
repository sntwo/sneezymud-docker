import React from 'react';
import './breadcrumb.css';

const BreadCrumb = ({state}) => {

    function goHome(){
        state.setZone(-1);
        state.setMob(-1);
        state.setMode('zones');
    }

    return (
      <div className='breadcrumb'>
            <a hrefn="#" onClick={()=>goHome()}>Home</a> 
            {state.zone > -1 ? <a hrefn="#" onClick={()=>state.setMob(-1)}> > Zone {state.zone}</a> 
                : null
            }
            {state.mob > -1 ? <a hrefn="#" onClick={()=>state.setMob(-1)}> > Mob {state.mob}</a> 
                : null
            }
      </div>

    );
}

export default BreadCrumb