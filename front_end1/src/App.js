import React , {useEffect } from 'react';
import { Container , /*Grid,*/ Typography } from '@material-ui/core';
import { useDispatch} from 'react-redux';
import { getHotels } from './actions/hotels';
import Form from './components/Form/Form.js';
import Hotels from './components/Hotels/Hotels.js';





const  App =  () => {
  const dispatch = useDispatch();

  useEffect( ()=> {
    dispatch(getHotels());
  } , [dispatch]);


   
  return (
    <Container maxWidth="lg" align="center"  >

          <Typography variant="h2" align="center">this the first test </Typography>
          <Form />
          <Hotels />
         
    </Container>

  );
}

export default App;
