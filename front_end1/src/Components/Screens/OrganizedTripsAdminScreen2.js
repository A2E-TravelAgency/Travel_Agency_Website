import React,{useState , useEffect} from 'react';
import Axios from 'axios';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import './organizedTrips.css';


const  OrganizedTripsAdminScreen2 =  ({history}) => {


  useEffect(()=>{
    const fetchVoyage = async (e) => {

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const id = localStorage.getItem('idvoyage');
    await Axios.post(`http://localhost:5000/organizedTrips/readvoyageurs`,{id},  config ).then((response)=>{
      console.log(response.data);
        setVoyageursList(response.data);
        })
       
  };
  fetchVoyage();
  localStorage.removeItem("idvoyage");

    }
    ,[history])
    
      
      
    
      const [voyageursList,setVoyageursList] = useState([]);
    
    
    
      return (
        <div class="App" >

   
        <div class="voyageur">
         <h1> Liste des voyages</h1>
        
   
          
          <h1>Voyageur</h1>
    
        <TableContainer component={Paper}>
          <Table  aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right"> Name</TableCell>
                <TableCell align="right">Tel </TableCell>
              </TableRow>
            </TableHead>
            {voyageursList.map((val,key)=>{
                     return( 
                      <div key={key}>
                      {val.voyageurs.map((value)=>{
                        return( 
            <TableBody>
           
                <TableRow >
  
                  <TableCell align="right">{value.name}</TableCell>
                  <TableCell align="right">{value.tel}</TableCell>

                </TableRow>

            </TableBody>      
                                              );
                                            })}
                                             </div>);
                                            })} 

          </Table>
        </TableContainer>
      
   
   
   
   
   
   
   
   
   
           
         
   
   </div> 
   
       </div>
     );
    }

export default OrganizedTripsAdminScreen2;