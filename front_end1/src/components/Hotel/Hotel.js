import React from 'react';
import useStyles from './styles';
import { Container , Typography , Card , CardActions , CardContent , CardMedia , Button  } from '@material-ui/core';
import {Link} from 'react-router-dom';
//import Form from './components/Form/Form.js';
const  Hotel =  (  props ) => {

    const classes = useStyles();
    //console.log(props.hotels.photo);
  const image = () => {

        if (props.hotels.photo)
        {
          const url = props.hotels.photo.images.large.url;
          
          return url;
        }
        else{
          return "...";
        }

   }

   const styles = 
{

media: {
  height: 0,
  paddingTop: '40.25%', // 16:9,
  marginTop:'30'
}
  };

 const name = props.hotels.name;
 const price = props.hotels.price;
 const description = props.hotels.description;
 const website = props.hotels.website;
 const hotel_class = props.hotels.hotel_class

  return (

    <Card className={classes.card}>
            
          <CardMedia className={classes.media}   image={image()}  style={styles.media} title={props.hotels.name} />
          <div className={classes.overlay} >
              <Typography variant="h5">{props.hotels.name}</Typography>
              
              <Typography variant="h5">{props.hotels.price}</Typography>
              
              
          </div>
          <div  className={classes.overlay2}>
            <button style={{color : 'green'}} size="medium" onClick={()=>{}}>
            <Typography variant="h6"><Link  to={ { 
              pathname: '/SingleHotel' ,
              state : {
                  name : name ,
                  price : price,
                  description : description ,
                  image : image() ,
                  website : website , 
                  hotel_class : hotel_class
              }
              }} >more details</Link></Typography>
            </button>
          </div>
          <div className={classes.details}>
               
          </div>
    </Card>

  );
}

export default Hotel;
