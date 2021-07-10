import React , {useState} from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles,  Switch, Grid} from '@material-ui/core';
import { createMuiTheme, ThemeProvider, withStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles1 from './styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import {createHotel} from '../../actions/hotels';
import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Hotels from '../Hotels/Hotels';
import NavbarAdmin from "../Screens/NavbarAdmin";
import Footer from "../Screens/Footer";
import FormControl from '@material-ui/core/FormControl';


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

const Form = () => {

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

    
  const [postVille , setPostVille] = useState( );
  const [postDate_debut , setPostDate_debut] = useState( );
  const [postDate_fin , setPostDate_fin] = useState( );
  const [postChambres , setPostChambres] = useState( ) ;
  const [postPersonnes , setPostPersonnes] = useState( ) ;

  
  
   
    //const [postHotel , setPostHotel] = useState({ ville : '' , date_debut :'' , date_fin : '' , chambres : '' , personnes : ''});
    const classes = useStyles1();
    const classe = useStyles();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()));
    const [selectedDateFin, setSelectedDateFin] = React.useState(new Date(Date.now()));

    const postHotel  = { ville : postVille , date_debut : selectedDate ,  chambres : postChambres , personnes : postPersonnes};

    let history = useHistory();
    const handleSubmit=(e)=>{

      e.preventDefault();
      //console.log(postHotel);
      dispatch(createHotel(postHotel));

      //history.push("/Hotels");
      
      

    };

    /*const handleChange = (prop) => (event) => {
      setPostHotel({ ...postHotel, [prop]: event.target.value });
    };*/
    const clear =()=>{

    };

  const handleDateChange = (date) => {
  setSelectedDate(date);
  };  

  /*const handleDateChangeFin = (date) => {
    setSelectedDateFin(date);
    };  */

  

  

    return (
      <>
        <NavbarAdmin/> 
          <main>
          <ThemeProvider theme={darkmode ? darktheme : lighttheme}>

          <div className="vol-screen">
          <div className={isActive ? 'vol-screen__picd': "hotel-screen__pic"} >
          <p className={isActive ? 'vol-screen__quote': "hotel-screen__quote"}> “The great advantage of a hotel is that it is a refuge from home life.”
          <div>– George Bernard Shaw</div></p>

              <div class="inputBox">

                      <form className="vol-screen__form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                      <h3 className={isActive ? 'vol-screen__title': "hotel-screen__title"}>Enter Hotel Informations</h3>
                    <div>
                    <Grid container justify="center" direction="row" alignItems="center" spacing={2} className={classes.grid} align="center">
                      <Grid item xs={12} md={6} >
                      <FormControl className={classes.formControl}>
                      <TextField id="outlined-search" label="Hotel location (city)" type="search" variant="outlined" value={postHotel.ville} onChange={(e)=>setPostVille(e.target.value)} style={{ width: (300) }}/> 

                      </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6} >
                      <FormControl className={classes.formControl}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date of stay"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}  /*(e)=>setPostHotel(...postHotel , {date_debut : e.target.value})*/
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        style={{ width: (300) }}
                      />
                  </MuiPickersUtilsProvider>
                  </FormControl>
                  </Grid>


                  


                  <Grid item xs={12} md={6} >
                      <FormControl className={classes.formControl}>
                      <TextField
                        id="outlined-number"
                        label="Number of rooms"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        value={postHotel.chambres}
                        onChange={(e)=>setPostChambres(e.target.value)}
                        style={{ width: (300) }}
                      />
                      </FormControl>
                      </Grid>
                  
                      <Grid item xs={12} md={6} >
                      <FormControl className={classes.formControl}>
                      <TextField
                        id="outlined-number"
                        label="Number of people"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        value={postHotel.personnes}
                        onChange={(e)=>setPostPersonnes(e.target.value)}
                        style={{ width: (300) }}
                      />

                      </FormControl>
                      </Grid>
                      <Grid item>
                      <Button style={{textTransform: 'capitalize',width:(300),margin:(50)}}  className="form-button" type="submit" > Search</Button>
                      </Grid>

                  </Grid>

                    </div>

                  </form>
                  <PurpleSwitch    onClick={() => {toggleClass(); setDarkmode(!darkmode);}}
     
                    checked ={darkmode} />
                  </div>
        </div>
        

        </div>
        <div className={isActive ? 'back': "backB"}>
        <div style={{ padding: (48) }}>
        <Hotels/>
        </div>
        </div>
        </ThemeProvider>

        <Footer/> 

      </main>
    </>
    );

}


export default Form;