import React from 'react';
import { useSelector } from 'react-redux';
import { Container , Grid, Typography , Grow } from '@material-ui/core';
import Hotel from '../Hotel/Hotel.js';
import Box from '@material-ui/core/Box';
const  Hotels =  () => {
  const hotels = useSelector( (state) => state.hotels);

  console.log(hotels);
  return (

    <Container maxWidth="lg">
      <Grid container spacing={2} display="flex" /*flexDirection="row-reverse"*/ flexwrap="nowrap">
            <Grid item xs={12} sm={3}>
              <>
                <Hotel/>
                <Hotel/>
               </> 
            </Grid>
            <Grid item xs={12} sm={3}>
            <>
                <Hotel/>
                <Hotel/>
               </> 
            </Grid>
            <Grid item xs={12} sm={3}>
            <>
                <Hotel/>
                <Hotel/>
               </> 
            </Grid>
            
         </Grid>
    </Container>

  );
}

export default Hotels;
