import React,{useState } from 'react';
import Axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider, makeStyles,withStyles } from "@material-ui/core/styles";
import {Button, Switch} from '@material-ui/core';
import {Grid} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import './organizedTrips.css';
const useStyles = makeStyles((theme) => ({

  textField: {
    width: '25ch',
  },
  grid: {
    width:'100%',
    margin:'0px'
  }, 
}));
const  Checkout =  ({history}) => {


  


  

  const Buy=  (id)=>{
    
     Axios.put("http://localhost:5000/organizedTrips/buy" , {id:id,name:name,tel:tel})

    alert("Reservation done successfully, we will contact you in your number to complete the paiement process.");

    history.push("/organizedTrips")
  }

  const [name,setName] = useState([]);
  const [tel,setTel] = useState([]);


  const classes =useStyles();

  return (
    <div class="App" >

        <Navbar/> 
        <main>
     <div class="voyages">
     <Grid container justify="center" direction="column" alignItems="center" spacing={2} className={classes.grid} align="center">
     <Grid item xs={12} >
     <TextField id="filled-basic" label="Full Name" variant="filled"  value={name}  onChange={(event)=>{
            setName(event.target.value);
            }}  style={{ width: (250) }}/></Grid>

    <Grid item xs={12} >
    <TextField id="filled-basic1" label="Phone number" variant="filled" value={tel} onChange={(event)=>{
            setTel(event.target.value);
            }}  style={{ width: (250) }} /></Grid>

            <Grid item>
            <Button  style={{textTransform: 'capitalize', margin:'auto'}} onClick={()=>Buy(localStorage.getItem('idvoyage'))} className="form-button" >Reserve
              </Button>
              </Grid>
              </Grid>


         </div>





         <Footer/> 
  
  </main>
</div>
        
      )}



export default Checkout;