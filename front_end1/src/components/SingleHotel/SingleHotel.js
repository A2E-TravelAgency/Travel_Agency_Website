import React from 'react';
import useStyles from './styles';
import { Container , Typography , Card , CardActions , CardContent , CardMedia , Button , Link  } from '@material-ui/core';
import Route from 'react-router-dom/Route';
//import Form from './components/Form/Form.js';

const SingleHotel = ( props) => {

    const classes = useStyles();

    /*const image = () => {

        if (props.hotels.photo)
        {
          const url = props.hotels.photo.images.large.url;
          const urll = ""+url+"";
          return urll;
        }
        else{
          return "...";
        }

   }*/

   const styles = 
{

media: {
  height: 0,
  paddingTop: '40.25%', // 16:9,
  marginTop:'30'
}
  };


  return (
    
    <Card className={classes.card}>
           
          <CardMedia className={classes.media}   image={props.location.state.image}  style={styles.media} /*title={props.hotels.name}*/ />
          <div className={classes.overlay} >
              <Typography variant="h5">{props.location.state.name}</Typography>
              
              <Typography variant="h5">{props.location.state.price}</Typography>
              
              
          </div>
          <div  className={classes.overlay2}>
          <Typography variant="h6">Hotel class: </Typography>
          <Typography variant="h6">{props.location.state.hotel_class}</Typography>
          <Typography variant="h6">Website : </Typography>
          <Typography variant="h6"><Link href={props.location.state.website} target="_blank">{props.location.state.website} </Link></Typography>
          <Typography variant="h6">Description : </Typography>
          <Typography variant="h6">{props.location.state.description}</Typography>
            
          </div>
          <div className={classes.details}>
               
          </div>
    </Card>

  );



}

export default SingleHotel;