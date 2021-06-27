import React,{useState , useEffect} from 'react';
import Axios from 'axios';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import './App.css';

const  VoyageursView =  () => {


  useEffect(()=>{
    Axios.get('http://localhost:5000/readvoyageurs' ).then((response)=>{
        setVoyageursList(response.data);
        })
  },[])

  
  

  const [voyageursList,setVoyageursList] = useState([]);



  return (
    <div class="App" >

   
     <div class="voyages">
      <h1> Liste des voyages</h1>
      {voyageursList.map((val,key)=>{
                  return <div class="voyage" key={key}>

       
       <h1>Voyageurs</h1>
 
     <TableContainer component={Paper}>
       <Table  aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell align="right"> Name</TableCell>
             <TableCell align="right">Tel </TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           
             <TableRow >
               
               <TableCell align="right">{val.voyageurs.name}</TableCell>
               <TableCell align="right">val.voyageurs.tel</TableCell>
               
             </TableRow>
           
         </TableBody>
       </Table>
     </TableContainer>
   


         </div>







        
      })}

</div> 

    </div>
  );
}

export default VoyageursView;
