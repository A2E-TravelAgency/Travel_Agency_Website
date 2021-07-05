import React , {useEffect } from 'react';
import { Container , /*Grid,*/ Typography } from '@material-ui/core';
import { useDispatch} from 'react-redux';
import { getHotels } from './actions/hotels';
import {BrowserRouter as Router , Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Form from './components/Form/Form.js';
import Hotels from './components/Hotels/Hotels.js';
import SingleHotel from './components/SingleHotel/SingleHotel.js';
import Hotel from './components/Hotel/Hotel.js';





const  App =  () => {
  const dispatch = useDispatch();

  useEffect( ()=> {
    dispatch(getHotels());
  } , [dispatch]);

  
   
  return (
    <Router> 
      
    <Container maxWidth="lg" align="center"  >

          <Typography variant="h2" align="center">this the first test </Typography>
          
          
          <Switch>
          < Route  exact path='/Form' component={Form}  />
          < Route  exact path='/Hotels' component={Hotels}  />
          < Route  exact path='/SingleHotel' component={SingleHotel}  />
          
          </Switch>

         
      
      
      
     
          
          
    </Container>
    
    </Router>
  );
}

export default App;
