import express from 'express';

const router = express.Router();

router.get('/' , (req, res ) => {

    res.send('wokring ...');
});
app.post('/',  (req, res)=> {
    res.send('Got a POST request');
  });
  app.put('/user',  (req, res) =>{
    res.send('Got a PUT request at /user');
  });
  app.delete('/user',  (req, res)=> {
    res.send('Got a DELETE request at /user');
  });

export default router;