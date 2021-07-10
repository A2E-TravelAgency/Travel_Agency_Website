import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import { createMuiTheme, ThemeProvider, withStyles } from "@material-ui/core/styles";
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Container , Typography , Card , CardActions , CardContent , CardMedia , Button , Link  ,Switch} from '@material-ui/core';
import Route from 'react-router-dom/Route';
import Footer from "../Screens/Footer";

//import Form from './components/Form/Form.js';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#6649b8' //your color
      
    },
  },
  overrides: {
    // Style sheet name
    MuiButton: {
      typography: {
       
        "fontSize": 18
      }
    },

    MuiTouchRipple: {
      // Name of the rule
      child: {
        // Some CSS
        backgroundColor: "purple"
      }
    }
  },
  typography: {
    fontFamily: [
      'Raleway'
    ].join(','),
  }
});
const PurpleSwitch = withStyles({
  switchBase: {
    
    '&$checked': {
      color: '#6649b8',
    },
    '&$checked + $track': {
      backgroundColor: '#6649b8',
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles(()=>({

  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#6649b8',
    }
  },

  table: {
    minWidth: 700,
  },
    grid: {
    width:'80%',
    margin:'0px'
  }, formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    tr: {
      borderRadius:theme.shape.borderRadius,
      transition: theme.transitions.create(["background", "background-color"], {
        duration: theme.transitions.duration.complex,}),
      '&:hover': {
        backgroundColor: "rgba(60, 60, 60, 0.1)",

      }
    },
}));


const SingleHotel = ( props) => {

  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const [darkmode, setDarkmode] = useState(false);
  const darktheme = createMuiTheme({
    
    palette: {
      type: darkmode ? 'dark': 'light',
      primary: {
        main: '#6649b8' //your color
        
      },
    },
    overrides: {
      // Style sheet name
      MuiButton: {
        typography: {
         
          "fontSize": 18
        }
      },
  
      MuiTouchRipple: {
        // Name of the rule
        child: {
          // Some CSS
          backgroundColor: "purple"
        }
      }
    },
    typography: {
      fontFamily: [
        'Raleway'
      ].join(','),
      },});
      
      const lighttheme = createMuiTheme({
        palette: {
          type: 'light',
          primary: {
            main: '#6649b8' //your color
            
          },
        },
        overrides: {
          // Style sheet name
          MuiButton: {
            typography: {
             
              "fontSize": 18
            }
          },
      
          MuiTouchRipple: {
            // Name of the rule
            child: {
              // Some CSS
              backgroundColor: "purple"
            }
          }
        },
        typography: {
          fontFamily: [
            'Raleway'
          ].join(','),
          },});

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 1000,
      
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
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

    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  return (
    <div>
      <ThemeProvider theme={darkmode ? darktheme : lighttheme}>

        <div className="vol-screen">
        <div className={isActive ? 'vol-screen__picd': "hotel-screen__pic"} >


            <div class="inputBox">

            <div className="vol-screen__form" >
       <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            H
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.location.state.name}
       
      />
      <CardMedia
        className={classes.media}
        image={props.location.state.image}
        
      />
      <CardContent>
      <Typography variant="h6">Price Range {props.location.state.price}</Typography>
          <Typography variant="h6">Hotel {props.location.state.hotel_class} Stars</Typography>
          <Typography variant="h6">Go To   <Link href={props.location.state.website} target="_blank">{props.location.state.website} </Link></Typography>
        <Typography variant="body2" color="textSecondary" component="p" >
          This hotel is brought to uou by Nomadic, the number one plateform for travel, hope you found a destination that suits your adventure, and have a good staying.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Description:</Typography>
          <Typography variant="body2" color="textSecondary" component="p" >
          {props.location.state.description}
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
    <PurpleSwitch    onClick={() => {toggleClass(); setDarkmode(!darkmode);}}
     
     checked ={darkmode} />

   </div>
   </div>
   </div>
   </div>
    </ThemeProvider>
    <Footer/> 
    </div>

  );



}

export default SingleHotel;