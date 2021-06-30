import {
    Button,
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    CardHeader,
    Typography,
    makeStyles,
  } from "@material-ui/core";
  import DeleteIcon from '@material-ui/icons/Delete';
  import Axios from 'axios';
  import React,{useState , useEffect} from 'react';
  import { useHistory } from "react-router-dom";




  const useStyles = makeStyles((theme) =>({
    button: {
      margin: theme.spacing(1),
      color:'darkred',
      fontWeight:'bold',
    },
    root: {
      maxWidth: 345,
    },
    media: {
      height: 200,
    },
  }));
  const OrganizedTripsCard = ({ val }) => {
    
    let history = useHistory();

    const showVoy=(id)=>{
      
        try{
          localStorage.setItem("idvoyage", id);
          console.log(localStorage);
    
        }catch(err){
          localStorage.removeItem("idvoyage");
        }
        history.push("/admin/organizedTrips2");
      }
      
  const deleteVoyage=  (id)=>{
    setTimeout(() => {
       Axios.delete(`http://localhost:5000/organizedTrips/delete/${id}`  );
       window.location.reload();
    }, 1000);

  }

  const event = new Date(val.voyageDateDepart);
      const event2 = new Date(val.voyageDateArrive);
      const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
    const classes = useStyles();

    return (
          <Card className={classes.root}>
      <CardActionArea onClick={()=>showVoy(val._id)}>
        <CardMedia
          className={classes.media}
          image={`/organizedTrips/insertimage/${val.image}`}
          title="Trip destination image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          From {val.voyageDepart} <br/>To {val.voyageArrive}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <h3>Departure date - {event.toLocaleDateString(undefined, options)}</h3>
          <h3>Arrival date - {event2.toLocaleDateString(undefined, options)}</h3>
          <h3>Price - {val.voyagePrix} DH</h3>
            <h3>Places available - {val.voyagePlaces}</h3>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" style={{textTransform: 'capitalize',fontWeight:'bold',fontSize :(20)}} >
          Buy
        </Button>
        <Button
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        style={{textTransform: 'capitalize',fontSize :(20)}}
        onClick={()=>deleteVoyage(val._id)}
      >
        Delete
      </Button>
      </CardActions>
    </Card>
    );
  };
  
  export default OrganizedTripsCard;