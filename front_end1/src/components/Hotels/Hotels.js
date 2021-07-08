import React  , {useEffect ,Suspense} from 'react';
import { useSelector  } from 'react-redux';
import { Container , Grid, Typography , Grow , CircularProgress } from '@material-ui/core';
import Hotel from '../Hotel/Hotel.js';
import useStyles from './styles';
import Box from '@material-ui/core/Box';
const  Hotels =  () => {

  
  const hotels = useSelector( (state) => state.hotels);
  
  //const hotels = JSON.parse(obj);
  //const hotells = hotels[0];
  const classes = useStyles();
  console.log(hotels);
  //console.log(hotels);
  
  return (


    
       ( !hotels[hotels.length - 1].length ? <CircularProgress / > : (

           <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {hotels[hotels.length - 1].map((hotel) => (
                  <Grid key={hotel.name} item xs={12} sm={6} lg={6}  >
                      <Hotel hotels={hotel}/>
                  </Grid>
              ))
              }

           </Grid>
    
        ) 
        )
        

  );
}

export default Hotels;
