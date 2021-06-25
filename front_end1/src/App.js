import React,{useState , useEffect} from 'react';
import Axios from 'axios';

import './App.css';

const  App =  () => {


  useEffect(()=>{
    Axios.get('http://localhost:5000/read' ).then((response)=>{
      setVoyageList(response.data);
        })
  },[])


  const addToVoyages=()=>{
    Axios.post("http://localhost:5000/insert" , {villeDep:villeDep ,
    villeArr:villeArr,dateDep:dateDep,dateArr:dateArr,nbPlace:nbPlace,
    price:price})
  }

  const deleteVoyage=(id)=>{
    Axios.delete(`http://localhost:5000/delete/${id}`  )
  }

  const [voyageList,setVoyageList] = useState([]);

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
     
      
      <h1> Liste des voyages</h1>
      {voyageList.map((val,key)=>{
        return <div class="voyage" key={key}>
           <h2>Depart: {val.voyageDepart}</h2>
           <h2>Arrive: {val.voyageArrive}</h2>
           <h2>Date de depart: {val.voyageDateDepart}</h2>
           <h2>Date d'Arrive: {val.voyageDateArrive}</h2>
           <h2>Prix: {val.voyagePrix} DH</h2>
           <h2>Nombre de places: {val.voyagePlaces}</h2>
           
           <button onClick={()=>deleteVoyage(val._id)}  > Delete</button>


         </div>







        
      })}



    </div>
  );
}

export default App;
