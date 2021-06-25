
import './App.css';













import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


import React, { Component } from 'react'




export class VoyagesView extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }




    render() {

       return (
         
         <div >
           <h1>Voyages organisés</h1>
     
         <TableContainer component={Paper}>
           <Table  aria-label="simple table">
             <TableHead>
               <TableRow>
                 <TableCell>Voyages</TableCell>
                 <TableCell align="right">Ville départ</TableCell>
                 <TableCell align="right">Ville d'arrive</TableCell>
                 <TableCell align="right">Date départ</TableCell>
                 <TableCell align="right">Date arrivé&nbsp;(g)</TableCell>
                 <TableCell align="right">Places</TableCell>
                 <TableCell align="right">Prix</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               
                 <TableRow >
                   <TableCell component="th" scope="row">
                    
                   
                   </TableCell>
                   <TableCell align="right"></TableCell>
                   <TableCell align="right"></TableCell>
                   <TableCell align="right"></TableCell>
                   <TableCell align="right"></TableCell>
                 </TableRow>
               
             </TableBody>
           </Table>
         </TableContainer>
       
         </div>
       );
    }
}

export default VoyagesView






