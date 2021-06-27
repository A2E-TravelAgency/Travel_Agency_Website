import React,{useState } from 'react';
import Axios from 'axios';

import './App.css';

const  Checkout =  () => {


  


  

  const Buy=(id)=>{
    
    Axios.put("http://localhost:5000/buy" , {id:id,name:name,tel:tel})
  }

  const [name,setName] = useState([]);
  const [tel,setTel] = useState([]);



  return (
    <div class="App" >

   
     <div class="voyages">
     <label for="vd">Full Name: </label>
        <input
          name="vd" type = "Text"
          onChange={(event)=>{
            setName(event.target.value);
            }} 
            />
        <label for="va">Mobile Phone: </label>
        <input name="va" type = "Text"
            onChange={(event)=>{
            setTel(event.target.value);
            }}
            />
           
           <button onClick={()=>Buy(localStorage.getItem('idvoyage'))}  > Buy</button>


         </div>






</div>
        
      )}



export default Checkout;
