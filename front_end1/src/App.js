import React,{useState} from 'react';
import Axios from 'axios';

import './App.css';

const  App =  () => {

  const addToVoyages=()=>{

  }


  const [villeDep,setVilleDep] = useState('');
  const [villeArr,setVilleArr] = useState('');
  const [dateDep,setDateDep] = useState('');
  const [dateArr,setDateArr] = useState('');
  const [nbPlace,setNbPlace] = useState('');
  const [price,setPrice] = useState('');


  return (
    <div class="App" >
      <h1>Management des voyages</h1>

      
        <label for="vd">Ville départ: </label>
        <input
          name="vd" type = "Text"
          onChange={(event)=>{
            setVilleDep(event.target.value);
            }} 
            />
        <label for="va">Ville arrivé: </label>
        <input name="va" type = "Text"
            onChange={(event)=>{
            setVilleArr(event.target.value);
            }}
            />
        <label for="dd">Date départ: </label>
        <input name="dd" type = "Date"
         onChange={(event)=>{
          setDateDep(event.target.value);
          }}/>
        <label for="da">Date départ: </label>
        <input name="da" type = "Date"
         onChange={(event)=>{
          setDateArr(event.target.value);
          }}
        />
        <label for="np">Nombre de place:  </label>
        <input name="np" type = "Number"  min="0" max="100"
         onChange={(event)=>{
          setNbPlace(event.target.value);
          }}
        />
        <label for="Prix">Prix: </label>
        <input name="Prix" type = "Text" 
        onChange={(event)=>{
          setPrice(event.target.value);
          }}
        />
        <button onClick={addToVoyages} > ADD</button>
     
      
      



    </div>
  );
}

export default App;
