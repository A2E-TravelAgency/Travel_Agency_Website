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



  // let dropdown = document.getElementById('locality-dropdown');
  // dropdown.length = 0;
  
  // let defaultOption = document.createElement('option');
  // defaultOption.text = 'Choose State/Province';
  
  // dropdown.add(defaultOption);
  // dropdown.selectedIndex = 0;
  
  // const url = 'front_end1/src/cities.json';
  
  // fetch(url)  
  //   .then(  
  //     function(response) {  
  //       if (response.status !== 200) {  
  //         console.warn('Looks like there was a problem. Status Code: ' + 
  //           response.status);  
  //         return;  
  //       }
  
  //       // Examine the text in the response  
  //       response.json().then(function(data) {  
  //         let option;
      
  //       for (let i = 0; i < data.length; i++) {
  //           option = document.createElement('option');
  //           option.text = data[i].ville;
  //           dropdown.add(option);
  //       }    
  //       });  
  //     }  
  //   )  
  //   .catch(function(err) {  
  //     console.error('Fetch Error -', err);  
  //   });

  return (
    <div class="App" >

      {/* <select id="locality-dropdown" name="locality">
      </select> */}
      <div class ="information">
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
        <label for="da">Date d'arrivé: </label>
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
     <div class="voyages">
      <h1> Liste des voyages</h1>
      {voyageList.map((val,key)=>{
        const event = new Date(val.voyageDateDepart);
        const event2 = new Date(val.voyageDateArrive);
        const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };

        return <div class="voyage" key={key}>
           <h3>Départ: <br></br>{val.voyageDepart}</h3>
           <h3>Arrivé:<br></br> {val.voyageArrive}</h3>
           <h3>Date de départ:<br></br> {event.toLocaleDateString(undefined, options)}</h3>
           <h3>Date d'Arrivé:<br></br> {event2.toLocaleDateString(undefined, options)}</h3>
           <h3>Prix: <br></br> {val.voyagePrix} DH</h3>
           <h3>Places:<br></br> {val.voyagePlaces}</h3>
           
           <button onClick={()=>deleteVoyage(val._id)}  > Delete</button>


         </div>







        
      })}

</div> 

    </div>
  );
}

export default App;
