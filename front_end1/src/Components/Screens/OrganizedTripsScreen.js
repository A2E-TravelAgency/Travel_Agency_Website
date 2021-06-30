import React,{useState , useEffect} from 'react';
import Axios from 'axios';

import './organizedTrips.css';

const  OrganizedTripsScreen =  () => {


    useEffect(()=>{
      Axios.get('http://localhost:5000/organizedTrips/read' ).then((response)=>{
        setVoyageList(response.data);
          })
    },[])
  
    const Buy=(id)=>{
      try{
        localStorage.setItem("idvoyage", id);
  
      }catch(err){
        localStorage.removeItem("idvoyage");
      }
    }
    
  
    const [voyageList,setVoyageList] = useState([]);
  
  
  
    return (
      <div class="App" >
  
     
       <div class="voyages">
        <h1> Liste des voyages</h1>
        {voyageList.map((val,key)=>{
          const event = new Date(val.voyageDateDepart);
          const event2 = new Date(val.voyageDateArrive);
          const options = {  year: 'numeric', month: 'long', day: 'numeric' };
  
          return <div class="voyage" key={key}>
             <h3>Depart: {val.voyageDepart}</h3>
             <h3>Arrive: {val.voyageArrive}</h3>
             <h3>Date de depart: {event.toLocaleDateString(undefined, options)}</h3>
             <h3>Date d'Arrive: {event2.toLocaleDateString(undefined, options)}</h3>
             <h3>Prix: {val.voyagePrix} DH</h3>
             <h3>Places: {val.voyagePlaces}</h3>
             
             <button className = "voyagebtn" onClick={()=>Buy(val._id)}  > Buy</button>
  
  
           </div>
  
  
  
  
  
  
  
          
        })}
  
  </div> 
  
      </div>
    );
  }
  
  export default OrganizedTripsScreen;  