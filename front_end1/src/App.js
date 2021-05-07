import React from 'react';
import { Container , Grid, Typography } from '@material-ui/core';
import Form from './components/Form/Form.js';
import Hotels from './components/Hotels/Hotels.js';
const  App =  () => {
  return (
    <Container maxWidth="lg" align="center"  >

          <Typography variant="h2" align="center">this the first test </Typography>
          <Form />
         
    </Container>

  );
}

export default App;
