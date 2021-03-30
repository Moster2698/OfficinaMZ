import React, { useEffect } from 'react';
import BevandeContext from './BevandeContext';
import {useState} from 'react';
//const listaPizze = require('../pizze.json');
function BevandeProvider(props){
    const [bevande,setBevande] = useState([]);
    
useEffect(() => {

    fetch('http://localhost:3010/api/ristorazione/get-bevande', { 
        method:'Get',
        headers: {},
        mode: 'cors'
    })
    .then(response => response.json())
    .then((result) => {setBevande(result)})
},[]) 

 
      return(
        <BevandeContext.Provider value={[bevande,setBevande]}>{props.children}</BevandeContext.Provider>
    )
}
export default BevandeProvider;